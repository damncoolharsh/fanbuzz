import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Colors from '../../utils/Colors'
import { getText } from '../../utils/commonStyles'
import { FONT_SIZE, FONT_WEIGHT } from '../../utils/statics'

export default function BuzzInput(props) {
  const {
    inputStyle = {},
    onChangeText,
    keyboardType,
    value,
    placeholder,
    error,
    containerStyle,
    secureTextEntry
  } = props
  return (
    <View style={containerStyle}>
      <TextInput 
        style={[styles.input, inputStyle]}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
      {error &&
      <Text style={styles.error}>{error}</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    ...getText(FONT_SIZE.HEAD_2)
  },
  error: {
    ...getText(FONT_SIZE.HEAD_3, FONT_WEIGHT.NORMAL, Colors.red),
    paddingHorizontal: 14,
    paddingTop: 6
  }
})
