import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

import api from '../../services/api';
import ibge from '../../services/ibge';

import logo from '../../assets/logo.svg';

import './CreatePoint.css';

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

  useEffect(() => {
    loadItems();
    loadUFs();
  }, []);

  useEffect(() => {
    loadCities();
  }, [selectedUF]);

  const loadItems = async () => {
    const { data } = await api.get('/items');
    setItems(data);
  };

  const loadUFs = async () => {
    const { data } = await ibge.get<UF[]>('/api/v1/localidades/estados');
    const ufInitials = data.map((uf) => uf.sigla).sort();
    setUfs(ufInitials);
  };

  const loadCities = async () => {
    const { data } = await ibge.get<City[]>(
      `/api/v1/localidades/estados/${selectedUF}/municipios`,
    );
    const cityName = data.map((city) => city.nome);
    setCities(cityName);
  };

  const onSelectedUF = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUF(e.target.value);
  };

  const onSelectedCity = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>

      <form>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" id="name" name="name" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="text" id="email" name="email" />
            </div>
            <div className="field">
              <label htmlFor="name">WhatsApp</label>
              <input type="text" id="whatsapp" name="whatsapp" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={[-22.9213693, -47.0097278]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[-22.9213693, -47.0097278]} />
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
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li key={item.id}>
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
