import React, { Component } from 'react';
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import styles from './App.module.css'

// import Header from './components/Header'
import Onboarding from './workflows/onboarding/Onboarding'

const steps = ['onboarding']
class AppStore{
  @observable section = 'onboarding'
}

const store = new AppStore()
window.store = store

@observer
class App extends Component {


  onboardingBack = () => {
    console.log(this.onboarding.goBack)
  }

  render() {
    return (
      <div>
        <Onboarding 
          //pass in search string from header
        />
      </div>
    );
  }
}

export default App;
