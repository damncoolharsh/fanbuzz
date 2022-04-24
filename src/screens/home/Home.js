import { inject, observer } from 'mobx-react'
import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getMatchList } from '../../services/fantansyService'

function Home(props) {
  const { userData } = props.authStore

  useEffect(() => {
    getMatchList()
    .then(data => {
      console.log(data);
    })
  }, [])

  return (
    <View>
      <Text>Hi {userData.full_name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  
})

export default inject('authStore', 'miscStore')(observer(Home))
