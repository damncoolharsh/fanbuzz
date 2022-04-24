import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../utils/Colors'
import { ScaledSheet } from 'react-native-size-matters'
import { basicStyles, getText } from '../../utils/commonStyles'
import { FONT_SIZE, FONT_WEIGHT } from '../../utils/statics'
import moment from 'moment'

export default function BuzzMatchCard(props) {
  const { item, width } = props
  const teams = item?.teams
  const days = moment().diff(moment(item.date), 'days')
  var realDate
  if(days == -1) {
    realDate = "Yesterday"
  } else if(days == 0) {
    realDate = "Today"
  } else if(days < -1) {
    realDate = Math.abs(days) + " days ago"
  } else {
    realDate = Math.abs(days) + " days"
  }
  console.log(realDate);
  return (
    <View style={{...styles.container, width: width}}>
      <View style={basicStyles.rowSpaceBetween}>
        <Text style={styles.teamText}>{teams[0]}</Text>
        <Text style={styles.teamText}>VS</Text>
        <Text style={styles.teamText}>{teams[1]}</Text>
      </View>
      <View style={styles.exrtaInfo}>
        <View style={basicStyles.rowSpaceBetween}>
          <Text style={styles.extraText}>{realDate}</Text>
          <Text style={styles.extraText}>Dynamic Price</Text>
        </View>
      </View>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.cardBlue,
    borderRadius: '8@s',
    elevation: 2
  },
  teamText: {
    ...getText(FONT_SIZE.HEAD_3, FONT_WEIGHT.NORMAL, Colors.white),
    paddingHorizontal: '16@s',
    maxWidth: '40%',
    paddingVertical: '24@vs'
  },
  exrtaInfo: {
    backgroundColor: Colors.cardLightBlue,
    paddingVertical: '5@vs',
    borderRadius: '8@s'
  },
  extraText: {
    ...getText(FONT_SIZE.HEAD_3, FONT_WEIGHT.NORMAL, Colors.white),
    paddingHorizontal: '16@s',
    maxWidth: '40%'
  },
})