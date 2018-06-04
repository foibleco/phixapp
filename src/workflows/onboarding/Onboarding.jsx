import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import FlipMove from 'react-flip-move'

import styles from './Onboarding.module.css'

import Header from '../../components/Header'

import PickIntegrationTypes from './PickIntegrationTypes'
import FindIntegration from './FindIntegration'
import OpenIntegrationDialog from './OpenIntegrationDialog'
import MockApp from './MockApp'
import UploadCompleteDialog from './UploadCompleteDialog'

const steps = ['pickTypes', 'find', 'login', 'notify', 'outside', 'uploading','uploadComplete']
const backableSteps = ['find', 'login',]
const headerSteps = ['pickTypes','find','login',]

function generateTitle(){
    let title
    console.log(store.step)
    if(store.step==='pickTypes') title = 'Link your accounts with PHIX'
    else if(store.step==='find'){
        const int = store.integrations[store.currentIntegrationTypeIndex]

        if(int === 'Genetics') title = 'Which genetics service do you use?'
        else if(int === 'Wearable Devices') title = 'Which wearable do you want to link?'
        else if(int === 'Pharmacy') title = 'Which pharmacy do you use?'
        else if(int === 'Health Savings Account') title = 'What HSA are you signed up with?'
        else if(!store.userIsRepeatingStep){
            if(int === 'Care Provider') title = 'Who\'s your care provider?'
            else if(int === 'Health Insurance') title = 'What health insurer do you have?'
        }
        else{
            if(int === 'Care Provider') title = 'Who else is your care provider?'
            else if(int === 'Health Insurance') title = 'What other insurer covers/covered you?'
        }
    }
    else if(store.step==='login'){
        const int = store.integrations[store.currentIntegrationTypeIndex]
        if(int==='Care Provider') title = 'Login to your patient portal'
        else if(int==='Health Insurance') title = 'Login to your health insurance'
        else if(int==='Pharmacy') title = 'Login to your pharmacy'
        else if(int==='Genetics') title = 'Login to your genetics service'
        else if(int==='Health Savings Account') title = 'Login to your HSA'
        else if(int==='Wearable Devices') title = 'Login to your wearable account'
    }
    console.log(title)
    return title
}

class OnboardingStore {
    @observable step = 'pickTypes' //pick, find, login 
    @observable title = 'Link your accounts with PHIX'
    @observable integrations = []
    @observable currentIntegration = null
    @observable currentIntegrationTypeIndex = 0
    @observable syncedIntegrations = []
    @observable userIsRepeatingStep = false //flag so we can avoid weird "goback" behavior

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
        this.next()
    }
    @action startNextIntegrationType = () => {
        console.log('user done with syncing', this.integrations[this.currentIntegrationTypeIndex])
        console.log(this.syncedIntegrations)
        if(this.userIsRepeatingStep) this.userIsRepeatingStep = false
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
        this.userIsRepeatingStep = true
        // this.currentIntegration = null //cause going back to uploadComplete you should see the
        // same stuff
    }
    @action next = () => {
        const currentStepIndex = steps.indexOf(this.step)
        if(currentStepIndex===steps.length-1) return
        else this.step = steps[currentStepIndex+1]

        this.animationDirection = 'forward'
        this.title = generateTitle()

    }
    @action goBack = (backTo) => {
        if(steps.includes(backTo)){ 
            this.step = backTo
            this.title = generateTitle()
            return
        }
        else if(this.userIsRepeatingStep && this.step==='find'){
            this.step = 'uploadComplete'
            return
        }
        const currentStepIndex = steps.indexOf(this.step)
        if(currentStepIndex===0) return
        else if(this.step==='notify') this.step = 'find'
        else this.step = steps[currentStepIndex-1]

        this.title = generateTitle()

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
                <Header
                    title = {store.title}
                    backButton = {backableSteps.includes(store.step)}
                    onBack = {store.goBack}
                    hide = {!headerSteps.includes(store.step)}
                    search = {store.step==='find'}
                />
                <FlipMove 
                    className = {[styles.flipmoveContainer, !headerSteps.includes(store.step)? styles.noHeader : ''].join(' ')}
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
                {store.step === 'pickTypes' &&
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
                {(store.step === 'uploading' || store.step === 'uploadComplete') && 
                    <UploadCompleteDialog
                        integrateWith = {store.currentIntegration}
                        type = {store.integrations[store.currentIntegrationTypeIndex]}
                        nextType = {
                            store.currentIntegrationTypeIndex < store.integrations.length - 1? store.integrations[store.currentIntegrationTypeIndex+1] 
                                : ''
                        }
                        onCancelUpload = {()=>{store.goBack('find')}}
                        complete = {store.step==='uploadComplete'}
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