
import React from 'react'
import styles from './List.module.css'

import FlipMove from 'react-flip-move'

export const List = (props) => {
    return(
        <ul className = {[styles.list, props.className].join(' ')}>
            <FlipMove
                duration = {props.animateDuration || 300}
                // staggerDelayBy = {25}
                staggerDurationBy = {props.animateStagger || 40}
                disableAllAnimations = {!props.animate}
                enterAnimation = {props.enterAnimation || {
                    from: {transform: `translateX(100px)`, opacity: 0},
                    to: {transform: 'translateX(0px)', opacity: 1}
                }}
                leaveAnimation = {props.leaveAnimation || {
                    from: {transform: 'translateX(0px)', opacity: 1},
                    to: {transform: `translateX(-100px)`, opacity: 0}
                }}
                onStartAll = {props.onAnimateStart || ''}
                onFinishAll = {props.onAnimateEnd || ''}
            >
                {props.options.map((option,i)=>(
                    <li 
                        className = {[styles.option, props.optionClass].join(' ')}
                        key = {option.props? option.props.overridekey || 'listoption'+i :  'listoption'+i}
                    > 
                        {option} 
                    </li>
                ))}
            </FlipMove>
        </ul>
    )
}