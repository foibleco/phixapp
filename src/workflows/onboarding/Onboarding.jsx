import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import '../../App.css'
import styles from './Onboarding.module.css'
import PickIntegrationTypes from './PickIntegrationTypes'
import FindIntegration from './FindIntegration'


const steps = ['pick', 'find', 'login']

@observer
export default class Onboarding extends React.Component{
    @observable step = 'pick' //pick, find, login 
    @observable integrations = []
    @observable syncedIntegrations = []
    @action setIntegrations = (integrations) =>{ 
        console.log('user set',integrations.length,'integrations:',integrations.join(', '))
        this.integrations = integrations
        this.step = 'find'
    }
    @action pickedIntegrationAccount = () => this.step = 'login'
    @action syncedIntegrationAccount = () => {

    }

    @action goBack = () => {
        const currentStepIndex = steps.indexOf(this.step)
        if(currentStepIndex===0) return
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
                    />
                }
            </div>
        )
    }
}