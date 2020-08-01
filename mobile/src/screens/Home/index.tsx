import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';

const Home = () => {
  const navigation = useNavigation();

  const onOpenPointsScreen = () => {
    navigation.navigate('Points');
  };

  return (
    <ImageBackground
      style={styles.container}
      imageStyle={{ height: 368, width: 274 }}
      source={require('../../assets/images/home-background.png')}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/images/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
        </Text>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => onOpenPointsScreen()}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" size={24} color="#fff" />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

export default Home;
