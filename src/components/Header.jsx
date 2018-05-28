import React from 'react'
import styles from './Header.module.css'
import {Icon} from './Icon' 

import FlipMove from 'react-flip-move'


export default class Header extends React.Component{
  
    componentWillReceiveNewProps(newProps){

    }

  render(){
      const {backButton, title, step, onBackButtonClick} = this.props
      return(
        <div className = {styles.header}>


          <div className = {[styles.gradientOverflowBound, backButton? styles.wide : ''].join(' ')} />
            <Icon 
              img = "chevleft" 
              size = "small" 
              className = {[styles.backButton, backButton? styles.visible : ''].join(' ')}
            />
            
            <FlipMove
              className = {[styles.titleWrapper, backButton? styles.leftOffset:''].join(' ')}
              enterAnimation = {{
                from: {opacity: 0, transform: 'translateX(25%)'},
                to: {opacity: 1, transform: 'translateX(0)'},
              }}
              leaveAnimation = {{
                from: {opacity: 1, transform: 'translateX(0)'},
                to: {opacity: 0, transform: 'translateX(-25%)'},
              }}
            >
              <div 
                key = {title} 
                className = {styles.title}
              > 
                  {title} 
              </div>
            </FlipMove>

           <FlipMove
              className = {styles.right}
              enterAnimation = {{
                from: {opacity: 0, transform: 'translateX(25%)'},
                to: {opacity: 1, transform: 'translateX(0)'},
              }}
              leaveAnimation = {{
                from: {opacity: 1, transform: 'translateX(0)'},
                to: {opacity: 0, transform: 'translateX(-25%)'},
              }}
            >
              {this.props.search && <Icon key = "search" img = "search" size = 'small' />}
              {this.props.dotburger && <Icon key = "dotboiga" img = "dotburger" size = 'small' className = {styles.dotboiga}/>}
              </FlipMove>
        </div>
      )
    }
}