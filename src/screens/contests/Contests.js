import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BuzzHeader from '../common/BuzzHeader'
import { basicStyles, getText } from '../../utils/commonStyles'
import { FONT_SIZE, FONT_WEIGHT } from '../../utils/statics'
import { scale, ScaledSheet } from 'react-native-size-matters'
import Colors from '../../utils/Colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

export default function Contests({ route }) {
  const { item } = route?.params || {}
  const teams = item?.teams

  const TABS = [
    { title: "Upcoming Matches", list: [], tabTitle: "All Contests", key: "contests" },
    { title: "My Matches", list: [], tabTitle: "My Teams", key: "teams" },
  ]

  const Tab = createMaterialTopTabNavigator()

  const _renderHeading = (title) => {
    return (
      <View style={styles.heading}>
        <Text style={styles.headText}>{title}</Text>
      </View>
    )
  }

  const _renderContestCard = (item) => {
    return (
      <View style={styles.cardBody}>
        <View style={{...basicStyles.rowSpaceBetween, alignItems: 'flex-start'}}>
          <View style={styles.pricePool}>
            <Text style={styles.poolText}>Price Pool</Text>
            <Text style={styles.priceText}>₹ 39000</Text>
          </View>
          <View style={styles.entry}>
            <Text style={styles.entryText}>₹ 39</Text>
          </View>
        </View>
        <View style={styles.extraInfo}>
          <Text style={styles.infoText}>1st ₹1000</Text>
          <Text style={styles.infoText}>15 members</Text>
        </View>
      </View>
    )
  }

  const _renderTeamCard = () => {
    return (
      <View style={styles.teamCard}>
        <View style={styles.teamHead}>
          <View style={{...styles.teamPlayer}}>
            <Text style={getText(FONT_SIZE.HEAD_2, FONT_WEIGHT.NORMAL, Colors.white)}>8</Text>
            <Text style={styles.teamName}>{teams[0]}</Text>
          </View>
          <View style={styles.line}/>
          <View style={{...basicStyles.colHCenter}}>
            <Text style={getText(FONT_SIZE.HEAD_2, FONT_WEIGHT.NORMAL, Colors.white)}>8</Text>
            <Text style={styles.teamName}>{teams[0]}</Text>
          </View>
        </View>
        <View style={{...basicStyles.rowSpaceBetween, paddingBottom: 16, paddingHorizontal: 16}}>
          <Text style={{...styles.teamName, width: '50%'}}>C. {teams[0]}</Text>
          <Text style={{...styles.teamName, width: '50%'}}>VC. {teams[0]}</Text>
        </View>
        <View style={styles.teamId}>
          <Text style={styles.idText}>T12234234342</Text>
        </View>
      </View>
    )
  }

  const _renderTabContent = (item) => {
    switch(item.key) {
      case "contests":
        return (
          <View style={styles.body}>
            {_renderHeading("Available Matches")}
            <View>
              {_renderContestCard()}
            </View>
          </View>
        ) 
      case "teams":
        return (
          <View style={styles.body}>
            {_renderHeading("My Teams")}
            <View>
              {_renderTeamCard()}
            </View>
          </View>
        )
    }
  }

  return (
    <View style={styles.container}>
      <BuzzHeader />
      {teams ? 
      <>
        <View style={styles.matchInfo}>
          <Text style={styles.matchText}>{teams[0]}</Text>
          <Text style={styles.matchText}>VS</Text>
          <Text style={styles.matchText}>{teams[1]}</Text>
        </View>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: styles.tabLabel,
            tabBarItemStyle: styles.tabItem,
            tabBarIndicatorStyle: styles.indicatorStyle
          }}
        >
          {TABS.map(item => (
            <Tab.Screen name={item.tabTitle} children={() => _renderTabContent(item)} />
          ))}
        </Tab.Navigator>
      </> :
      <View style={{...styles.heading, paddingHorizontal: scale(16)}}>
        <Text style={styles.headText}>No Contest Available</Text>
      </View>}
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  heading: {
    paddingVertical: '14@vs',
  },
  headText: {
    ...getText(FONT_SIZE.HEAD_2, FONT_WEIGHT.BOLD)
  },
  body: {
    paddingHorizontal: '16@s',
    backgroundColor: Colors.white,
    paddingBottom: '16@vs'
  },
  cardBody: {
    backgroundColor: Colors.cardBlue,
    justifyContent: 'flex-start',
    borderTopLeftRadius: 8,
    borderBottomEndRadius: 8
  },
  pricePool: {
    paddingHorizontal: '16@s',
  },
  poolText: {
    ...getText(FONT_SIZE.HEAD_3, FONT_WEIGHT.NORMAL, Colors.white),
    paddingBottom: '4@s',
    paddingVertical: '10@s'
  },
  priceText: {
    ...getText(FONT_SIZE.HEAD_2, FONT_WEIGHT.NORMAL, Colors.white),
    paddingBottom: '15@s'
  },
  entry: {
    backgroundColor: Colors.green,
    paddingHorizontal: '16@s',
    alignItems: 'center',
    justifyContent: 'center'
  },
  entryText: {
    ...getText(FONT_SIZE.HEAD_3, FONT_WEIGHT.NORMAL, Colors.white),
    paddingVertical: '8@s'
  },
  extraInfo: {
    paddingHorizontal: '16@s',
    flexDirection: 'row-reverse'
  }, 
  infoText: {
    ...getText(FONT_SIZE.HEAD_3, FONT_WEIGHT.NORMAL, Colors.white),
    paddingLeft: '14@s',
    paddingBottom: '8@s',
  },
  matchInfo: {
    ...basicStyles.rowSpaceBetween,
    paddingVertical: '14@s',
    borderBottomColor: Colors.tabBorder,
    borderBottomWidth: 1,
    paddingHorizontal: '16@s',
  },
  matchText: {
    ...getText(FONT_SIZE.HEAD_3, FONT_WEIGHT.NORMAL),
  },
  indicatorStyle: {
    width: scale(120),
    borderBottomColor: Colors.tabBorder,
    borderBottomWidth: 4,
    borderRadius: 2
  },
  tabItem: {
    width: scale(120),
    paddingLeft: 24,
    alignItems: 'flex-start'
  },
  tabLabel: {
    ...getText(FONT_SIZE.HEAD_4, FONT_WEIGHT.BOLD)
  },

  teamCard: {
    backgroundColor: Colors.green,
    borderTopLeftRadius: 8,
    borderBottomEndRadius: 8
  },
  teamHead: {
    paddingVertical: '10@s',
    ...basicStyles.rowSpaceBetween,
    alignItems: 'flex-start'
  },
  teamName: {
    ...getText(FONT_SIZE.HEAD_3, FONT_WEIGHT.NORMAL, Colors.white),
    paddingTop: 10,
    maxWidth: '70%',
    textAlign: 'center'
  },
  teamPlayer: {
    ...basicStyles.colHCenter
  },
  line: { 
    borderWidth: 0.5, 
    borderColor: Colors.white, 
    height: '100%' 
  },
  teamId: {
    backgroundColor: Colors.darkGreen,
    alignItems: 'center',
    borderBottomEndRadius: 8
  },
  idText: {
    paddingVertical: scale(8),
    ...getText(FONT_SIZE.HEAD_3, FONT_WEIGHT.BOLD, Colors.white)
  }
})