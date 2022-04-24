import { inject, observer } from 'mobx-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters'
import { getMatchList } from '../../services/fantansyService'
import Colors from '../../utils/Colors'
import { getText } from '../../utils/commonStyles'
import { FONT_SIZE, FONT_WEIGHT, HEIGHT } from '../../utils/statics'
import BuzzHeader from '../common/BuzzHeader'
import BuzzMatchCard from '../common/BuzzMatchCard'
import moment from 'moment'

function Home(props) {
  const { authStore, miscStore, navigation } = props
  const { userData } = props.authStore
  const [matchList, setMatchList] = useState([])
  const [myMatches, setMyMatches] = useState([])

  const TABS = [
    { title: "Upcoming Matches", list: matchList, tabTitle: "All Contests" },
    { title: "My Matches", list: myMatches, tabTitle: "My Teams" },
  ]

  const Tab = createMaterialTopTabNavigator()

  useEffect(() => {
    getUpcomingMatches()
  }, [])

  const getUpcomingMatches = () => {
    miscStore.mobSetLoading(true)
    getMatchList()
      .then(data => {
        if (data?.matchList) {
          var result = data?.matchList
          result = result.sort((first, second) => {
            return moment(first.date).diff(second.date)
          })
          result = result.filter(item => moment().diff(moment(item.date)) >= 0)
          result.reverse()
          setMatchList(result)
        }
        miscStore.mobSetLoading(false)
      })
      .catch(e => {
        console.log(e);
        miscStore.mobSetLoading(false)
      })
  }

  const _renderHeading = (title) => {
    return (
      <View style={styles.heading}>
        <Text style={styles.headText}>{title}</Text>
      </View>
    )
  }

  const _renderContent = (item) => {
    return (
      <View style={styles.main}>
        <ScrollView contentContainerStyle={styles.body}>
          {_renderHeading(item.title)}
          {item.list.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  ...styles.matchCard,
                  paddingTop: index == 0 ? 0 : verticalScale(16)
                }}
                onPress={() => {
                  navigation.navigate("Contests", {
                    item
                  })
                }}
              >
                <BuzzMatchCard item={item} />
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BuzzHeader />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItem,
          tabBarIndicatorStyle: styles.indicatorStyle
        }}
      >
        {TABS.map(item => (
          <Tab.Screen name={item.tabTitle} children={() => _renderContent(item)} />
        ))}
      </Tab.Navigator>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  main: {
    flex: 1,
    backgroundColor: Colors.white
  },
  body: {
    paddingHorizontal: '16@s',
    backgroundColor: Colors.white,
    paddingBottom: '16@vs'
  },
  heading: {
    paddingVertical: '14@vs',
  },
  headText: {
    ...getText(FONT_SIZE.HEAD_2, FONT_WEIGHT.BOLD)
  },
  matchCard: {
    paddingTop: '16@vs'
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
  }
})

export default inject('authStore', 'miscStore')(observer(Home))
