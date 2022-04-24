import { Dimensions } from 'react-native'

export const FONT_SIZE = {
  HEAD_1: 18,
  HEAD_2: 16,
  HEAD_3: 14,
  HEAD_4: 12,
}

export const FONT_WEIGHT = {
  NORMAL: 'normal',
  BOLD: 'bold'
}

export const INPUT_FIELDS = {
  USER: "username",
  PASSWORD: 'password',
  EMAIL: 'email',
  FULL_NAME: 'full name',
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
  REPEAT_PASSWORD: 'repeat_password'
}

export const ICONS = {
  AntDesign: "AntDesign",
  Entypo: "Entypo",
  EvilIcons: "EvilIcons",
  Feather: "Feather",
  FontAwesome: "FontAwesome",
  FontAwesome5: "FontAwesome5",
  FontAwesome5Pro: "FontAwesome5Pro",
  Fontisto: "Fontisto",
  Foundation: "Foundation",
  Ionicons: "Ionicons",
  MaterialCommunityIcons: 'MaterialCommunityIcons'
}

export const WIDTH = Dimensions.get('screen').width
export const HEIGHT = Dimensions.get('screen').height
