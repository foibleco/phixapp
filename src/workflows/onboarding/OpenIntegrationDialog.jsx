import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import {find} from 'lodash'

import styles from './OpenIntegrationDialog.module.css'
import Button from '../../components/Button'
import {Icon} from '../../components/Icon'

import mockEntryLists from '../../mockdata/mockEntryLists'

@observer
export default class OpenIntegrationDialog extends React.Component{

    render(){
        const app = find(mockEntryLists[this.props.type], (o)=> { return o.name === this.props.integrateWith})
        const portal = app.portal || app.name 
        return(
            <div className = {styles.openIntegrationDialog}>
                <div className = {styles.image}>
                    <div className = {styles.appBadge}>
                        <Icon img = {app.logo} size = "large" />
                    </div>
                </div>
                <p className = {styles.context}>
                    {portal} will ask you for permission to authorize PHIX to use your data now -- make sure to say yes. 
                </p>
                <Button 
                    label = {`OK, go to ${portal}`} 
                    onClick = {this.props.onConfirm}
                />
            </div>
        )
    }
}