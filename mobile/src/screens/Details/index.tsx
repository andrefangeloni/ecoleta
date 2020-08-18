import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const Details = () => {
  const navigation = useNavigation();

  const onGoBackScreen = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onGoBackScreen()}>
        <Icon name="arrow-left" size={20} color="#34cb79" />
      </TouchableOpacity>

      <Image
        style={styles.pointImage}
        source={{
          uri:
            'https://meiosustentavel.com.br/wp-content/uploads/2019/08/Lixeiras-Reciclaveis-01-1024x568.png',
        }}
      />
      <Text style={styles.pointName}>Lixeiras para reciclagem</Text>
      <Text style={styles.pointItems}>
        Plástico, Metal, Papel Vidro e Orgânico
      </Text>

      <View style={styles.address}>
        <Text style={styles.addressTitle}>Endereço</Text>
        <Text style={styles.addressContent}>Campinas/SP</Text>
      </View>
    </View>

    <View style={styles.footer}>
        <RectButton  style={styles.button}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>

        <RectButton  style={styles.button}>
          <Icon name="mail" size={20} color="#fff" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
    </View>
    </SafeAreaView>
  );
};

export default Details;
