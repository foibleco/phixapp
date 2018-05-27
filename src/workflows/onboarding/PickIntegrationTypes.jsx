import React from 'react'
import {observer} from 'mobx-react'
import {observable, action} from 'mobx'
import FlipMove from 'react-flip-move'

import {List} from '../../components/List'
import {Icon} from '../../components/Icon'
import Button, {CircleButton} from '../../components/Button'

import styles from './PickIntegrationTypes.module.css'

import syncableAccountTypes from '../../mockdata/accountTypeList'
var zipcodes = require('zipcodes')



@observer
export default class PickIntegrationTypes extends React.Component{

    @observable selected = []
    @action toggleIntegration = (int) => {
        if(this.selected.includes(int)) this.selected.splice(this.selected.indexOf(int),1)
        else this.selected.push(int)
    }
    @observable zipCheck = false

    @action batchSync = (e, forceWithoutZIP) => {
        if(this.selected.includes('Care Provider') && !forceWithoutZIP){
            this.zipCheck = true
        }
        else{
            this.props.advance()
        }
    }

    render(){   
        //transform typelist blobs into visual format

        let types = syncableAccountTypes.map((type)=>{return type.title}).filter((title)=>{return this.selected.includes(title)})
        console.log(types)
        const list = this.zipCheck? syncableAccountTypes.filter((item)=>{
            return this.selected.includes(item.title)
        }) : syncableAccountTypes

        const computedList = list.map((item)=>{
            const selected = this.selected.includes(item.title)
            const index = types.indexOf(item.title)
            const selectedPrefix = index===0? 'First, we\'ll ' : index===1? "Next, we\'ll " : index===this.selected.length-1? 'Lastly, we\'ll ' : 'Then let\'s' 
            return(
                <div overridekey = {item.title+'list-item'}> 
                <Icon 
                    img = "x" 
                    size = "small" 
                    className = {[styles.x, this.zipCheck? styles.hidden : ''].join(' ')}
                    onClick = {(!this.zipCheck && selected? ()=>this.toggleIntegration(item.title) : ()=>{})}
                />
                <div className = {[styles.accountTypeItem, this.zipCheck? styles.passive : selected? styles.selected: ''].join(' ')}
                    onClick = {!this.zipCheck? ()=>this.toggleIntegration(item.title) : ()=>{}}
                >
                    <Icon img = {item.icon} size = "large" className = {styles.icon} />
                    <div className = {styles.text}>
                        <FlipMove
                            duration = {300}
                            disableAllAnimations = {true}
                            enterAnimation = {!selected? {
                                from: {transform: 'translateY(55px)', opacity: 0},
                                to: {transform: 'translateY(0px)', opacity: 2}
                            }: {
                                from: {transform: 'translateY(-55px)', opacity: 0},
                                to: {transform: 'translateY(0px)', opacity: 2}
                            }}
                            leaveAnimation = {!selected? {
                                from: {transform: 'translateY(0px)', opacity: 1},
                                to: {transform: 'translateY(-55px)', opacity: -1}
                            } : {
                                from: {transform: 'translateY(0px)', opacity: 1},
                                to: {transform: 'translateY(55px)', opacity: -1}
                            }}
                        >
                        {!selected &&
                            <div>
                                <div className = {styles.title}> {item.title} </div>
                                <div className = {styles.examples}> (i.e. {item.examples.join(', ')}) </div>
                            </div>
                        }
                        {selected && 
                            <div className = {styles.selectedText}>
                                {selectedPrefix} login to your 
                                <div className = {styles.title}> {item.title}. </div>
                            </div>
                        }
                        </FlipMove>
                    </div>
                </div>
                </div>
            )}
        )

        const syncButtonLabel = this.selected.length===1? 'Sync ' + this.selected[0] : 'Sync ' + this.selected.length + ' Accounts'

        return(
            <div className = {styles.pickIntegrationTypes}>
                <List
                    className = {styles.accountTypeList}
                    optionClass = {styles.itemWrapper}
                    options = {computedList}
                    animate
                />
                <div className = {styles.bottomButtonWrapper}>
                    <FlipMove 
                        className = {styles.btnFlipMove}
                        duration = {250}
                        enterAnimation = {!this.selected.length===0? {
                            from: {transform: 'translateY(65px)', opacity: 0},
                            to: {transform: 'translateY(0px)', opacity: 2}
                        }: {
                            from: {transform: 'translateY(65px)', opacity: 0},
                            to: {transform: 'translateY(0px)', opacity: 2}
                        }}
                        leaveAnimation = {!this.selected.length===0? {
                            from: {transform: 'translateY(0px)', opacity: 1},
                            to: {transform: 'translateY(-65px)', opacity: -1}
                        } : {
                            from: {transform: 'translateY(0px)', opacity: 1},
                            to: {transform: 'translateY(65px)', opacity: -1}
                        }}

                    >
                    {this.selected.length >= 1 &&
                        <div className = {styles.startBatchSyncButton}>
                            <Button 
                                className = {styles.btn} 
                                label = {syncButtonLabel} 
                                onClick = {this.batchSync} 
                            />
                        </div>
                    }
                    </FlipMove>
                </div>
                <FlipMove typeName = {null}
                    enterAnimation = {{
                            from: {transform: 'translateY(100%)'},
                            to: {transform: 'translateY(0px)'}
                        }}
                        leaveAnimation = {{
                            from: {transform: 'translateY(0px)'},
                            to: {transform: 'translateY(100%)'}
                        }}

                >
                    {this.zipCheck && //bottom popover?
                        <ZipCheck 
                            onComplete = {this.batchSync}
                            onDecline = {(e)=>this.batchSync(e,true)}
                            setZIP = {this.props.setZIP}
                        />
                    }
                </FlipMove>
            </div>
        )
    }

}

