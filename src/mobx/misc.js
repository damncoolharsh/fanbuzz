import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { svcSignInUser, svcSignUpUser, svcSignOutUser } from "../services/authServices";

// Model the application state.
export default class Misc {
  constructor() {
    makeAutoObservable(this)
  }

  loading = false;
  error = "";

  mobSetLoading = (state) => {
    this.loading = state
  }

  mobSetError = (err) => {
    this.error = err
    console.log("err ", err, this.error);
  }
}
