import React from 'react';

import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import { storiesOf, addDecorator } from '@storybook/react';
import {withKnobs, select} from '@storybook/addon-knobs'
// import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import styles from './stories.module.css'

addDecorator(withKnobs)

class MobXTest extends React.Component{
    @observable testdata = 'poo'
    render(){
        console.log(this.testdata)
        return <div className = {styles.testModule}> {this.testdata} {this.props.knob} </div>
    }
}


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('mobxtest', module)
    .add('1', ()=>{
        const knob = select('test knob', ['yo', 'hi', 'helloworld', 'gbye'])
        return <MobXTest knob = {knob}/>
    })

