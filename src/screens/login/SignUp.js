import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../../utils/Colors'
import { basicStyles, getText } from '../../utils/commonStyles'
import Logo from '../../assets/logo'
import { FONT_SIZE, FONT_WEIGHT, INPUT_FIELDS } from '../../utils/statics'
import { BuzzButton, BuzzInput } from '../common'
import { inject, observer } from 'mobx-react'
import { svcHandle, validatorFnc } from '../../utils/commonFnc'
import Spinner from '../common/Spinner'

function SignUp({ navigation, authStore, miscStore }) {
  const { signUpUser } = authStore
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [fullName, setFullName] = useState()
  const [repeatPassword, setRepeatPassword] = useState()
  const [showError, setShowError] = useState(false)

  const validator = () => {
    var valid = true
    if(
      validatorFnc(INPUT_FIELDS.EMAIL, email) ||
      validatorFnc(INPUT_FIELDS.PASSWORD, password) ||
      validatorFnc(INPUT_FIELDS.FULL_NAME, fullName) ||
      validatorFnc(INPUT_FIELDS.REPEAT_PASSWORD, repeatPassword, password)
    ) {
      valid = false
    }
    return valid
  }

  const onSubmit = async () => {
    if(validator()) {
      miscStore.mobSetLoading(true)
      var result = await svcHandle(signUpUser, [{
        email,
        password,
        full_name: fullName
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
      <Text style={styles.subHeading}>Create New Account</Text>
      <BuzzInput 
        placeholder="Email"
        value={email}
        onChangeText={(val) => [setEmail(val), setShowError(false)]}
        containerStyle={styles.input}
        error={showError && validatorFnc(INPUT_FIELDS.EMAIL, email)
        }
      />
      <BuzzInput 
        placeholder="Full Name"
        value={fullName}
        onChangeText={(val) => [setFullName(val), setShowError(false)]}
        containerStyle={styles.input}
        error={showError && 
          validatorFnc(INPUT_FIELDS.FULL_NAME, fullName)
        }
      />
      <BuzzInput 
        placeholder="Password"
        value={password}
        onChangeText={(val) => [setPassword(val), setShowError(false)]}
        containerStyle={styles.input}
        error={showError && 
          validatorFnc(INPUT_FIELDS.PASSWORD, password)
        }
        secureTextEntry={true} 
      />
      <BuzzInput 
        placeholder="Repeat Password"
        value={repeatPassword}
        onChangeText={(val) => [setRepeatPassword(val), setShowError(false)]}
        containerStyle={styles.input}
        error={
          showError && 
          validatorFnc(INPUT_FIELDS.REPEAT_PASSWORD, password, repeatPassword)
        }
        secureTextEntry={true} 
      />
      <BuzzButton style={styles.button} onPress={onSubmit}>
        Submit
      </BuzzButton>
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
  }
})

export default inject(
  'authStore',
  'miscStore'
)(observer(SignUp))
