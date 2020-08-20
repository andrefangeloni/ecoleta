import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import { SvgUri } from 'react-native-svg';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import styles from './styles';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40,
};

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const mapRef: any = useRef(null);

  const navigation = useNavigation();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const { data } = await api.get('/items');
    setItems(data);
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }

    loadInitialPosition();
  }, []);

  const loadInitialPosition = async () => {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setInitialPosition([latitude, longitude]);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fitAllMarkers = useCallback(() => {
    if (items.length > 0) {
      if (mapRef.current !== null) {
        mapRef.current.fitToCoordinates(
          items.map((item: any) => ({
            latitude: item.latitude,
            longitude: item.longitude,
          })),
          {
            edgePadding: DEFAULT_PADDING,
            animated: true,
          },
        );
      }
    }
  }, [items]);

  useEffect(() => {
    fitAllMarkers();
  }, [items, fitAllMarkers]);

  const onGoBackScreen = () => {
    navigation.goBack();
  };

  const onMarkerClicked = () => {
    navigation.navigate('Details');
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

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => onGoBackScreen()}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta.
        </Text>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            showsUserLocation
            showsMyLocationButton
            initialRegion={{
              latitude: initialPosition[0],
              longitude: initialPosition[1],
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}
            ref={mapRef}
          >
            <Marker
              style={styles.mapMarker}
              onPress={() => onMarkerClicked()}
              coordinate={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
              }}
            >
              <View style={styles.mapMarkerContainer}>
                <Image
                  style={styles.mapMarkerImage}
                  source={{
                    uri:
                      'https://meiosustentavel.com.br/wp-content/uploads/2019/08/Lixeiras-Reciclaveis-01-1024x568.png',
                  }}
                />
                <Text style={styles.mapMarkerTitle}>Reciclagem</Text>
              </View>
            </Marker>
          </MapView>
        </View>
      </SafeAreaView>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map((item) => (
            <TouchableOpacity
              key={String(item.id)}
              style={[
                styles.item,
                selectedItems.includes(item.id) && styles.selectedItem,
              ]}
              activeOpacity={0.6}
              onPress={() => onSelectedItem(item.id)}
            >
              <SvgUri height={42} width={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default Points;
