import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../../utils/Colors'
import { basicStyles, getText } from '../../utils/commonStyles'
import Logo from '../../assets/logo'
import { FONT_SIZE, FONT_WEIGHT, INPUT_FIELDS } from '../../utils/statics'
import { BuzzButton, BuzzInput } from '../common'
import { svcHandle, validatorFnc } from '../../utils/commonFnc'
import { inject, observer } from 'mobx-react'

function Login({ navigation, authStore, miscStore }) {
  const { signInUser } = authStore
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [showError, setShowError] = useState(false)

  const validator = () => {
    var valid = true
    if(
      validatorFnc(INPUT_FIELDS.EMAIL, email) ||
      validatorFnc(INPUT_FIELDS.PASSWORD, password)
    ) {
      valid = false
    }
    return valid
  }

  const onSubmit = async () => {
    if(validator()) {
      miscStore.mobSetLoading(true)
      var result = await svcHandle(signInUser, [{
        email,
        password
      }])
      miscStore.mobSetLoading(false)
      if(result?.error) {
        miscStore.mobSetError(result.error)
      }
    } else {
      setShowError(true)
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Logo height={100} width={120}/>
      </View>
      <Text style={styles.subHeading}>Log In</Text>
      <BuzzInput 
        placeholder="Email"
        value={email}
        onChangeText={(val) => [setEmail(val), setShowError(false)]}
        containerStyle={styles.input}
        error={showError && validatorFnc(INPUT_FIELDS.EMAIL, email)}
      />
      <BuzzInput 
        placeholder="Password"
        value={password}
        onChangeText={(val) => [setPassword(val), setShowError(false)]}
        containerStyle={styles.input}
        error={showError && validatorFnc(INPUT_FIELDS.PASSWORD, password)}
        secureTextEntry={true}
      />

      <BuzzButton style={styles.button} onPress={onSubmit}>
        Submit
      </BuzzButton>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.linkText}>Create New Account</Text>
      </TouchableOpacity>  
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
  },

  heading: {
    ...basicStyles.colHCenter,
    paddingVertical: 30
  },

  subHeading: {
    ...getText(FONT_SIZE.HEAD_1, FONT_WEIGHT.BOLD),
    paddingBottom: 10
  },

  input: {
    marginVertical: 10
  },

  button: {
    marginTop: 20
  },

  linkText: {
    ...getText(FONT_SIZE.HEAD_3, FONT_WEIGHT.NORMAL, Colors.primary),
    paddingVertical: 14,
    alignSelf: 'center',
  },
})

export default inject('authStore', 'miscStore')(observer(Login))
