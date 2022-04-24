import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../../utils/Colors'
import { basicStyles, getText } from '../../utils/commonStyles'
import { FONT_SIZE, FONT_WEIGHT } from '../../utils/statics'

export default function BuzzButton({
  onPress,
  style,
  children,
  textStyle
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    flexDirection: 'row',
    borderRadius: 10,
    ...basicStyles.center
  },
  buttonText: {
    ...getText(FONT_SIZE.HEAD_3, FONT_WEIGHT.BOLD, Colors.white)
  }
})
