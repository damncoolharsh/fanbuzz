import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Colors from '../../utils/Colors'
import { basicStyles, getText } from '../../utils/commonStyles'
import { FONT_SIZE, FONT_WEIGHT } from '../../utils/statics'
import BuzzButton from './BuzzButton'

export default function BuzzAlert({ error, title = "Alert", onClose = () => {} }) {
  return (
    <Modal visible={!!error} transparent>
      <TouchableOpacity style={styles.container} onPress={onClose}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.error}>{error}</Text>
          <BuzzButton style={styles.button} onPress={onClose}>
            Okay
          </BuzzButton>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.faded,
    ...basicStyles.center
  },
  dialog: {
    borderRadius: 10,
    backgroundColor: Colors.white,
    width: '94%',
    paddingHorizontal: 20
  },

  title: {
    paddingTop: 10,
    ...getText(FONT_SIZE.HEAD_2, FONT_WEIGHT.BOLD)
  },
  error: {
    paddingVertical: 10,
    ...getText(FONT_SIZE.HEAD_3, FONT_WEIGHT.NORMAL)
  },
  button: {
    alignSelf: 'center',
    paddingHorizontal: 24,
    marginVertical: 10,
    paddingVertical: 10
  }
})
