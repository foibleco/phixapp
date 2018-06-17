import React from 'react'
import styles from './Button.module.css'

import {Icon} from './Icon.jsx'

const Button = (props) => {
    return(
        <div 
            className = {[
                styles.button, 
                props.className,
                styles[props.state]
            ].join(' ')} 
            onClick = {props.onClick}
        >
            {props.label}
        </div>
    )
}

export const CircleButton = (props) => {
    return(
        <div 
            className = {[
                styles.circleButton,
                props.className
            ].join(' ')}
            onClick = {props.onClick}
        >
            <Icon img = {props.img} size = "medium" />
        </div>
    )
}

export const ButtonGroup = (props) => {
    return(
        <div className  = {[styles.buttonGroup, props.className].join(' ')} > 
            {props.options.map((option)=>{
                    return(
                        <div 
                            key = {`buttongroup-${props.className}-${option.name}`}
                            className = {[
                                styles.option, 
                                props.optionClass, 
                                option.class,
                                props.toggle && option.active? styles.active : props.toggle? styles.inactive : '' 
                            ].join(' ')}
                            onClick = {option.onClick}
                        >   
                            {option.name}
                        </div>
                    )
                })
            }
        </div>
    )
}


export default Button
