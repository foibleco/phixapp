import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import FlipMove from 'react-flip-move'

import styles from './Onboarding.module.css'
import PickIntegrationTypes from './PickIntegrationTypes'
import FindIntegration from './FindIntegration'
import OpenIntegrationDialog from './OpenIntegrationDialog'
import MockApp from './MockApp'
import UploadCompleteDialog from './UploadCompleteDialog'

const steps = ['pick', 'find', 'login', 'notify', 'outside', 'uploading']

class OnboardingStore {
    @observable step = 'pick' //pick, find, login 
    @observable integrations = []
    @observable currentIntegration = null
    @observable currentIntegrationTypeIndex = 0
    @observable syncedIntegrations = []

    @observable animationDirection = 'forward'

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
        this.goBack('find')
    }
    @action addAnotherIntegrationOfSameType = () => {
        console.log('user wants to add another', this.integrations[this.currentIntegrationTypeIndex])
        console.log(this.syncedIntegrations)
        this.goBack('find')
        this.currentIntegration = null
    }
    @action next = () => {
        const currentStepIndex = steps.indexOf(this.step)
        if(currentStepIndex===steps.length-1) return
        else this.step = steps[currentStepIndex+1]

        this.animationDirection = 'forward'
    }
    @action goBack = (backTo) => {
        if(steps.includes(backTo)){ 
            this.step = backTo
            return
        }
        const currentStepIndex = steps.indexOf(this.step)
        if(currentStepIndex===0) return
        else if(this.step==='notify') this.step = 'find'
        else this.step = steps[currentStepIndex-1]

        this.animationDirection = 'back'
        //TODO: clearing applicable data when user goes back
            //also, some kind of sanity check dialog for certain back operations
    }
}

const store = new OnboardingStore()
window.onboarding = store 

@observer
export default class Onboarding extends React.Component{
    render(){
        const fwd = store.animationDirection === 'forward'
        const enterUp = store.step === 'outside'
        const exitDown = store.step === 'uploading'
        return(
            <div className = {styles.onboarding}>
                <span 
                    style = {{position: 'absolute', zIndex: 30}}
                    onClick = {store.goBack}
                > 
                    debug back button 
                </span>
                <FlipMove 
                    className = {styles.flipmoveContainer}
                    duration = {(enterUp || exitDown)? 600 : 400}
                    enterAnimation = {{
                        from: !enterUp? {transform: `translateX(${fwd? 100 : -100}px)`, opacity: 0}:
                            {transform: 'translateY(100%)', opacity: 1} ,
                        to: {transform: 'translate(0,0)', opacity: 1}
                    }}
                    leaveAnimation = {{
                        from: {transform: 'translate(0px, 0px)', opacity: 1},
                        to: !exitDown? {transform: `translateX(${fwd? -100 : 100}px)`, opacity: 0}
                            : {transform: 'translateY(100%)'}
                    }}
                >
                {store.step === 'pick' &&
                    <PickIntegrationTypes 
                        onComplete = {store.setIntegrations}
                    />
                }
                {(store.step === 'find' || store.step=== 'login') &&
                    <FindIntegration 
                        integration = {store.integrations[store.currentIntegrationTypeIndex]} 
                        onSelect = {store.pickedIntegrationAccount}
                        mode = {store.step}
                        onLogin = {store.setCurrentIntegration}
                        alreadySynced = {store.syncedIntegrations}
                    />
                }
                {(store.step === 'notify' || store.step === 'outside') &&
                    <OpenIntegrationDialog
                        integrateWith = {store.currentIntegration}
                        type = {store.integrations[store.currentIntegrationTypeIndex]}
                        onConfirm = {store.next}

                    />
                }
                {(store.step === 'outside') &&
                    <MockApp
                        app = "myChart"
                        display = {store.step === 'uploading'? false : true}
                        onConfirm = {store.next}
                        onCancel = {store.goBack}
                    />
                }
                {store.step === 'uploading' && 
                    <UploadCompleteDialog
                        integrateWith = {store.currentIntegration}
                        type = {store.integrations[store.currentIntegrationTypeIndex]}
                        nextType = {
                            store.currentIntegrationTypeIndex < store.integrations.length - 1? store.integrations[store.currentIntegrationTypeIndex+1] 
                                : ''
                        }
                        onUploadComplete = {store.syncedIntegrationAccount}
                        startNextIntegrationType = {store.startNextIntegrationType}
                        addAnotherIntegrationOfSameType = {store.addAnotherIntegrationOfSameType}
                    />
                }
                </FlipMove>


            </div>
        )
    }
}