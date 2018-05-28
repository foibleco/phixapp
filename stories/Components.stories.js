import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withViewport, configureViewport } from '@storybook/addon-viewport'
import { withKnobs, select, boolean} from '@storybook/addon-knobs'

import '../src/App.css'
import styles from './Components.module.css'

import Button, {CircleButton, ButtonGroup} from '../src/components/Button'
import Header from '../src/components/Header'
import {Icon, Icon2, iconlist} from '../src/components/Icon'
import {List} from '../src/components/List'
import MockOutsideApp from '../src/components/MockOutsideApp'

addDecorator(withViewport('iphone6'))
addDecorator(withKnobs)

storiesOf('Components', module).add('Header', ()=>{
    const titles = select('test titles', ['Who\'s your care provider?', 'Select accounts to sync', 'hello world'], 'hello world')
    const backbutton = boolean('backbutton', false)
    const search = boolean('search', false)
    const dotboiga = boolean('dotboiga', false)
    return <Header title = {titles} backButton = {backbutton} dotburger = {dotboiga} search = {search}/>
})
    .add('Button', ()=>{
        return (
            <React.Fragment>
                <Button label = "Button" />
                <CircleButton img = "locationpin" />
                <ButtonGroup options = {[
                    {name: 'hello'},
                    {name: 'world'},
                    {name: 'option 3'}
                ]}/>
            </React.Fragment>
        )
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
    .add('Icon2', ()=>{
        // console.log(iconlist)
        console.log(Object.keys(iconlist))
        return (
            <div className = {styles.iconGrid}>
                {Object.keys(iconlist).map((icon)=>{
                    return(
                        <Icon2 img = {icon} size = "large"/>
                    )
                })}
            </div>
        )
    })
    .add('List', ()=>{
        const fifthItem = boolean('fifth item for testing', false)
        return <List 
            options = {[
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
                fifthItem? 'Item 5' : ''
            ]}
        />
    })
    .add('MockOutsideApp', ()=>{
        const display = boolean('display', false)
        const app = select('fake app: ', [
            'myChart'
        ], 'myChart')
        return <MockOutsideApp app = {app} display = {display} />
    })