import React, { Component } from 'react';
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import styles from './App.module.css'

import SimpleDialog from './components/SimpleDialog'

@observer
class App extends Component {
  @observable testObservable = 'hello'
  render() {
    return (
        <SimpleDialog
            img = "locationpin"
            context = "fuck you"
            buttonLabel = "button"
            hasButton = {true}
        />
    );
  }
}

export default App;
