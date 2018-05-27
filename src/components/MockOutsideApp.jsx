import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import FlipMove from 'react-flip-move'

import {Icon} from './Icon'
import Button from './Button'

import styles from './MockOutsideApp.module.css'

@observer
export default class MockOutsideApp extends React.Component{
    @observable present = false 
    @observable mode = 'splash'
    @action appear = () => {console.log('appear'); this.present=true}
    @action hide = () => {console.log('hide'); this.present=false}
    @action unsetSplash = () => {console.log('unsetting splash!'); this.mode = 'content'}


    componentDidUpdate = (prevProps) => {
        if(this.props.display){
            if(this.props.splashToContent) setTimeout(this.unsetSplash, 1800)
        }
    }

    render(){
        return(
            <div 
                style = {{display: this.present? 'block' : 'none'}}
                className = {styles.outsideApp}
            >
            <FlipMove
                enterAnimation = {{
                    from: {transform: 'translateY(100%)'},
                    to: {transform: 'translateY(0)'}
                }}
                leaveAnimation = {{
                    from: {transform:' translateY(0%)'},
                    to: {transform: 'translateY(100%)'}
                }}
                className = {[styles.flipmoveContainer, this.props.className].join(' ')}
                onStartAll = {this.appear}
                onFinishAll = {!this.props.display? this.hide : ''}
            >
                {this.props.display && 
                    <div className = {styles[this.props.app]}>
                        {this.mode==='splash' &&
                            <div className = {styles.placeholderIcon}>
                                <Icon img = "myChart" size = "centerpiece" />
                            </div>
                        }
                        {this.mode==='content' &&
                            <React.Fragment>
                                <div className = {styles.header}>
                                    Third-party Permission
                                </div>
                                <div className = {styles.body}>
                                    <div className = {styles.modal}>
                                        <p className = {styles.context}>
                                            PHIX will receive the following: your patient records and history, doctors, conditions, dependents, appointments, and bills.
                                        </p>
                                        <div className = {styles.actions}>
                                            <Button className = {[styles.button, styles.cancel].join(' ')} label = "Cancel" />
                                            <Button className = {[styles.button, styles.ok].join(' ')} label = "OK" onClick = {this.props.onConfirm} />
                                        </div>
                                </div>
                                </div>
                            </React.Fragment>

                        }
                    </div>
                }
            </FlipMove>
            </div>
        )
    }
    
}

MockOutsideApp.defaultProps = {
    app: 'myChart',
    splashToContent: true //sets a timeout for splash to go away to reveal content underneath?
}