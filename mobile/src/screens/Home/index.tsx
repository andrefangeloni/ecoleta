import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';

import styles from './styles';

const Home = () => {
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
    </ImageBackground>
  );
};

export default Home;
