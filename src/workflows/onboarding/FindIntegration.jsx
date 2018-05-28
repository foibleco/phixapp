import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import FlipMove from 'react-flip-move'

import Button, {ButtonGroup} from '../../components/Button'
import MockOutsideApp from '../../components/MockOutsideApp'

import styles from './FindIntegration.module.css'


// import syncableAccountTypes from './workflows/onboarding'
import {List} from '../../components/List'
import {Icon} from '../../components/Icon'
import { careProviders, insurers } from '../../mockdata/careProviders.js'

const mockEntryLists = {
    'Care Provider': careProviders,
    'Health Insurance': insurers
}

@observer
export default class FindIntegration extends React.Component{
      @observable selected = null //the name of item user selects from list
       @action unselect = () => this.selected = null //for back operations?
    @observable filteringBy = 'network' //only applicable to care provider i think
    //list animation stuff
    @observable readyToAnimate = true
    @observable animateDirection = 1

    @action select = (item) =>{ 
        this.selected = item
        this.props.onSelect()
    }
    @action filterListByType = (type) => {
        if(!this.readyToAnimate){
            console.log('not ready to animate, canceling filter')
            return
        }
        //get indices to determine animation direction
        const filters = ['network', 'hospital', 'doctor']
        if(filters.indexOf(type) > filters.indexOf(this.filteringBy)) this.animateDirection = 1
        if(filters.indexOf(type) < filters.indexOf(this.filteringBy)) this.animateDirection = -1

        console.log('filtering by ', type)
        this.filteringBy = type
    }
    @action setAnimateReady = (ready) => this.readyToAnimate = ready

    componentDidUpdate(prevProps){
        if(prevProps.mode==='login' && this.props.mode==='find') this.unselect()
    }

    render(){

        const {filteringBy} = this

        console.log(mockEntryLists[this.props.integration])

        const computedEntryList =  mockEntryLists[this.props.integration]
            .filter((entry)=>{
                //flawed but care providers is the only filterable option for now
                // if(this.searching) return entry.name.includes(searchstring)
                if(this.selected) return entry.name === this.selected
                if(this.props.integration==='Care Provider') return entry.type===this.filteringBy
                else return entry
            })
            .map((entry)=>{
            //filter?
            return(
                <div 
                    overridekey = {entry.name}
                    className = {[
                        styles.entry, 
                        styles[entry.type],
                        entry.name===this.selected? styles.selected : ''
                    ].join(' ')}
                    onClick = {()=>{this.select(entry.name)}}
                >
                    {(entry.type === 'network' || entry.type === 'insurer') &&
                        <React.Fragment> 
                            <Icon img = {entry.logo} size = "large" className = {styles.icon} />
                            {entry.name}
                        </React.Fragment>
                    }
                    {entry.type === 'hospital' &&
                        <React.Fragment>
                            <div className = {styles.title}> {entry.name} </div>
                            <div className = {styles.subtitle}> {entry.address} </div>
                            {entry.network && 
                                <div className = {styles.subtitle}> {entry.network} </div>
                            }
                        </React.Fragment>
                    }
                    {entry.type === 'doctor' &&
                        <React.Fragment>
                            <div className = {styles.title}> {entry.name} </div>
                            {entry.specialty && 
                                <div className = {styles.subtitle}> {entry.specialty} </div>
                            }
                            {entry.network &&
                                <div className = {styles.subtitle}> {entry.network} </div>
                            }
                            {!entry.network && entry.address &&
                                <div className = {styles.subtitle}> {entry.address} </div>
                            }
                        </React.Fragment>
                    }

                {entry.name===this.selected && 
                    <div className = {styles.loginMask} />
                }
               </div> 
            )
        })

        return (
            <div className = {styles.findIntegration}>

                    <div className = {[styles.filters, this.selected || this.props.integration!=='Care Provider'? styles.hidden : ''].join(' ')}>
                        <ButtonGroup
                            toggle
                            options = {[
                                {name: 'Networks', onClick: ()=>{this.filterListByType('network')}, active: filteringBy === 'network'},
                                {name: 'Hospitals', onClick: ()=>{this.filterListByType('hospital')}, active: filteringBy === 'hospital'},
                                {name: 'Doctors', onClick: ()=>{this.filterListByType('doctor')}, active: filteringBy === 'doctor'},
                            ]}
                            optionClass = {styles.filterOption}
                        />
                    </div>
                   <List
                        className = {[styles.list, this.selected || this.props.integration!=='Care Provider'? styles.shiftedUp : ''].join(' ')}
                        animate
                        animateDuration = {350}
                        animateStagger = {15}
                        // animateDirection = {-1}
                        optionClass = {styles.options}
                        enterAnimation = {{
                            from: { transform: `translateX(${this.animateDirection*100}px)`, opacity: 0 },
                            to: {transform: 'translateX(0)', opacity: 1}
                        }}
                        leaveAnimation = {{
                            to: { transform: `translateX(${this.animateDirection*-100}px)`, opacity: 0 },
                            from: {transform: 'translateX(0)', opacity: 1}
                        }}
                        onAnimateStart = {()=>this.setAnimateReady(false)} //cb prevents fast switch jank
                        onAnimateEnd = {()=>this.setAnimateReady(true)} //cb prevents fast switch jank
                        // animate = {false}
                        options = {computedEntryList}
                    />
                    <FlipMove
                        enterAnimation = {{
                            from: {opacity: 0},
                            to: {opacity: 1}
                        }}
                        leaveAnimation = {{
                            from: {opacity: 1}, to: {opacity: 0}
                        }}
                        delay = {this.props.mode === 'login'? 400 : 0}
                        disableAllAnimations = {this.props.mode === 'find'? true: false}
                        className = {styles.loginContainer}
                    >
                    {this.selected &&
                        <div className = {styles.integrationLogin}>
                            <div className = {styles.loginInputWrapper}>
                                <Icon img = "person" size = "small" className = {styles.userNameIcon} />
                                <input placeholder = "Username" className = {[styles.input,styles.userName].join(' ')} />
                            </div>
                            <div className = {styles.loginInputWrapper}>
                                <Icon img = "lock" size = "small" className = {styles.passwordIcon} />
                                <input placeholder = "Password" className = {[styles.input,styles.password].join(' ')} />
                            </div>
                            <Button
                                className = {styles.signInButton}
                                label = "Securely sign in"
                                onClick = {this.toggleFakeApp}
                            />
                            <div className = {styles.forgotPass}> Forgot your password? </div>
                        </div>
                    }
                    </FlipMove>
                    {/* 
                        <MockOutsideApp
                            app = "myChart"
                            display = {this.appOverlay}
                            // close = {this.toggleFakeApp}
                            onConfirm = {()=>{
                                this.toggleFakeApp()
                            }}
                        />
                    */}

            </div>  
        )
    }
}
