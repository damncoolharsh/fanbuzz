import React from 'react'
import { StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native'
import Colors from '../../utils/Colors'

export default function Spinner({ loading }) {
  return (
    <Modal visible={loading} transparent={true}>
      <View style={styles.container}>
        <ActivityIndicator size={30} color={Colors.primary} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.faded,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
