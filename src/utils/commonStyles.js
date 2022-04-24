import { StyleSheet } from 'react-native'
import Colors from './Colors'
import { FONT_SIZE, FONT_WEIGHT } from './statics'

export const basicStyles = StyleSheet.create({
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  colHCenter: {
    alignItems: 'center'
  }
})

export const regularText = StyleSheet.create({
  head1: {
    fontSize: 18,
    color: Colors.black
  },
  head2: {
    fontSize: 16,
    color: Colors.black
  },
  
})

export const getText = (size, bold, color) => {
  var fontFamily = bold == FONT_WEIGHT.BOLD ? 'Sansation_Bold' : 'Sansation_Regular'
  return {
    fontSize: size,
    color: color,
    fontFamily: fontFamily
  }
}