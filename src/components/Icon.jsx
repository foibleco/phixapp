import React from 'react'
import styles from './Icon.module.css'
import ReactSVG from 'react-svg'

export const iconlist = {
    phix: require('./assets/phix.svg'),
    'phix_white': require('./assets/phix_white.svg'),
    'phix_nodata': require('./assets/phix_nodata.svg'),
    'phix_dataonly': require('./assets/phix_dataonly.svg'),
    'logo_data_low': require('./assets/logo_data_low.svg'),
    'logo_data_mid': require('./assets/logo_data_mid.svg'),
    'logo_data_top': require('./assets/logo_data_top.svg'),

    stethoscope: require('./assets/stethoscope.svg'),
    healthinsurance: require('./assets/healthinsurance.svg'),
    rx: require('./assets/rx.svg'),
    genetics: require('./assets/genetics.svg'),
    hsapig: require('./assets/hsapig.svg'),
    wearable: require('./assets/wearable.svg'),

    person: require('./assets/person.svg'),
    x: require('./assets/x.svg'),
    locationpin: require('./assets/locationpin.svg'),
    check: require('./assets/check.svg'),
    chevleft: require('./assets/chevleft.svg'),
    search: require('./assets/searchzoom.svg'),
    lock: require('./assets/lock.svg'),
    dotburger: require('./assets/dotboiga.svg'),

    aetna: require('./assets/companies/aetna.svg'),
    alameda: require('./assets/companies/alameda.svg'),
    bluecross: require('./assets/companies/bluecross.svg'),
    blueshield: require('./assets/companies/blueshield.svg'),
    cigna: require('./assets/companies/cigna.svg'),
    unitedhealthcare: require('./assets/companies/unitedhealthcare.svg'),
    stanford: require('./assets/companies/stanford.svg'),
    kaiser: require('./assets/companies/kaiser.svg'),
    dignityhealth: require('./assets/companies/dignityhealth.svg'),
    onemedical: require('./assets/companies/onemedical.svg'),
    sutter: require('./assets/companies/sutter.svg'),
    ucsf: require('./assets/companies/ucsf.svg'),

    aetna_original: require('./assets/companies/aetna_original.svg'),
    alameda_original: require('./assets/companies/alameda_original.svg'),
    bluecross_original: require('./assets/companies/bluecross_original.svg'),
    blueshield_original: require('./assets/companies/blueshield_original.svg'),
    cigna_original: require('./assets/companies/cigna_original.svg'),
    unitedhealthcare_original: require('./assets/companies/unitedhealthcare_original.svg'),
    stanford_original: require('./assets/companies/stanford_original.svg'),
    kaiser_original: require('./assets/companies/kaiser_original.svg'),
    dignityhealth_original: require('./assets/companies/dignityhealth_original.svg'),
    onemedical_original: require('./assets/companies/onemedical_original.svg'),
    sutter_original: require('./assets/companies/sutter_original.svg'),
    ucsf_original: require('./assets/companies/ucsf_original.svg'),

    myChart: require('./assets/companies/mychart.png'),
}

export const Icon = (props) => {
    return(
        <div 
            className = {[styles.icon, styles[props.size], props.className].join(' ')} 
            // style = {{backgroundImage: 'url("/components/assets/stethoscope.svg")'}}
            style = {{backgroundImage: `url(${iconlist[props.img]})`}}
            onClick = {props.onClick}
        /> 
    )
}

export const Icon2 = (props) => {
    return(
        <ReactSVG
            className = {[styles.icon, styles[props.size], props.className].join(' ')}
            onClick = {props.onClick}
            path = {iconlist[props.img]}
            svgClassName = {styles.iconSvg}
            svgStyle = {{fill: 'green'}}
        />
    )
}