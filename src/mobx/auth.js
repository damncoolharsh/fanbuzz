import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { svcSignInUser, svcSignUpUser, svcSignOutUser, svcGetUserData } from "../services/authServices";

// Model the application state.
export default class Auth {
  userData;
  isAthenticated = false;

  constructor() {
    makeAutoObservable(this)
  }

  mobSetUser = (userData) => {
    if(userData) {
      this.isAthenticated = true
      this.userData = userData
    }
  }

  userStateChange = async (user) => {
    console.log(user);
    var svcUserData = await svcGetUserData(user.email)
    if(svcUserData) {
      this.userData = svcUserData
      this.isAthenticated = true
    }
  }

  signInUser = async ({ email, password }) => {
    console.log(email, password);
    var svcUserData = await svcSignInUser(email, password)
    if(svcUserData) {
      this.userData = svcUserData
      this.isAthenticated = true
    }
  }

  signUpUser = async (enteredData) => {
    var svcUserData = await svcSignUpUser(enteredData)
    if(svcUserData) {
      this.userData = svcUserData
      this.isAthenticated = true
    }
  }

  signOutUser = async (enteredData) => {
    var svcUserData = await svcSignOutUser(enteredData)
    if(svcUserData) {
      this.userData = undefined
      this.isAthenticated = false
    }
  }
}
