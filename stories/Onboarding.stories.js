import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withViewport, configureViewport } from '@storybook/addon-viewport'
import { withKnobs, select, boolean } from '@storybook/addon-knobs'

import '../src/App.css'
import Onboarding from '../src/workflows/onboarding/Onboarding'
import PickIntegrationTypes from '../src/workflows/onboarding/PickIntegrationTypes'
import FindIntegration from '../src/workflows/onboarding/FindIntegration'
import OpenIntegrationDialog from '../src/workflows/onboarding/OpenIntegrationDialog'
import MockIntegration from '../src/workflows/onboarding/MockIntegration'

import IntegrationUploadCompleteDialog, {IntegrationUploadAnimation} from '../src/workflows/onboarding/IntegrationUploadCompleteDialog'


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
    .add('MockIntegration', ()=>{
        const display = boolean('display', true)
        return <MockIntegration
            app = "myChart"
            display = {display}
        />
    })
    .add('IntegrationUploadCompleteDialog', ()=>{
        return <IntegrationUploadCompleteDialog />
    })
    .add('IntegrationUploadAnimation', ()=>{
        return <IntegrationUploadAnimation />
    })
