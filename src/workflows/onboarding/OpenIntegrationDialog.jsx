import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import {find} from 'lodash'

import styles from './OpenIntegrationDialog.module.css'
import Button from '../../components/Button'
import {Icon} from '../../components/Icon'
import SimpleDialog from '../../components/SimpleDialog'

import mockEntryLists from '../../mockdata/mockEntryLists'

@observer
export default class OpenIntegrationDialog extends React.Component{

    render(){
        const app = find(mockEntryLists[this.props.type], (o)=> { return o.name === this.props.integrateWith})
        const portal = app.portal || app.name 
        return(
            <SimpleDialog
                img = {(
                    <React.Fragment>
                        <div className = {styles.appBadge}>
                           <Icon img = {app.logo+'_original'} size = "large" />
                        </div>
                        <div className = {styles.speechbubble}>
                            <Icon className = {styles.largerLogo} img = 'phix' />
                            <div className = {styles.questionMark}> ? </div>
                        </div>
                    </React.Fragment>
                )}
                context = {(<span><span className = {styles.em}>{portal} will ask you for permission</span> to authorize PHIX to use your data now. Make sure to say yes!</span>)}
                buttonLabel = {`OK, open ${portal}`}
                onButtonClick = {this.props.onConfirm}
            />
        )
    }
}