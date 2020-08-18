import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';

const Points = () => {
  const navigation = useNavigation();

  const onGoBackScreen = () => {
    navigation.goBack();
  };

  const onMarkerClicked = () => {
    navigation.navigate('Details');
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
            initialRegion={{
              latitude: -22.917963,
              longitude: -47.0173247,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}
          >
            <Marker
              style={styles.mapMarker}
              onPress={() => onMarkerClicked()}
              coordinate={{
                latitude: -22.917963,
                longitude: -47.0173247,
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
          <TouchableOpacity style={styles.item}>
            <SvgUri
              height={42}
              width={42}
              uri="http://192.168.0.12:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <SvgUri
              height={42}
              width={42}
              uri="http://192.168.0.12:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <SvgUri
              height={42}
              width={42}
              uri="http://192.168.0.12:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <SvgUri
              height={42}
              width={42}
              uri="http://192.168.0.12:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <SvgUri
              height={42}
              width={42}
              uri="http://192.168.0.12:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <SvgUri
              height={42}
              width={42}
              uri="http://192.168.0.12:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

export default Points;
