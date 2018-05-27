import React, { Component } from 'react';
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import logo from './logo.svg';

//components
import Emoji from './Emoji';

//styles
import './App.scss';
import './App.less';
import './App.styl';

//modules
import cssStyles from './First.module.css';
import sassStyles from './Second.module.scss';
import lessStyles from './Third.module.less';
import stylusStyles from './Fourth.module.styl';

import styles from './App.module.css'

@observer
class App extends Component {
  @observable testObservable = 'hello'
  render() {
    return (
      <div className={styles.testModule}>
        wowwww {this.testObservable}
      </div>
    );
  }
}

export default App;
