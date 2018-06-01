import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
// import {find} from 'lodash'

import styles from './IntegrationUploadCompleteDialog.module.css'
import Button from '../../components/Button'
import {Icon} from '../../components/Icon'
import SimpleDialog from '../../components/SimpleDialog'

@observer
export default class IntegrationUploadCompleteDialog extends React.Component{
    render(){
        return(
            <SimpleDialog
                context = "Uploading your data to PHIX..."
            />
        )
    }
}
