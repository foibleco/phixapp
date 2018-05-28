import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import styles from './OpenIntegrationDialog.module.css'
import Button from '../../components/Button'
import {Icon} from '../../components/Icon'

@observer
export default class OpenIntegrationDialog extends React.Component{

    render(){
        return(
            <div className = {styles.openIntegrationDialog}>
                <div className = {styles.image}>
                    <div className = {styles.appBadge}>
                        <Icon img = "ucsf" size = "large" />
                    </div>
                </div>
                <p className = {styles.context}>
                    {this.props.app} will ask you for permission to authorize PHIX to use your data now -- make sure to say yes. 
                </p>
                <Button label = {`OK, go to ${this.props.app}`} />
            </div>
        )
    }
}