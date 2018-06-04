
import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import {findDOMNode} from 'react-dom'
import FlipMove from 'react-flip-move'
import styles from './SimpleDialog.module.css'

import Button from './Button'
import {Icon} from './Icon'

@observer
export default class SimpleDialog extends React.Component{

    @observable height = null

    componentDidMount(){
        if(this.props.selfCentering){
            this.setHeight(findDOMNode(this.container).getBoundingClientRect().height)
        }
    }

    componentDidUpdate(){
        if(this.props.selfCentering){
            this.setHeight(findDOMNode(this.container).getBoundingClientRect().height)
        }
    }

    @action setHeight = (ht) => this.height = ht

    render(){
    return(
        <div 
            ref = {this.props.selfCentering? (container) => this.container = container : ''}
            className = {[styles.dialog, !this.props.selfCentering? styles.centered : styles.selfCentering].join(' ')}
            style = {{
                transform: this.props.selfCentering? `translateY(${(window.innerHeight / 2) - (this.height / 2)}px)` : ''
            }}

        >
            <FlipMove
                className = {styles.flipMoveContainer}
                enterAnimation = {{from: {opacity: 0}, to: {opacity: 1}}}
                leaveAnimation = {{from: {opacity: 1}, to: {opacity: 0}}}
            >
                {this.props.img &&
                    <div className = {styles.image} >
                        {typeof this.props.img === 'string' &&  <Icon img = {this.props.img} size = "large" />}
                        {typeof this.props.img === 'object' && <React.Fragment> {this.props.img} </React.Fragment>}
                    </div>
                }
                {this.props.context &&
                    <div className = {styles.context} >
                        {this.props.context}
                    </div>
                }
                {this.props.hasButton &&
                    <div>
                    <Button 
                        className = {styles.button}
                        label = {this.props.buttonLabel || ''}
                        onClick = {this.props.onButtonClick}
                    /> 
                    </div>
                }
                {this.props.hasSubButton &&
                    <div className = {styles.subButtonContainer}>
                        <Button
                            key = {this.props.subButtonLabel} 
                            className = {styles.subButton}
                            label = {this.props.subButtonLabel}
                            onClick = {this.props.onSubButtonClick}
                        />
                    </div>
                }
            </FlipMove>
        </div>
    )
    }
}

SimpleDialog.defaultProps = {
    hasButton: true,
    selfCentering: false
}
