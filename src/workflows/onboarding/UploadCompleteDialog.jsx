import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import {find} from 'lodash'
import FlipMove from 'react-flip-move'

import styles from './UploadCompleteDialog.module.css'
import Button from '../../components/Button'
import {Icon} from '../../components/Icon'
import SimpleDialog from '../../components/SimpleDialog'


import mockEntryLists from '../../mockdata/mockEntryLists'

@observer
export default class UploadCompleteDialog extends React.Component{
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
                selfCentering = {true}
                img = {<IntegrationUploadAnimation type = {this.props.type} integrateWith = {this.props.integrateWith} complete = {!this.uploading}/>}
                context = {
                    this.uploading? `Uploading your ${this.props.integrateWith} data to your PHIX account...`
                    : fakeSyncedDataBlurb[this.props.type]()
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
    const app = find(mockEntryLists[props.type], (o)=> { return o.name === props.integrateWith})
    return(
            <FlipMove className = {styles.uploadAnimation} 
                enterAnimation = {{from: {opacity: 0}, to: {opacity: 1}}}
                leaveAnimation = {{from: {transform: 'translateX(0px)', opacity: 1}, to: {transform: 'translateX(20px)', opacity: 0}}}
            >
            {!props.complete && 
                <div className = {styles.appBadge}>
                    <Icon img = {app.logo} />
                </div>
            }
            <FlipMove 
                key = "logoAnim"
                className = {styles.logoAnimation}
                enterAnimation = {{from: {opacity: 0}, to: {opacity: 1}}}
                leaveAnimation = {{from: {opacity: 1, transform: 'scaleX(1)'}, to: {opacity: 0, transform: 'scaleX(0.5)'}}}
            >
                {!props.complete &&
                <div style = {{zIndex: 1}}>
                    <div className = {styles.dataflow}>
                        <Icon img = "logo_data_top" className = {styles.dataTop} />
                        <Icon img = "logo_data_mid" className = {styles.dataMid} />
                        <Icon img = "logo_data_low" className = {styles.dataLow} />
                    </div>
                </div>
                }
                <div style = {{zIndex: 2}} key = "logo" >  
                    <Icon className = {styles.logo} img = "phix_nodata" size = "centerpiece"  /> 
                    <div className = {[styles.completionContextBubble, props.complete? styles.show : styles.hide].join(' ')}>
                        <Icon img = {app.logo} />
                        <div className = {styles.checkBadge}>
                            <Icon img = "check" size = "small" />
                        </div>
                    </div>
                </div>
                <div style = {{position: 'absolute'}}> 
                    <Icon className = {[styles.logodata, props.complete? styles.complete: ''].join(' ')} img = "phix_dataonly" size = "centerpiece"  />
                </div>
                
            </FlipMove>
            </FlipMove>
    )
}

const fakeSyncedDataBlurb = {
    //
    'Care Provider': ()=> {
        return `Your care provider data has been added and can be viewed in PHIX anytime. We found ${Math.round(Math.random()*7)} years of data, including ${Math.round(Math.random()*36)} visits with ${Math.round(Math.random()*12)} doctors.`
    },
    'Health Insurance': ()=> {return `Your health insurance account and plan information has been added and can now be viewed in PHIX.`},
    'Pharmacy': ()=> {return `Your health insurance account and plan information has been added and can now be viewed in PHIX.`},
    'Genetics': ()=> {return `Your health insurance account and plan information has been added and can now be viewed in PHIX.`},
    'Health Savings Account': ()=> {return `Your health insurance account and plan information has been added and can now be viewed in PHIX.`},
    'Wearable Devices': ()=> {return `Your health insurance account and plan information has been added and can now be viewed in PHIX.`},
}