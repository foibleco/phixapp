import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withViewport, configureViewport } from '@storybook/addon-viewport'
import { withKnobs, select} from '@storybook/addon-knobs'

import '../src/App.css'

import Button, {CircleButton, ButtonGroup} from '../src/components/Button'
import Header from '../src/components/Header'
import {Icon} from '../src/components/Icon'
import {List} from '../src/components/Icon'
import MockOutsideApp from '../src/components/MockOutsideApp'

addDecorator(withViewport('iphone6'))
addDecorator(withKnobs)

storiesOf('Components', module).add('Header', ()=>{
    return <div />
})