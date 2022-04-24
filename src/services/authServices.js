import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const svcSignInUser = async (email, password) => {
  await auth().signInWithEmailAndPassword(email, password)
  const userData = await svcGetUserData(email)
  return userData
}

export const svcSignUpUser = async (userData) => {
  const { email, password } = userData
  var dataToSave = {...userData}
  await auth().createUserWithEmailAndPassword(email, password)
  const userDocument = firestore().collection('Users');
  delete dataToSave.password
  await userDocument.add(dataToSave)
  return dataToSave
}

export const svcGetUserData = async (email) => {
  var userData = {}
  var snapshot = await firestore().collection('Users').where('email', '==', email).get()
  snapshot.forEach(doc => {
    userData = {...doc.data()}
  })
  return userData
}

export const svcSignOutUser = async (username, password) => {
  await auth().signOut()
}