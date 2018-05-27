import React from 'react';

import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

class MobXTest extends React.Component{
    @observable testdata = 'poo'
    render(){
        console.log(this.testdata)
        return <div> {this.testdata} </div>
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
        return <MobXTest />
    })

