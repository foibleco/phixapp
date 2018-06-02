import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import styles from './Onboarding.module.css'
import PickIntegrationTypes from './PickIntegrationTypes'
import FindIntegration from './FindIntegration'
import OpenIntegrationDialog from './OpenIntegrationDialog'
import MockIntegration from './MockIntegration'
import IntegrationUploadCompleteDialog from './IntegrationUploadCompleteDialog'

const steps = ['pick', 'find', 'login', 'notify', 'outside', 'uploading']

@observer
export default class Onboarding extends React.Component{
    @observable step = 'pick' //pick, find, login 
    @observable integrations = []
    @observable currentIntegration = null
    @observable currentIntegrationTypeIndex = 0
    @observable syncedIntegrations = []
    @action setIntegrations = (integrations) =>{ 
        console.log('user set',integrations.length,'integrations:',integrations.join(', '))
        this.integrations = integrations
        this.next()
    }
    @action setCurrentIntegration = (integration) => {
        this.currentIntegration = integration 
        console.log('logged in to / now asking permission for', this.currentIntegration)
        this.next()
    }
    @action pickedIntegrationAccount = () => this.next()
    @action syncedIntegrationAccount = () => {
        this.syncedIntegrations.push({
            type: this.integrations[this.currentIntegrationTypeIndex],
            name: this.currentIntegration,
            data: 'foo'
        })
    }
    @action startNextIntegrationType = () => {
        console.log('user done with syncing', this.integrations[this.currentIntegrationTypeIndex])
        console.log(this.syncedIntegrations)
        if(this.currentIntegrationTypeIndex === this.integrations.length-1){
            console.log('no more integrations - call onboarding completion dialog')
            return
        }
        this.currentIntegrationTypeIndex ++
        this.currentIntegration = null
        this.step = 'find'
    }
    @action addAnotherIntegrationOfSameType = () => {
        console.log('user wants to add another', this.integrations[this.currentIntegrationTypeIndex])
        console.log(this.syncedIntegrations)
        this.step = 'find'
        this.currentIntegration = null
    }
    @action next = () => {
        const currentStepIndex = steps.indexOf(this.step)
        if(currentStepIndex===steps.length-1) return
        else this.step = steps[currentStepIndex+1]
    }
    @action goBack = () => {
        const currentStepIndex = steps.indexOf(this.step)
        if(currentStepIndex===0) return
        else if(this.step==='notify') this.step = 'find'
        else this.step = steps[currentStepIndex-1]
        //TODO: clearing applicable data when user goes back
            //also, some kind of sanity check dialog for certain back operations
    }

    render(){
        return(
            <div className = {styles.onboarding}>
                <span 
                    style = {{position: 'absolute', zIndex: 30}}
                    onClick = {this.goBack}
                > 
                    debug back button 
                </span>
                {this.step === 'pick' &&
                    <PickIntegrationTypes 
                        onComplete = {this.setIntegrations}
                    />
                }
                {(this.step === 'find' || this.step=== 'login') &&
                    <FindIntegration 
                        integration = {this.integrations[this.currentIntegrationTypeIndex]} 
                        onSelect = {this.pickedIntegrationAccount}
                        mode = {this.step}
                        onLogin = {this.setCurrentIntegration}
                    />
                }
                {(this.step === 'notify' || this.step === 'outside') &&
                    <OpenIntegrationDialog
                        integrateWith = {this.currentIntegration}
                        type = {this.integrations[this.currentIntegrationTypeIndex]}
                        onConfirm = {this.next}

                    />
                }
                {(this.step === 'outside' || this.step === 'uploading') &&
                    <MockIntegration
                        app = "myChart"
                        display = {this.step === 'uploading'? false : true}
                        onConfirm = {this.next}
                        onCancel = {this.goBack}
                    />
                }
                {this.step === 'uploading' && 
                    <IntegrationUploadCompleteDialog
                        integrateWith = {this.currentIntegration}
                        type = {this.integrations[this.currentIntegrationTypeIndex]}
                        nextType = {
                            this.currentIntegrationTypeIndex < this.integrations.length - 1? this.integrations[this.currentIntegrationTypeIndex+1] 
                                : 'none'
                        }
                        onUploadComplete = {this.syncedIntegrationAccount}
                        startNextIntegrationType = {this.startNextIntegrationType}
                        addAnotherIntegrationOfSameType = {this.addAnotherIntegrationOfSameType}
                    />
                }


            </div>
        )
    }
}