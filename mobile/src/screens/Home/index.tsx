import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';

const Home = () => {
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');

  const navigation = useNavigation();

  const onOpenPointsScreen = () => {
    navigation.navigate('Points', { uf, city });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        style={styles.container}
        imageStyle={{ height: 368, width: 274 }}
        source={require('../../assets/images/home-background.png')}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/images/logo.png')} />
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="Digite a UF"
            value={uf}
            onChangeText={setUf}
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite a cidade"
            value={city}
            onChangeText={setCity}
          />

          <RectButton
            style={styles.button}
            onPress={() => onOpenPointsScreen()}
          >
            <View style={styles.buttonIcon}>
              <Icon name="arrow-right" size={24} color="#fff" />
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Home;
