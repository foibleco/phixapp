import {sortBy} from 'lodash'

var doctors = require('./doctors.json')
doctors = sortBy(doctors, 'name')

const careProviders = [
    //networks have icon
    {name: 'Alameda Health System', type: 'network', logo: 'alameda', portal: 'Lawson Portal'},
    {name: 'Dignity Health', type: 'network', logo: 'dignityhealth', portal: 'My Care - Dignity Health'},
    {name: 'Kaiser Permanente', type: 'network', logo: 'kaiser' },
    {name: 'One Medical Group', type: 'network', logo: 'onemedical', portal: 'One Medical'},
    {name: 'Sutter Health', type: 'network', logo: 'sutter', portal: 'Sutter My Health Online'},
    {name: 'Stanford Health Care', type: 'network', logo: 'stanford', portal: 'Stanford MyHealth'},
    {name: 'UCSF Medical Center', type: 'network', logo: 'ucsf', portal: 'UCSF MyChart'},

    {name: 'Alameda Hospital', type: 'hospital', network: 'Alameda Health System', address: '3600 Broadway St', city: 'Oakland'},
    {name: 'Alta Bates Summit Medical Center | Summit Campus', type: 'hospital', network: 'Sutter Health', address: '350 Hawthorne Ave', city: 'Oakland'},
    {name: 'Alta Bates Summit Medical Center | Alta Bates Campus', type: 'hospital', network: 'Sutter Health', address: '2450 Ashby Ave', city: 'Berkeley'},
    {name: 'Chinese Hospital of San Francisco', type: 'hospital', network: 'Dignity Health', address: '845 Jackson St', city: 'San Francisco'},
    {name: 'Eastmont Wellness', type: 'hospital', network: 'Alameda Health System', address: '6955 Foothill Blvd', city: 'Oakland'},
    {name: 'Highland Hospital', type: 'hospital', network: 'Alameda Health System', address: '1411 E 31st St', city: 'Oakland'},
    {name: 'Kaiser Permanente Oakland Medical Center', type: 'hospital', network: 'Kaiser Permanente', address: '3600 Broadway', city: 'Oakland'},
    {name: 'Oakland Medical Center', type: 'hospital', network: 'Kaiser Permanente', address: '280 W MacArthur Blvd', city: 'Oakland'},
    {name: 'UCSF Benioff Children\'s Hospital Oakland', type: 'hospital', network: 'UCSF Medical Center', address: '747 52nd St', city: 'Oakland'},

    {name: 'Aaron Gordon, MD', type: 'doctor', network: 'Kaiser Permanente'},
    {name: 'Affiliates in Dermatology Medical Group, Inc.', type: 'doctor', address: '460 45th St', city: 'Oakland'},
    {name: 'Arthur Van Leuwendorff, PhD', type: 'doctor', specialty: 'Fertility, OB/GYN', network: 'Alameda Health System'},
    {name: 'Arthur Law, MD', type: 'doctor', specialty: 'Pediatrician', network: 'Stanford Health Care'},
    {name: 'Anderson Eng, D.O.', type: 'doctor', specialty: 'Internal Medicine', network: 'Chinese Hospital'},
    {name: 'Dr. Anousheh Ashouri', type: 'doctor', specialty: 'iono', network: 'Kaiser Permanente'},
].concat(doctors)

const insurers = [
    {name: 'Aetna', type: 'insurer', logo: 'aetna', portal: 'Aetna Navigator'},
    {name: 'Anthem BlueCross', type: 'insurer', logo: 'bluecross', portal: 'Anthem.com'},
    {name: 'Anthem BlueShield', type: 'insurer', logo: 'blueshield', portal: 'Anthem.com' },
    {name: 'Cigna', type: 'insurer', logo: 'cigna', portal: 'myCigna'},
    {name: 'Kaiser Permanente', type: 'insurer', logo: 'kaiser'},
    {name: 'UnitedHealthcare', type: 'insurer', logo: 'unitedhealthcare', portal: 'myuhc.com'},
]

const pharmacies = [
    {name: 'CVS Caremark', type: 'pharmacy', logo: 'cvs'},
    {name: 'CVS Pharmacy', type: 'pharmacy', logo: 'cvs'},
    {name: 'Humana', type: 'pharmacy', logo: 'humana'},
    {name: 'Prime', portal: 'MyPrime', type: 'pharmacy', logo: 'prime'},
    {name: 'Rite Aid', type: 'pharmacy', logo: 'riteaid'},
    {name: 'Walgreens', type: 'pharmacy', logo: 'walgreens'},
    {name: 'Walmart Pharmacy', type: 'pharmacy', logo: 'walmart'},
]

const genetics = [
    {name: '23 and Me'},
    {name: 'deCODE'},
    {name: 'Genosearch'},
    {name: 'Healthnucleus'},
    {name: 'MapMyGenome'},
]

const hsas = [
    {name: 'Further / SelectAccount'},
    {name: 'Health Equity'},
    {name: 'Health Savings Administrators'},
    {name: 'HSA Bank'},
    {name: 'Lively HSA'},
    {name: 'Optum Bank HSA'},
]

const wearables = [
    {name: 'Apple Watch'},
    {name: 'Android Wear'},
    {name: 'Fitbit'},
    {name: 'Garmin'},
    {name: 'Samsung Gear'},

]
export {careProviders, insurers, pharmacies, genetics, hsas, wearables}