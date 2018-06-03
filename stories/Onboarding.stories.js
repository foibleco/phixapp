import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withViewport, configureViewport } from '@storybook/addon-viewport'
import { withKnobs, select, boolean } from '@storybook/addon-knobs'

import '../src/App.css'
import Onboarding from '../src/workflows/onboarding/Onboarding'
import PickIntegrationTypes from '../src/workflows/onboarding/PickIntegrationTypes'
import FindIntegration from '../src/workflows/onboarding/FindIntegration'
import OpenIntegrationDialog from '../src/workflows/onboarding/OpenIntegrationDialog'
import MockApp from '../src/workflows/onboarding/MockApp'

import UploadCompleteDialog, {IntegrationUploadAnimation} from '../src/workflows/onboarding/UploadCompleteDialog'


addDecorator(withViewport('iphone6'))
addDecorator(withKnobs)
// console.log(configureViewport)


storiesOf('Onboarding', module)
    .add('Onboarding master component', () =>{
        return(
            <Onboarding />
        )
    })
    .add('PickIntegrationTypes',()=>{
        return (
            <div style = {{height: '100vh', width: '100vw'}}>
                <PickIntegrationTypes/>
            </div>
        )
    })
    .add('FindIntegration', ()=>{
        return <FindIntegration 
            integration = "Care Provider"
        />

    })
    .add('OpenIntegrationDialog', ()=>{
        return <OpenIntegrationDialog 
            integrateWith = "Kaiser Permanente"
            type = "Care Provider"
         />
    })
    .add('MockApp', ()=>{
        const display = boolean('display', true)
        return <MockApp
            app = "myChart"
            display = {display}
        />
    })
    .add('UploadCompleteDialog', ()=>{
        return <UploadCompleteDialog 
            integrateWith = "UCSF Medical Center"
            type = "Care Provider"
        />
    })
    .add('IntegrationUploadAnimation', ()=>{
        const complete = boolean('complete', false)
        return <IntegrationUploadAnimation 
            complete = {complete}
            integrateWith = "UCSF Medical Center"
            type = "Care Provider"
        />
    })
