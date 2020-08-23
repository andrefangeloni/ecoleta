import React, {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import Dropzone from '../../components/Dropzone';

import api from '../../services/api';
import ibge from '../../services/ibge';

import logo from '../../assets/logo.svg';

import './styles.css';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface UF {
  sigla: string;
}

interface City {
  nome: string;
}

const CreatePoint = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUF, setSelectedUF] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const history = useHistory();

  useEffect(() => {
    loadUFs();
    loadItems();
    loadInitialPosition();
  }, []);

  const loadInitialPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
      setSelectedPosition([latitude, longitude]);
    });
  };

  const loadItems = async () => {
    const { data } = await api.get('/items');
    setItems(data);
  };

  const loadUFs = async () => {
    const { data } = await ibge.get<UF[]>('/api/v1/localidades/estados');
    const ufInitials = data.map((uf) => uf.sigla).sort();
    setUfs(ufInitials);
  };

  const loadCities = useCallback(async () => {
    const { data } = await ibge.get<City[]>(
      `/api/v1/localidades/estados/${selectedUF}/municipios`,
    );
    const cityName = data.map((city) => city.nome);
    setCities(cityName);
  }, [selectedUF]);

  useEffect(() => {
    loadCities();
  }, [selectedUF, loadCities]);

  const onSelectedUF = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUF(e.target.value);
  };

  const onSelectedCity = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const onMapClicked = (e: LeafletMouseEvent) => {
    setSelectedPosition([e.latlng.lat, e.latlng.lng]);
  };

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSelectedItem = (id: number) => {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const onDataSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { name, email, whatsapp } = formData;
    const [latitude, longitude] = selectedPosition;

    try {
      const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', selectedUF);
        data.append('city', selectedCity);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', selectedItems.join(','));

        if (selectedFile) {
          data.append('image', selectedFile);
        }
      
      await api.post('/points', data);

      history.push('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div id="page-create-point">
      <header>
        <Link to="/">
          <img src={logo} alt="Ecoleta" />
        </Link>

        <Link to="/">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>

      <form onSubmit={(e) => onDataSubmit(e)}>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => onInputChanged(e)}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => onInputChanged(e)}
              />
            </div>
            <div className="field">
              <label htmlFor="name">WhatsApp</label>
              <input
                type="text"
                id="whatsapp"
                name="whatsapp"
                onChange={(e) => onInputChanged(e)}
                maxLength={11}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map
            center={initialPosition}
            zoom={15}
            onClick={(e: any) => onMapClicked(e)}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado</label>
              <select
                id="uf"
                name="uf"
                value={selectedUF}
                onChange={(e) => onSelectedUF(e)}
              >
                <option value="0">Selecione o estado desejado</option>
                {ufs.map((uf, i) => (
                  <option key={i} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={(e) => onSelectedCity(e)}
              >
                <option value="0">Selecione a cidade desejada</option>
                {cities.map((city, i) => (
                  <option key={i} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li
                key={item.id}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
                onClick={() => onSelectedItem(item.id)}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
