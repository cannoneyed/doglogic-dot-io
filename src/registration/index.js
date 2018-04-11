import {observable} from 'mobx'

const REGISTERED = '@doglogic.io/registered'

class RegistrationManager {
  @observable hasRegistered = false

  constructor() {
    this.hasRegistered = !!localStorage.getItem(REGISTERED)
  }

  setRegistered = () => {
    localStorage.setItem(REGISTERED, 'true');
    this.hasRegistered = true
  }
}

export const registrationManager = new RegistrationManager()