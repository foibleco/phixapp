import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withViewport, configureViewport } from '@storybook/addon-viewport'
import { withKnobs, select} from '@storybook/addon-knobs'

import '../src/App.css'
import styles from './Components.module.css'

import Button, {CircleButton, ButtonGroup} from '../src/components/Button'
import Header from '../src/components/Header'
import {Icon, iconlist} from '../src/components/Icon'
import {List} from '../src/components/Icon'
import MockOutsideApp from '../src/components/MockOutsideApp'

addDecorator(withViewport('iphone6'))
addDecorator(withKnobs)

storiesOf('Components', module).add('Header', ()=>{
    return <Header />
})
    .add('Button', ()=>{
        return <Button label = "Button" />
    })
    .add('Icon', ()=>{
        // console.log(iconlist)
        console.log(Object.keys(iconlist))
        return (
            <div className = {styles.iconGrid}>
                {Object.keys(iconlist).map((icon)=>{
                    return(
                        <Icon img = {icon} />
                    )
                })}
            </div>
        )
    })
    .add('List', ()=>{
        return <List />
    })
    .add('MockOutsideApp', ()=>{
        return <MockOutsideApp />
    })