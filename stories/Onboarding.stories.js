import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withViewport, configureViewport } from '@storybook/addon-viewport'
import { withKnobs, select} from '@storybook/addon-knobs'

import '../src/App.css'
import PickIntegrationTypes from '../src/workflows/onboarding/PickIntegrationTypes'
import FindIntegration from '../src/workflows/onboarding/FindIntegration'

// addDecorator(withViewport('iphone6'))
addDecorator(withKnobs)
// console.log(configureViewport)


storiesOf('Onboarding', module).add('PickIntegrationTypes',()=>{
        return (
            <div style = {{height: '100vh', width: '100vw'}}>
                <PickIntegrationTypes/>
            </div>
        )
    })
    .add('FindIntegration', ()=>{
        return <FindIntegration />

    })
