import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import styles from './Onboarding.module.css'
import PickIntegrationTypes from './PickIntegrationTypes'
import FindIntegration from './FindIntegration'
import OpenIntegrationDialog from './OpenIntegrationDialog'


const steps = ['pick', 'find', 'login', 'notify', 'outside']

@observer
export default class Onboarding extends React.Component{
    @observable step = 'pick' //pick, find, login 
    @observable integrations = []
    @observable currentIntegration = null
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
                        integration = {this.integrations[0]} 
                        onSelect = {this.pickedIntegrationAccount}
                        mode = {this.step}
                        onLogin = {this.setCurrentIntegration}
                    />
                }
                {(this.step === 'notify' || this.step === 'outside') &&
                    <OpenIntegrationDialog
                        integrateWith = {this.currentIntegration}
                        type = {this.integrations[0]}
                        onConfirm = {this.step==='notify'? this.next : ''}

                    />
                }
                {this.step === 'outside' &&
                    <MockOutsideApp
                        app = "myChart"
                    />
                }


            </div>
        )
    }
}