import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Linking,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import api from '../../services/api';

import styles from './styles';

interface Params {
  point_id: number;
}

interface Point {
  point: {
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Details = () => {
  const [points, setPoints] = useState<Point>({} as Point);

  const route = useRoute();
  const navigation = useNavigation();

  const routeParams = route.params as Params;

  useEffect(() => {
    getPoint();
  }, []);

  const getPoint = async () => {
    const { data } = await api.get(`/points/${routeParams.point_id}`);
    setPoints(data);
  };

  const onGoBackScreen = () => {
    navigation.goBack();
  };

  const subject = 'Interesse na coleta de resíduos';
  const recipients = points.point && [points.point.email];

  const emailUrl = `mailto:${recipients}?subject=${subject}`;

  const whatsAppUrl = `whatsapp://send?&phone=55${
    points.point && points.point.whatsapp
  }&text=Tenho interesse sobre coleta de resíduos`;

  const sendEmail = async () => {
    try {
      const isSupported = await Linking.canOpenURL(emailUrl);

      if (isSupported) {
        Linking.openURL(emailUrl);
      }
    } catch (err) {
      Alert.alert('Erro', 'Não é possível enviar e-mail nesse aparelho!');
    }
  };

  const sendWhatsApp = async () => {
    try {
      const isSupported = await Linking.canOpenURL(whatsAppUrl);

      if (isSupported) {
        Linking.openURL(whatsAppUrl);
      }
    } catch (err) {
      Alert.alert('Erro', 'Não é possível enviar WhatsApp nesse aparelho!');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onGoBackScreen()}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        {points.point && (
          <Image
            style={styles.pointImage}
            source={{ uri: points.point.image }}
          />
        )}
        <Text style={styles.pointName}>
          {points.point && points.point.name}
        </Text>
        <Text style={styles.pointItems}>
          {points.items && points.items.map((item) => item.title).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>{`${
            points.point && points.point.city
          }/${points.point && points.point.uf}`}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => sendWhatsApp()}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={() => sendEmail()}>
          <Icon name="mail" size={20} color="#fff" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default Details;
