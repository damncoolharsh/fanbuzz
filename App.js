import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import stores from './src/mobx/index'
import Login from './src/screens/login/Login'
import SignUp from './src/screens/login/SignUp'
import Home from './src/screens/home/Home'
import Spinner from './src/screens/common/Spinner'
import BuzzAlert from './src/screens/common/BuzzAlert'
import { inject, observer } from 'mobx-react'
import auth from '@react-native-firebase/auth';
import PropTypes from 'prop-types';
import Auth from './src/mobx/auth'

const Stack = createNativeStackNavigator()

function App({ authStore, miscStore }) {
  const isAuhenticated = authStore.isAthenticated
  useEffect(() => {
    var subscriber  = auth().onAuthStateChanged(authStore.userStateChange)
    return (() => {
      subscriber()
    })
  }, [])

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuhenticated ?
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </> :
          <>
            <Stack.Screen name="HomeScreen" component={Home} />
          </>}
        </Stack.Navigator>
      </NavigationContainer>
      <Spinner loading={miscStore.loading} />
      <BuzzAlert 
        error={miscStore.error} 
        onClose={() => [miscStore.mobSetError(false), console.log("DONE")]}
      />
    </>
  )
}

App.prototype = {
  authStore: PropTypes.string
}

export default inject('authStore', 'miscStore')(observer(App))
