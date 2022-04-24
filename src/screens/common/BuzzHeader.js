import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Logo from '../../assets/logo'
import Colors from '../../utils/Colors'
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters'
import { basicStyles } from '../../utils/commonStyles'
import BuzzIcon from './BuzzIcon'
import { ICONS } from '../../utils/statics'

export default function BuzzHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Logo height={verticalScale(50)} width={scale(80)}/>
      </View>
      <View style={styles.icons}>
        <BuzzIcon 
          name="wallet" 
          type={ICONS.Entypo} 
          color={Colors.black} 
          size={22} 
          style={styles.icon}
          onPress={() => {}} />
        <BuzzIcon 
          name="user" 
          type={ICONS.Feather} 
          color={Colors.black} 
          size={22}
          style={styles.icon}
          onPress={() => {}} />
      </View>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    borderBottomColor: Colors.headerBorder,
    borderBottomWidth: 2,
    paddingHorizontal: '16@s',
    elevation: 1,
    ...basicStyles.rowSpaceBetween
  },
  heading: {
  },
  icons: {
    flexDirection: 'row'
  },
  icon: {
    paddingLeft: '24@s'
  }
})