PickIntegrationTypes.defaultProps = {
    setZIP: (zip) => {console.log('parent of pickintegrationtypes needs a setZIP function', zip)}
}

@observer
class ZipCheck extends React.Component{

    @observable zipCode = ''
    @observable computedLocation = {city: '', state: ''}
    @action modifyZIP = (zip) => {
        if(zip.length===6) return
        this.zipCode = zip
        if(this.zipCode.length===5){
            if(zipcodes.lookup(this.zipCode)===undefined) return
            const locationInfo = zipcodes.lookup(this.zipCode)
            this.computedLocation = {city: locationInfo.city, state: locationInfo.state}
            this.props.setZIP(this.zipCode)
        }
        else{
            this.computedLocation.city = ''
            this.computedLocation.state = ''
        }
    }

    componentDidMount(){
        this.zipInput.focus()
        //TODO: add event listener for outside click canceling this
    }
    render(){
        const locationReady = this.computedLocation.city && this.computedLocation.state
        return(
            <div className = {styles.zipCheck}>
                <h2 className = {styles.prompt}> 
                    Can we get your ZIP code?
                </h2>
                <p className = {styles.context}>
                    It's up to you, but it'll help us find your <em>care provider </em>
                     and allow us to show you more useful information when you're using PHIX.
                </p>
                <input 
                    ref = {(input)=>this.zipInput = input}
                    className = {styles.zipInput} 
                    type = "number"  maxLength = "5"
                    placeholder = "Enter 5-digit ZIP..."
                    onChange = {(e)=>{this.modifyZIP(e.target.value)}}
                    value = {this.zipCode}
                />
                <CircleButton 
                    img = "check"
                    className = {[styles.confirmZIPButton, locationReady? styles.show : styles.hidden].join(' ')}
                    onClick = {this.props.onComplete}
                />
                <FlipMove
                    typeName = {null}
                    enterAnimation = {!locationReady? {
                        from: {transform: 'translateY(30px)', opacity: 0},
                        to: {transform: 'translateY(0px)', opacity: 2}
                    }: {
                        from: {transform: 'translateY(-30px)', opacity: 0},
                        to: {transform: 'translateY(0px)', opacity: 2}
                    }}
                    leaveAnimation = {!locationReady? {
                        from: {transform: 'translateY(0px)', opacity: 1},
                        to: {transform: 'translateY(-30px)', opacity: -1}
                    } : {
                        from: {transform: 'translateY(0px)', opacity: 1},
                        to: {transform: 'translateY(30px)', opacity: -1}
                    }}
                >


                    {locationReady? 
                        (
                            <div key = "loc" className = {styles.cityState}>
                                <Icon img = "locationpin" size = "small" className = {styles.icon}/>
                                {`${this.computedLocation.city}, ${this.computedLocation.state}`}
                            </div>
                        ) : ( 
                            <div 
                                key = "decline" 
                                className = {styles.decline}
                                onClick = {this.props.onDecline}
                            > 
                                No, I'll look manually. 
                            </div>
                        ) 
                    }


                </FlipMove>
                
            </div>
        )
    }
}