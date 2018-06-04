import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import {find} from 'lodash'
import FlipMove from 'react-flip-move'

import styles from './UploadCompleteDialog.module.css'
import Button from '../../components/Button'
import {Icon} from '../../components/Icon'
import SimpleDialog from '../../components/SimpleDialog'


import mockEntryLists from '../../mockdata/mockEntryLists'

@observer
export default class UploadCompleteDialog extends React.Component{
    @observable uploading = true

    componentDidMount(){
        setTimeout(this.mockUploadComplete, 5000)
    }

    @action mockUploadComplete = () => {
        console.log('mock upload complete')
        this.uploading = false      
        this.props.onUploadComplete({
            //this is where real data would get passed up
        })
    }

    render(){
        return(
            <SimpleDialog
                selfCentering = {true}
                img = {<IntegrationUploadAnimation type = {this.props.type} integrateWith = {this.props.integrateWith} complete = {!this.uploading}/>}
                context = {
                    this.uploading? (
                        <span>Uploading your <span className = {styles.em}>{this.props.integrateWith}</span> data to your PHIX account...</span>
                    )
                    : fakeSyncedDataBlurb[this.props.type](this.props.integrateWith)
                }
                buttonLabel = {!this.props.nextType? 'Review and finalize my profile' :'Continue to '+ this.props.nextType}
                hasButton = {!this.uploading} //until...
                onButtonClick = {this.props.startNextIntegrationType}
                subButtonLabel = {this.uploading? 'Cancel' : 'Add another '+this.props.type}
                hasSubButton = {true}
                onSubButtonClick = {this.props.addAnotherIntegrationOfSameType}
            />
        )
    }
}

export const IntegrationUploadAnimation = (props) => {
    const app = find(mockEntryLists[props.type], (o)=> { return o.name === props.integrateWith})
    return(
            <FlipMove className = {styles.uploadAnimation} 
                enterAnimation = {{from: {opacity: 0}, to: {opacity: 1}}}
                leaveAnimation = {{from: {transform: 'translateX(0px)', opacity: 1}, to: {transform: 'translateX(20px)', opacity: 0}}}
            >
            {!props.complete && 
                <div className = {styles.appBadge}>
                    <Icon img = {app.logo+'_original'} />
                </div>
            }
            <FlipMove 
                key = "logoAnim"
                className = {styles.logoAnimation}
                enterAnimation = {{from: {opacity: 0}, to: {opacity: 1}}}
                leaveAnimation = {{from: {opacity: 1, transform: 'scaleX(1)'}, to: {opacity: 0, transform: 'scaleX(0.5)'}}}
            >
                {!props.complete &&
                <div style = {{zIndex: 1}}>
                    <div className = {styles.dataflow}>
                        <Icon img = "logo_data_top" className = {styles.dataTop} />
                        <Icon img = "logo_data_mid" className = {styles.dataMid} />
                        <Icon img = "logo_data_low" className = {styles.dataLow} />
                    </div>
                </div>
                }
                <div style = {{zIndex: 2}} key = "logo" >  
                    <Icon className = {styles.logo} img = "phix_nodata" size = "centerpiece"  /> 
                    <div className = {[styles.completionContextBubble, props.complete? styles.show : styles.hide].join(' ')}>
                        <Icon img = {app.logo} />
                        <div className = {styles.checkBadge}>
                            <Icon img = "check" size = "small" />
                        </div>
                    </div>
                </div>
                <div style = {{position: 'absolute'}}> 
                    <Icon className = {[styles.logodata, props.complete? styles.complete: ''].join(' ')} img = "phix_dataonly" size = "centerpiece"  />
                </div>
                
            </FlipMove>
            </FlipMove>
    )
}

const fakeSyncedDataBlurb = {
    //
    // 'Care Provider': ()=> {
    //     return `Your care provider data has been added and can be viewed in PHIX anytime. We found ${Math.round(Math.random()*7)} years of data, including ${Math.round(Math.random()*36)} visits with ${Math.round(Math.random()*12)} doctors.`
    // },
    'Care Provider': (name)=> {
        const fam = Math.floor(Math.random()*4)
        return (
            <React.Fragment>
                We added your <span className = {styles.em}>{name}</span> data to PHIX, including... 
                <ul className = {styles.contextBlurbList}>
                    <li className = {styles.item}><span className = {styles.em}>{Math.round(Math.random()*36)+1} care visits </span> from 2011&mdash;2018</li>
                    <li className = {styles.item}><span className = {styles.em}>{Math.round(Math.random()*12)+1} doctors</span> you've seen</li>
                    {fam > 0 && <li className = {styles.item}><span className = {styles.em}>{fam+1} family members' </span>patient info</li>}
                </ul>
            </React.Fragment>
        )
    },
    'Health Insurance': (name)=> {return `Success! We've added your ${name} account and plan to PHIX.`},
    'Pharmacy': (name)=> {return `Great -- we added your records from ${name} to your PHIX account.`},
    'Genetics': (name)=> {return `Nice! We linked your ${name} data with your PHIX account`},
    'Health Savings Account': (name)=> {return `We've connected your health savings account with PHIX.`},
    'Wearable Devices': (name)=> {return `Cool! Your ${name} is now connected with your PHIX account.`},
}