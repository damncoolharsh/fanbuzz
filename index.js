/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react'
import {name as appName} from './app.json';
import { Provider } from 'mobx-react'
import stores from './src/mobx/index'

const MyApp = () => {
  return (
    <Provider {...stores}>
      <App />
    </Provider>
  )
}

AppRegistry.registerComponent(appName, () => MyApp);


