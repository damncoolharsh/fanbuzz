import Auth from "./auth";
import Misc from './misc'

class Stores {
  authStore = new Auth();
  miscStore = new Misc()
}

export default new Stores()