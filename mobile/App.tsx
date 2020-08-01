import React from 'react';
import { StatusBar } from 'react-native';

import Home from './src/screens/Home';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Home />
    </>
  )
};

export default App;
