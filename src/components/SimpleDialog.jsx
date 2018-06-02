
import React from 'react'
import FlipMove from 'react-flip-move'
import styles from './SimpleDialog.module.css'

import Button from './Button'
import {Icon} from './Icon'

export default class SimpleDialog extends React.Component{
    render(){
    return(
        <div className = {styles.dialog}>
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
                    <p className = {styles.context} >
                        {this.props.context}
                    </p>
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
    hasButton: true
}
