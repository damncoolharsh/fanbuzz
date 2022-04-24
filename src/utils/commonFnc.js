import stores from '../mobx/index'
import { INPUT_FIELDS } from './statics'

export const validatorFnc = (key, value = "", value2 = "") => {
  if(key == INPUT_FIELDS.FULL_NAME) {
    if(!value || value.length < 4 ) {
      return "Enter valid full name"
    }
  }
  if(key == INPUT_FIELDS.REPEAT_PASSWORD) {
    if(value !== value2) {
      return "Password did not match"
    }
  }
  if(key == INPUT_FIELDS.EMAIL) {
    if(!value?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return "Enter valid email"
    }
  }
  if(key == INPUT_FIELDS.PASSWORD) {
    if(!value) {
      return "Enter valid password"
    } else if(value.length < 8) {
      return "Password should be atleast 8 character"
    }
  }
}

// svc : service
export const svcHandle = async (func, args) => {
  try {
    var data = await func.apply(this, args)
    return data
  } catch (e) {
    return {
      error: e.message
    }
  }
}