import {View, Text, StatusBar} from 'react-native';
import { Provider } from "react-redux";
import store from './src/redux/store';
import React from 'react';
import StackNavigator from './src/navigation/StackNavigator/StackNavigator';


const App = () => {
  return(
    <>
    <StatusBar barStyle={'dark-content'} backgroundColor='#fff' />
    <Provider store={store}>
    <StackNavigator/>
    </Provider>
    </>
  )
};

export default App;
