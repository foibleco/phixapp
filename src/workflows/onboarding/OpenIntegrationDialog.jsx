import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import styles from './OpenIntegrationDialog.module.css'
import Button from '../../components/Button'

@observer
export default class OpenIntegrationDialog extends React.Component{

    render(){
        return(
            <div className = {styles.openIntegrationDialog}>
                <div className = {styles.image}>
                    img will go here
                </div>
                <p className = {styles.context}>
                    {this.props.app} will ask you for permission to authorize PHIX to use your data now -- make sure to say yes. 
                </p>
                <Button label = {`OK, go to ${this.props.app}`} />
            </div>
        )
    }
}