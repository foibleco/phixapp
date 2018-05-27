import { careProviders, insurers } from './careProviders.js'

const syncableAccountTypes = [
    {
        title: 'Care Provider',
        categories: [
            'Networks',
            'Hospitals',
            'Doctors',
        ],
        examples: [
            'Kaiser Permanente',
            'Dignity Health',
            'One Medical Group',
            'Sutter Health',
            'UCSF Medical Center',
        ],
        icon: 'stethoscope',
        list: careProviders,
    },
    {
        title: 'Health Insurance',
        examples: [
            'Kaiser Permanente',
            'Anthem BlueCross',
            'UnitedHealthcare',
            'Aetna',
        ],
        icon: 'healthinsurance',
        list: insurers,
    },
    {
        title: 'Pharmacy',
        examples: ['Walgreens', 'Rite Aid', 'CVS Pharmacy'],
        icon: 'rx',
    },
    {
        title: 'Genetics',
        examples: ['23AndMe', 'deCODE', 'UnitedHealthcare', 'Aetna'],
        icon: 'genetics',
    },
    {
        title: 'Health Savings Account',
        examples: ['HSA Bank', 'Health Equity'],
        icon: 'hsapig',
    },
    {
        title: 'Wearable Devices',
        examples: ['Fitbit', 'Apple Watch', 'Garmin', 'Aetna'],
        icon: 'wearable',
    },
]

export default syncableAccountTypes
