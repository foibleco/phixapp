import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
// import {find} from 'lodash'

import styles from './IntegrationUploadCompleteDialog.module.css'
import Button from '../../components/Button'
import {Icon} from '../../components/Icon'
import SimpleDialog from '../../components/SimpleDialog'

@observer
export default class IntegrationUploadCompleteDialog extends React.Component{
    @observable uploading = true

    componentDidMount(){
        setTimeout(this.mockUploadComplete, 5000)
    }

    @action mockUploadComplete = () => {
        console.log('mock upload complete')
        this.uploading = false      
        this.props.onUploadComplete({
            //this is where real data would get passed up
        })
    }

    render(){
        return(
            <SimpleDialog
                context = {
                    this.uploading? `Uploading data from ${this.props.integrateWith} to your PHIX account...`
                    : 'Complete! ...insert some text about what actually got synced.'
                }
                buttonLabel = {'Sync '+ this.props.nextType}
                hasButton = {!this.uploading} //until...
                onButtonClick = {this.props.startNextIntegrationType}
                subButtonLabel = {this.uploading? 'Cancel' : 'Add another '+this.props.type}
                hasSubButton = {true}
                onSubButtonClick = {this.props.addAnotherIntegrationOfSameType}
            />
        )
    }
}

export const IntegrationUploadAnimation = (props) => {
    return(
        <div className = {styles.uploadAnimation}>
            <div className = {styles.appBadge}>
                <Icon img = "ucsf" />
            </div>
            <div className = {styles.dataflow}>
                <Icon img = "logo_data_top" className = {styles.dataTop} />
                <Icon img = "logo_data_mid" className = {styles.dataMid} />
                <Icon img = "logo_data_low" className = {styles.dataLow} />
            </div>
            <Icon img = "phix_nodata" size = "centerpiece" className = {styles.logo} />

        </div>
    )
}
