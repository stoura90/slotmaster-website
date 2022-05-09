import React, {useEffect, useState} from 'react';
import './style.scss';
import {Actions, useTranslation} from "../../../core";
import _ from "lodash";
import {Verification} from "../../index";
import {Country} from "@microblink/blinkid-in-browser-sdk";
import UploadDoc from "../uploadDoc/uploadDoc";
import {useOTP} from "../../../core/hooks/useOTP";
import Select from "../../forms/select/Select"
import SelectBox from "../../forms/select/NewSelect";
import {useHistory, useParams} from "react-router-dom";
import moment from "moment";

const countries = [
    {title: 'Afghanistan', id: 'AF'},
    {title: 'Åland Islands', id: 'AX'},
    {title: 'Albania', id: 'AL'},
    {title: 'Algeria', id: 'DZ'},
    {title: 'American Samoa', id: 'AS'},
    {title: 'AndorrA', id: 'AD'},
    {title: 'Angola', id: 'AO'},
    {title: 'Anguilla', id: 'AI'},
    {title: 'Antarctica', id: 'AQ'},
    {title: 'Antigua and Barbuda', id: 'AG'},
    {title: 'Argentina', id: 'AR'},
    {title: 'Armenia', id: 'AM'},
    {title: 'Aruba', id: 'AW'},
    {title: 'Australia', id: 'AU'},
    {title: 'Austria', id: 'AT'},
    {title: 'Azerbaijan', id: 'AZ'},
    {title: 'Bahamas', id: 'BS'},
    {title: 'Bahrain', id: 'BH'},
    {title: 'Bangladesh', id: 'BD'},
    {title: 'Barbados', id: 'BB'},
    {title: 'Belarus', id: 'BY'},
    {title: 'Belgium', id: 'BE'},
    {title: 'Belize', id: 'BZ'},
    {title: 'Benin', id: 'BJ'},
    {title: 'Bermuda', id: 'BM'},
    {title: 'Bhutan', id: 'BT'},
    {title: 'Bolivia', id: 'BO'},
    {title: 'Bosnia and Herzegovina', id: 'BA'},
    {title: 'Botswana', id: 'BW'},
    {title: 'Bouvet Island', id: 'BV'},
    {title: 'Brazil', id: 'BR'},
    {title: 'British Indian Ocean Territory', id: 'IO'},
    {title: 'Brunei Darussalam', id: 'BN'},
    {title: 'Bulgaria', id: 'BG'},
    {title: 'Burkina Faso', id: 'BF'},
    {title: 'Burundi', id: 'BI'},
    {title: 'Cambodia', id: 'KH'},
    {title: 'Cameroon', id: 'CM'},
    {title: 'Canada', id: 'CA'},
    {title: 'Cape Verde', id: 'CV'},
    {title: 'Cayman Islands', id: 'KY'},
    {title: 'Central African Republic', id: 'CF'},
    {title: 'Chad', id: 'TD'},
    {title: 'Chile', id: 'CL'},
    {title: 'China', id: 'CN'},
    {title: 'Christmas Island', id: 'CX'},
    {title: 'Cocos (Keeling) Islands', id: 'CC'},
    {title: 'Colombia', id: 'CO'},
    {title: 'Comoros', id: 'KM'},
    {title: 'Congo', id: 'CG'},
    {title: 'Congo, The Democratic Republic of the', id: 'CD'},
    {title: 'Cook Islands', id: 'CK'},
    {title: 'Costa Rica', id: 'CR'},
    {title: 'Cote D\'Ivoire', id: 'CI'},
    {title: 'Croatia', id: 'HR'},
    {title: 'Cuba', id: 'CU'},
    {title: 'Cyprus', id: 'CY'},
    {title: 'Czech Republic', id: 'CZ'},
    {title: 'Denmark', id: 'DK'},
    {title: 'Djibouti', id: 'DJ'},
    {title: 'Dominica', id: 'DM'},
    {title: 'Dominican Republic', id: 'DO'},
    {title: 'Ecuador', id: 'EC'},
    {title: 'Egypt', id: 'EG'},
    {title: 'El Salvador', id: 'SV'},
    {title: 'Equatorial Guinea', id: 'GQ'},
    {title: 'Eritrea', id: 'ER'},
    {title: 'Estonia', id: 'EE'},
    {title: 'Ethiopia', id: 'ET'},
    {title: 'Falkland Islands (Malvinas)', id: 'FK'},
    {title: 'Faroe Islands', id: 'FO'},
    {title: 'Fiji', id: 'FJ'},
    {title: 'Finland', id: 'FI'},
    {title: 'France', id: 'FR'},
    {title: 'French Guiana', id: 'GF'},
    {title: 'French Polynesia', id: 'PF'},
    {title: 'French Southern Territories', id: 'TF'},
    {title: 'Gabon', id: 'GA'},
    {title: 'Gambia', id: 'GM'},
    {title: 'Georgia', id: 'GE'},
    {title: 'Germany', id: 'DE'},
    {title: 'Ghana', id: 'GH'},
    {title: 'Gibraltar', id: 'GI'},
    {title: 'Greece', id: 'GR'},
    {title: 'Greenland', id: 'GL'},
    {title: 'Grenada', id: 'GD'},
    {title: 'Guadeloupe', id: 'GP'},
    {title: 'Guam', id: 'GU'},
    {title: 'Guatemala', id: 'GT'},
    {title: 'Guernsey', id: 'GG'},
    {title: 'Guinea', id: 'GN'},
    {title: 'Guinea-Bissau', id: 'GW'},
    {title: 'Guyana', id: 'GY'},
    {title: 'Haiti', id: 'HT'},
    {title: 'Heard Island and Mcdonald Islands', id: 'HM'},
    {title: 'Holy See (Vatican City State)', id: 'VA'},
    {title: 'Honduras', id: 'HN'},
    {title: 'Hong Kong', id: 'HK'},
    {title: 'Hungary', id: 'HU'},
    {title: 'Iceland', id: 'IS'},
    {title: 'India', id: 'IN'},
    {title: 'Indonesia', id: 'ID'},
    {title: 'Iran, Islamic Republic Of', id: 'IR'},
    {title: 'Iraq', id: 'IQ'},
    {title: 'Ireland', id: 'IE'},
    {title: 'Isle of Man', id: 'IM'},
    {title: 'Israel', id: 'IL'},
    {title: 'Italy', id: 'IT'},
    {title: 'Jamaica', id: 'JM'},
    {title: 'Japan', id: 'JP'},
    {title: 'Jersey', id: 'JE'},
    {title: 'Jordan', id: 'JO'},
    {title: 'Kazakhstan', id: 'KZ'},
    {title: 'Kenya', id: 'KE'},
    {title: 'Kiribati', id: 'KI'},
    {title: 'Korea, Democratic People\'S Republic of', id: 'KP'},
    {title: 'Korea, Republic of', id: 'KR'},
    {title: 'Kuwait', id: 'KW'},
    {title: 'Kyrgyzstan', id: 'KG'},
    {title: 'Lao People\'S Democratic Republic', id: 'LA'},
    {title: 'Latvia', id: 'LV'},
    {title: 'Lebanon', id: 'LB'},
    {title: 'Lesotho', id: 'LS'},
    {title: 'Liberia', id: 'LR'},
    {title: 'Libyan Arab Jamahiriya', id: 'LY'},
    {title: 'Liechtenstein', id: 'LI'},
    {title: 'Lithuania', id: 'LT'},
    {title: 'Luxembourg', id: 'LU'},
    {title: 'Macao', id: 'MO'},
    {title: 'Macedonia, The Former Yugoslav Republic of', id: 'MK'},
    {title: 'Madagascar', id: 'MG'},
    {title: 'Malawi', id: 'MW'},
    {title: 'Malaysia', id: 'MY'},
    {title: 'Maldives', id: 'MV'},
    {title: 'Mali', id: 'ML'},
    {title: 'Malta', id: 'MT'},
    {title: 'Marshall Islands', id: 'MH'},
    {title: 'Martinique', id: 'MQ'},
    {title: 'Mauritania', id: 'MR'},
    {title: 'Mauritius', id: 'MU'},
    {title: 'Mayotte', id: 'YT'},
    {title: 'Mexico', id: 'MX'},
    {title: 'Micronesia, Federated States of', id: 'FM'},
    {title: 'Moldova, Republic of', id: 'MD'},
    {title: 'Monaco', id: 'MC'},
    {title: 'Mongolia', id: 'MN'},
    {title: 'Montserrat', id: 'MS'},
    {title: 'Morocco', id: 'MA'},
    {title: 'Mozambique', id: 'MZ'},
    {title: 'Myanmar', id: 'MM'},
    {title: 'Namibia', id: 'NA'},
    {title: 'Nauru', id: 'NR'},
    {title: 'Nepal', id: 'NP'},
    {title: 'Netherlands', id: 'NL'},
    {title: 'Netherlands Antilles', id: 'AN'},
    {title: 'New Caledonia', id: 'NC'},
    {title: 'New Zealand', id: 'NZ'},
    {title: 'Nicaragua', id: 'NI'},
    {title: 'Niger', id: 'NE'},
    {title: 'Nigeria', id: 'NG'},
    {title: 'Niue', id: 'NU'},
    {title: 'Norfolk Island', id: 'NF'},
    {title: 'Northern Mariana Islands', id: 'MP'},
    {title: 'Norway', id: 'NO'},
    {title: 'Oman', id: 'OM'},
    {title: 'Pakistan', id: 'PK'},
    {title: 'Palau', id: 'PW'},
    {title: 'Palestinian Territory, Occupied', id: 'PS'},
    {title: 'Panama', id: 'PA'},
    {title: 'Papua New Guinea', id: 'PG'},
    {title: 'Paraguay', id: 'PY'},
    {title: 'Peru', id: 'PE'},
    {title: 'Philippines', id: 'PH'},
    {title: 'Pitcairn', id: 'PN'},
    {title: 'Poland', id: 'PL'},
    {title: 'Portugal', id: 'PT'},
    {title: 'Puerto Rico', id: 'PR'},
    {title: 'Qatar', id: 'QA'},
    {title: 'Reunion', id: 'RE'},
    {title: 'Romania', id: 'RO'},
    {title: 'Russian Federation', id: 'RU'},
    {title: 'RWANDA', id: 'RW'},
    {title: 'Saint Helena', id: 'SH'},
    {title: 'Saint Kitts and Nevis', id: 'KN'},
    {title: 'Saint Lucia', id: 'LC'},
    {title: 'Saint Pierre and Miquelon', id: 'PM'},
    {title: 'Saint Vincent and the Grenadines', id: 'VC'},
    {title: 'Samoa', id: 'WS'},
    {title: 'San Marino', id: 'SM'},
    {title: 'Sao Tome and Principe', id: 'ST'},
    {title: 'Saudi Arabia', id: 'SA'},
    {title: 'Senegal', id: 'SN'},
    {title: 'Serbia and Montenegro', id: 'CS'},
    {title: 'Seychelles', id: 'SC'},
    {title: 'Sierra Leone', id: 'SL'},
    {title: 'Singapore', id: 'SG'},
    {title: 'Slovakia', id: 'SK'},
    {title: 'Slovenia', id: 'SI'},
    {title: 'Solomon Islands', id: 'SB'},
    {title: 'Somalia', id: 'SO'},
    {title: 'South Africa', id: 'ZA'},
    {title: 'South Georgia and the South Sandwich Islands', id: 'GS'},
    {title: 'Spain', id: 'ES'},
    {title: 'Sri Lanka', id: 'LK'},
    {title: 'Sudan', id: 'SD'},
    {title: 'Surititle', id: 'SR'},
    {title: 'Svalbard and Jan Mayen', id: 'SJ'},
    {title: 'Swaziland', id: 'SZ'},
    {title: 'Sweden', id: 'SE'},
    {title: 'Switzerland', id: 'CH'},
    {title: 'Syrian Arab Republic', id: 'SY'},
    {title: 'Taiwan, Province of China', id: 'TW'},
    {title: 'Tajikistan', id: 'TJ'},
    {title: 'Tanzania, United Republic of', id: 'TZ'},
    {title: 'Thailand', id: 'TH'},
    {title: 'Timor-Leste', id: 'TL'},
    {title: 'Togo', id: 'TG'},
    {title: 'Tokelau', id: 'TK'},
    {title: 'Tonga', id: 'TO'},
    {title: 'Trinidad and Tobago', id: 'TT'},
    {title: 'Tunisia', id: 'TN'},
    {title: 'Turkey', id: 'TR'},
    {title: 'Turkmenistan', id: 'TM'},
    {title: 'Turks and Caicos Islands', id: 'TC'},
    {title: 'Tuvalu', id: 'TV'},
    {title: 'Uganda', id: 'UG'},
    {title: 'Ukraine', id: 'UA'},
    {title: 'United Arab Emirates', id: 'AE'},
    {title: 'United Kingdom', id: 'GB'},
    {title: 'United States', id: 'US'},
    {title: 'United States Minor Outlying Islands', id: 'UM'},
    {title: 'Uruguay', id: 'UY'},
    {title: 'Uzbekistan', id: 'UZ'},
    {title: 'Vanuatu', id: 'VU'},
    {title: 'Venezuela', id: 'VE'},
    {title: 'Viet Nam', id: 'VN'},
    {title: 'Virgin Islands, British', id: 'VG'},
    {title: 'Virgin Islands, U.S.', id: 'VI'},
    {title: 'Wallis and Futuna', id: 'WF'},
    {title: 'Western Sahara', id: 'EH'},
    {title: 'Yemen', id: 'YE'},
    {title: 'Zambia', id: 'ZM'},
    {title: 'Zimbabwe', id: 'ZW'}
]
const currency = [
    /*{  id:'USD',title:"US Dollar" },*/
    {  id:'EUR',title:"Euro" },
    /*{  id:'GEL',title:"Lari" },
    {  id:'RUB',title:"Russian Ruble" }*/
]


const passportType= [
    {id: "id_card", title: "ID Card"},
    {id: "passport",title: "Passport"},
    {id: "resident_identification",title: "Resident Identification"},
]

const MobilePrefixList=[{
    //"name": "Afghanistan",
    "id": "93",
    "title": "+93",
    "code": "AF"
},
    {
        //"name": "Aland Islands",
        "id": "358",
        "title": "+358",
        "code": "AX"
    },
    {
        //"name": "Albania",
        "id": "355",
        "title": "+355",
        "code": "AL"
    },
    {
        //"name": "Algeria",
        "id": "213",
        "title": "+213",
        "code": "DZ"
    },
    {
        //"name": "AmericanSamoa",
        "id": "1 684",
        "title": "+1 684",
        "code": "AS"
    },
    {
        //"name": "Andorra",
        "id": "376",
        "title": "+376",
        "code": "AD"
    },
    {
        //"name": "Angola",
        "id": "244",
        "title": "+244",
        "code": "AO"
    },
    {
        //"name": "Anguilla",
        "id": "1 264",
        "title": "+1 264",
        "code": "AI"
    },
    {
        //"name": "Antarctica",
        "id": "672",
        "title": "+672",
        "code": "AQ"
    },
    {
        //"name": "Antigua and Barbuda",
        "id": "1268",
        "title": "+1268",
        "code": "AG"
    },
    {
        //"name": "Argentina",
        "id": "54",
        "title": "+54",
        "code": "AR"
    },
    {
        //"name": "Armenia",
        "id": "374",
        "title": "+374",
        "code": "AM"
    },
    {
        //"name": "Aruba",
        "id": "297",
        "title": "+297",
        "code": "AW"
    },
    {
        //"name": "Australia",
        "id": "61",
        "title": "+61",
        "code": "AU"
    },
    {
        //"name": "Austria",
        "id": "43",
        "title": "+43",
        "code": "AT"
    },
    {
        //"name": "Azerbaijan",
        "id": "994",
        "title": "+994",
        "code": "AZ"
    },
    {
        //"name": "Bahamas",
        "id": "1 242",
        "title": "+1 242",
        "code": "BS"
    },
    {
        //"name": "Bahrain",
        "id": "973",
        "title": "+973",
        "code": "BH"
    },
    {
        //"name": "Bangladesh",
        "id": "880",
        "title": "+880",
        "code": "BD"
    },
    {
        //"name": "Barbados",
        "id": "1 246",
        "title": "+1 246",
        "code": "BB"
    },
    {
        //"name": "Belarus",
        "id": "375",
        "title": "+375",
        "code": "BY"
    },
    {
        //"name": "Belgium",
        "id": "32",
        "title": "+32",
        "code": "BE"
    },
    {
        //"name": "Belize",
        "id": "501",
        "title": "+501",
        "code": "BZ"
    },
    {
        //"name": "Benin",
        "id": "229",
        "title": "+229",
        "code": "BJ"
    },
    {
        //"name": "Bermuda",
        "id": "1 441",
        "title": "+1 441",
        "code": "BM"
    },
    {
        //"name": "Bhutan",
        "id": "975",
        "title": "+975",
        "code": "BT"
    },
    {
        //"name": "Bolivia, Plurinational State of",
        "id": "591",
        "title": "+591",
        "code": "BO"
    },
    {
        //"name": "Bosnia and Herzegovina",
        "id": "387",
        "title": "+387",
        "code": "BA"
    },
    {
        //"name": "Botswana",
        "id": "267",
        "title": "+267",
        "code": "BW"
    },
    {
        //"name": "Brazil",
        "id": "55",
        "title": "+55",
        "code": "BR"
    },
    {
        //"name": "British Indian Ocean Territory",
        "id": "246",
        "title": "+246",
        "code": "IO"
    },
    {
        //"name": "Brunei Darussalam",
        "id": "673",
        "title": "+673",
        "code": "BN"
    },
    {
        //"name": "Bulgaria",
        "id": "359",
        "title": "+359",
        "code": "BG"
    },
    {
        //"name": "Burkina Faso",
        "id": "226",
        "title": "+226",
        "code": "BF"
    },
    {
        //"name": "Burundi",
        "id": "257",
        "title": "+257",
        "code": "BI"
    },
    {
        //"name": "Cambodia",
        "id": "855",
        "title": "+855",
        "code": "KH"
    },
    {
        //"name": "Cameroon",
        "id": "237",
        "title": "+237",
        "code": "CM"
    },
    {
        //"name": "Canada",
        "id": "1",
        "title": "+1",
        "code": "CA"
    },
    {
        //"name": "Cape Verde",
        "id": "238",
        "title": "+238",
        "code": "CV"
    },
    {
        //"name": "Cayman Islands",
        "id": " 345",
        "title": "+ 345",
        "code": "KY"
    },
    {
        //"name": "Central African Republic",
        "id": "236",
        "title": "+236",
        "code": "CF"
    },
    {
        //"name": "Chad",
        "id": "235",
        "title": "+235",
        "code": "TD"
    },
    {
        //"name": "Chile",
        "id": "56",
        "title": "+56",
        "code": "CL"
    },
    {
        //"name": "China",
        "id": "86",
        "title": "+86",
        "code": "CN"
    },
    {
        //"name": "Christmas Island",
        "id": "61",
        "title": "+61",
        "code": "CX"
    },
    {
        //"name": "Cocos (Keeling) Islands",
        "id": "61",
        "title": "+61",
        "code": "CC"
    },
    {
        //"name": "Colombia",
        "id": "57",
        "title": "+57",
        "code": "CO"
    },
    {
        //"name": "Comoros",
        "id": "269",
        "title": "+269",
        "code": "KM"
    },
    {
        //"name": "Congo",
        "id": "242",
        "title": "+242",
        "code": "CG"
    },
    {
        //"name": "Congo, The Democratic Republic of the Congo",
        "id": "243",
        "title": "+243",
        "code": "CD"
    },
    {
        //"name": "Cook Islands",
        "id": "682",
        "title": "+682",
        "code": "CK"
    },
    {
        //"name": "Costa Rica",
        "id": "506",
        "title": "+506",
        "code": "CR"
    },
    {
        //"name": "Cote d'Ivoire",
        "id": "225",
        "title": "+225",
        "code": "CI"
    },
    {
        //"name": "Croatia",
        "id": "385",
        "title": "+385",
        "code": "HR"
    },
    {
        //"name": "Cuba",
        "id": "53",
        "title": "+53",
        "code": "CU"
    },
    {
        //"name": "Cyprus",
        "id": "357",
        "title": "+357",
        "code": "CY"
    },
    {
        //"name": "Czech Republic",
        "id": "420",
        "title": "+420",
        "code": "CZ"
    },
    {
        //"name": "Denmark",
        "id": "45",
        "title": "+45",
        "code": "DK"
    },
    {
        //"name": "Djibouti",
        "id": "253",
        "title": "+253",
        "code": "DJ"
    },
    {
        //"name": "Dominica",
        "id": "1 767",
        "title": "+1 767",
        "code": "DM"
    },
    {
        //"name": "Dominican Republic",
        "id": "1 849",
        "title": "+1 849",
        "code": "DO"
    },
    {
        //"name": "Ecuador",
        "id": "593",
        "title": "+593",
        "code": "EC"
    },
    {
        //"name": "Egypt",
        "id": "20",
        "title": "+20",
        "code": "EG"
    },
    {
        //"name": "El Salvador",
        "id": "503",
        "title": "+503",
        "code": "SV"
    },
    {
        //"name": "Equatorial Guinea",
        "id": "240",
        "title": "+240",
        "code": "GQ"
    },
    {
        //"name": "Eritrea",
        "id": "291",
        "title": "+291",
        "code": "ER"
    },
    {
        //"name": "Estonia",
        "id": "372",
        "title": "+372",
        "code": "EE"
    },
    {
        //"name": "Ethiopia",
        "id": "251",
        "title": "+251",
        "code": "ET"
    },
    {
        //"name": "Falkland Islands (Malvinas)",
        "id": "500",
        "title": "+500",
        "code": "FK"
    },
    {
        //"name": "Faroe Islands",
        "id": "298",
        "title": "+298",
        "code": "FO"
    },
    {
        //"name": "Fiji",
        "id": "679",
        "title": "+679",
        "code": "FJ"
    },
    {
        //"name": "Finland",
        "id": "358",
        "title": "+358",
        "code": "FI"
    },
    {
        //"name": "France",
        "id": "33",
        "title": "+33",
        "code": "FR"
    },
    {
        //"name": "French Guiana",
        "id": "594",
        "title": "+594",
        "code": "GF"
    },
    {
        //"name": "French Polynesia",
        "id": "689",
        "title": "+689",
        "code": "PF"
    },
    {
        //"name": "Gabon",
        "id": "241",
        "title": "+241",
        "code": "GA"
    },
    {
        //"name": "Gambia",
        "id": "220",
        "title": "+220",
        "code": "GM"
    },
    {
        //"name": "Georgia",
        "id": "995",
        "title": "+995",
        "code": "GE"
    },
    {
        //"name": "Germany",
        "id": "49",
        "title": "+49",
        "code": "DE"
    },
    {
        //"name": "Ghana",
        "id": "233",
        "title": "+233",
        "code": "GH"
    },
    {
        //"name": "Gibraltar",
        "id": "350",
        "title": "+350",
        "code": "GI"
    },
    {
        //"name": "Greece",
        "id": "30",
        "title": "+30",
        "code": "GR"
    },
    {
        //"name": "Greenland",
        "id": "299",
        "title": "+299",
        "code": "GL"
    },
    {
        //"name": "Grenada",
        "id": "1 473",
        "title": "+1 473",
        "code": "GD"
    },
    {
        //"name": "Guadeloupe",
        "id": "590",
        "title": "+590",
        "code": "GP"
    },
    {
        //"name": "Guam",
        "id": "1 671",
        "title": "+1 671",
        "code": "GU"
    },
    {
        //"name": "Guatemala",
        "id": "502",
        "title": "+502",
        "code": "GT"
    },
    {
        //"name": "Guernsey",
        "id": "44",
        "title": "+44",
        "code": "GG"
    },
    {
        //"name": "Guinea",
        "id": "224",
        "title": "+224",
        "code": "GN"
    },
    {
        //"name": "Guinea-Bissau",
        "id": "245",
        "title": "+245",
        "code": "GW"
    },
    {
        //"name": "Guyana",
        "id": "595",
        "title": "+595",
        "code": "GY"
    },
    {
        //"name": "Haiti",
        "id": "509",
        "title": "+509",
        "code": "HT"
    },
    {
        //"name": "Holy See (Vatican City State)",
        "id": "379",
        "title": "+379",
        "code": "VA"
    },
    {
        //"name": "Honduras",
        "id": "504",
        "title": "+504",
        "code": "HN"
    },
    {
        //"name": "Hong Kong",
        "id": "852",
        "title": "+852",
        "code": "HK"
    },
    {
        //"name": "Hungary",
        "id": "36",
        "title": "+36",
        "code": "HU"
    },
    {
        //"name": "Iceland",
        "id": "354",
        "title": "+354",
        "code": "IS"
    },
    {
        //"name": "India",
        "id": "91",
        "title": "+91",
        "code": "IN"
    },
    {
        //"name": "Indonesia",
        "id": "62",
        "title": "+62",
        "code": "ID"
    },
    {
        //"name": "Iran, Islamic Republic of Persian Gulf",
        "id": "98",
        "title": "+98",
        "code": "IR"
    },
    {
        //"name": "Iraq",
        "id": "964",
        "title": "+964",
        "code": "IQ"
    },
    {
        //"name": "Ireland",
        "id": "353",
        "title": "+353",
        "code": "IE"
    },
    {
        //"name": "Isle of Man",
        "id": "44",
        "title": "+44",
        "code": "IM"
    },
    {
        //"name": "Israel",
        "id": "972",
        "title": "+972",
        "code": "IL"
    },
    {
        //"name": "Italy",
        "id": "39",
        "title": "+39",
        "code": "IT"
    },
    {
        //"name": "Jamaica",
        "id": "1 876",
        "title": "+1 876",
        "code": "JM"
    },
    {
        //"name": "Japan",
        "id": "81",
        "title": "+81",
        "code": "JP"
    },
    {
        //"name": "Jersey",
        "id": "44",
        "title": "+44",
        "code": "JE"
    },
    {
        //"name": "Jordan",
        "id": "962",
        "title": "+962",
        "code": "JO"
    },
    {
        //"name": "Kazakhstan",
        "id": "7 7",
        "title": "+7 7",
        "code": "KZ"
    },
    {
        //"name": "Kenya",
        "id": "254",
        "title": "+254",
        "code": "KE"
    },
    {
        //"name": "Kiribati",
        "id": "686",
        "title": "+686",
        "code": "KI"
    },
    {
        //"name": "Korea, Democratic People's Republic of Korea",
        "id": "850",
        "title": "+850",
        "code": "KP"
    },
    {
        //"name": "Korea, Republic of South Korea",
        "id": "82",
        "title": "+82",
        "code": "KR"
    },
    {
        //"name": "Kosovo",
        "id": "383",
        "title": "+383",
        "code": "XK"
    },
    {
        //"name": "Kuwait",
        "id": "965",
        "title": "+965",
        "code": "KW"
    },
    {
        //"name": "Kyrgyzstan",
        "id": "996",
        "title": "+996",
        "code": "KG"
    },
    {
        //"name": "Laos",
        "id": "856",
        "title": "+856",
        "code": "LA"
    },
    {
        //"name": "Latvia",
        "id": "371",
        "title": "+371",
        "code": "LV"
    },
    {
        //"name": "Lebanon",
        "id": "961",
        "title": "+961",
        "code": "LB"
    },
    {
        //"name": "Lesotho",
        "id": "266",
        "title": "+266",
        "code": "LS"
    },
    {
        //"name": "Liberia",
        "id": "231",
        "title": "+231",
        "code": "LR"
    },
    {
        //"name": "Libyan Arab Jamahiriya",
        "id": "218",
        "title": "+218",
        "code": "LY"
    },
    {
        //"name": "Liechtenstein",
        "id": "423",
        "title": "+423",
        "code": "LI"
    },
    {
        //"name": "Lithuania",
        "id": "370",
        "title": "+370",
        "code": "LT"
    },
    {
        //"name": "Luxembourg",
        "id": "352",
        "title": "+352",
        "code": "LU"
    },
    {
        //"name": "Macao",
        "id": "853",
        "title": "+853",
        "code": "MO"
    },
    {
        //"name": "Macedonia",
        "id": "389",
        "title": "+389",
        "code": "MK"
    },
    {
        //"name": "Madagascar",
        "id": "261",
        "title": "+261",
        "code": "MG"
    },
    {
        //"name": "Malawi",
        "id": "265",
        "title": "+265",
        "code": "MW"
    },
    {
        //"name": "Malaysia",
        "id": "60",
        "title": "+60",
        "code": "MY"
    },
    {
        //"name": "Maldives",
        "id": "960",
        "title": "+960",
        "code": "MV"
    },
    {
        //"name": "Mali",
        "id": "223",
        "title": "+223",
        "code": "ML"
    },
    {
        //"name": "Malta",
        "id": "356",
        "title": "+356",
        "code": "MT"
    },
    {
        //"name": "Marshall Islands",
        "id": "692",
        "title": "+692",
        "code": "MH"
    },
    {
        //"name": "Martinique",
        "id": "596",
        "title": "+596",
        "code": "MQ"
    },
    {
        //"name": "Mauritania",
        "id": "222",
        "title": "+222",
        "code": "MR"
    },
    {
        //"name": "Mauritius",
        "id": "230",
        "title": "+230",
        "code": "MU"
    },
    {
        //"name": "Mayotte",
        "id": "262",
        "title": "+262",
        "code": "YT"
    },
    {
        //"name": "Mexico",
        "id": "52",
        "title": "+52",
        "code": "MX"
    },
    {
        //"name": "Micronesia, Federated States of Micronesia",
        "id": "691",
        "title": "+691",
        "code": "FM"
    },
    {
        //"name": "Moldova",
        "id": "373",
        "title": "+373",
        "code": "MD"
    },
    {
        //"name": "Monaco",
        "id": "377",
        "title": "+377",
        "code": "MC"
    },
    {
        //"name": "Mongolia",
        "id": "976",
        "title": "+976",
        "code": "MN"
    },
    {
        //"name": "Montenegro",
        "id": "382",
        "title": "+382",
        "code": "ME"
    },
    {
        //"name": "Montserrat",
        "id": "1664",
        "title": "+1664",
        "code": "MS"
    },
    {
        //"name": "Morocco",
        "id": "212",
        "title": "+212",
        "code": "MA"
    },
    {
        //"name": "Mozambique",
        "id": "258",
        "title": "+258",
        "code": "MZ"
    },
    {
        //"name": "Myanmar",
        "id": "95",
        "title": "+95",
        "code": "MM"
    },
    {
        //"name": "Namibia",
        "id": "264",
        "title": "+264",
        "code": "NA"
    },
    {
        //"name": "Nauru",
        "id": "674",
        "title": "+674",
        "code": "NR"
    },
    {
        //"name": "Nepal",
        "id": "977",
        "title": "+977",
        "code": "NP"
    },
    {
        //"name": "Netherlands",
        "id": "31",
        "title": "+31",
        "code": "NL"
    },
    {
        //"name": "Netherlands Antilles",
        "id": "599",
        "title": "+599",
        "code": "AN"
    },
    {
        //"name": "New Caledonia",
        "id": "687",
        "title": "+687",
        "code": "NC"
    },
    {
        //"name": "New Zealand",
        "id": "64",
        "title": "+64",
        "code": "NZ"
    },
    {
        //"name": "Nicaragua",
        "id": "505",
        "title": "+505",
        "code": "NI"
    },
    {
        //"name": "Niger",
        "id": "227",
        "title": "+227",
        "code": "NE"
    },
    {
        //"name": "Nigeria",
        "id": "234",
        "title": "+234",
        "code": "NG"
    },
    {
        //"name": "Niue",
        "id": "683",
        "title": "+683",
        "code": "NU"
    },
    {
        //"name": "Norfolk Island",
        "id": "672",
        "title": "+672",
        "code": "NF"
    },
    {
        //"name": "Northern Mariana Islands",
        "id": "1 670",
        "title": "+1 670",
        "code": "MP"
    },
    {
        //"name": "Norway",
        "id": "47",
        "title": "+47",
        "code": "NO"
    },
    {
        //"name": "Oman",
        "id": "968",
        "title": "+968",
        "code": "OM"
    },
    {
        //"name": "Pakistan",
        "id": "92",
        "title": "+92",
        "code": "PK"
    },
    {
        //"name": "Palau",
        "id": "680",
        "title": "+680",
        "code": "PW"
    },
    {
        //"name": "Palestinian Territory, Occupied",
        "id": "970",
        "title": "+970",
        "code": "PS"
    },
    {
        //"name": "Panama",
        "id": "507",
        "title": "+507",
        "code": "PA"
    },
    {
        //"name": "Papua New Guinea",
        "id": "675",
        "title": "+675",
        "code": "PG"
    },
    {
        //"name": "Paraguay",
        "id": "595",
        "title": "+595",
        "code": "PY"
    },
    {
        //"name": "Peru",
        "id": "51",
        "title": "+51",
        "code": "PE"
    },
    {
        //"name": "Philippines",
        "id": "63",
        "title": "+63",
        "code": "PH"
    },
    {
        //"name": "Pitcairn",
        "id": "872",
        "title": "+872",
        "code": "PN"
    },
    {
        //"name": "Poland",
        "id": "48",
        "title": "+48",
        "code": "PL"
    },
    {
        //"name": "Portugal",
        "id": "351",
        "title": "+351",
        "code": "PT"
    },
    {
        //"name": "Puerto Rico",
        "id": "1 939",
        "title": "+1 939",
        "code": "PR"
    },
    {
        //"name": "Qatar",
        "id": "974",
        "title": "+974",
        "code": "QA"
    },
    {
        //"name": "Romania",
        "id": "40",
        "title": "+40",
        "code": "RO"
    },
    {
        //"name": "Russia",
        "id": "7",
        "title": "+7",
        "code": "RU"
    },
    {
        //"name": "Rwanda",
        "id": "250",
        "title": "+250",
        "code": "RW"
    },
    {
        //"name": "Reunion",
        "id": "262",
        "title": "+262",
        "code": "RE"
    },
    {
        //"name": "Saint Barthelemy",
        "id": "590",
        "title": "+590",
        "code": "BL"
    },
    {
        //"name": "Saint Helena, Ascension and Tristan Da Cunha",
        "id": "290",
        "title": "+290",
        "code": "SH"
    },
    {
        //"name": "Saint Kitts and Nevis",
        "id": "1 869",
        "title": "+1 869",
        "code": "KN"
    },
    {
        //"name": "Saint Lucia",
        "id": "1 758",
        "title": "+1 758",
        "code": "LC"
    },
    {
        //"name": "Saint Martin",
        "id": "590",
        "title": "+590",
        "code": "MF"
    },
    {
        //"name": "Saint Pierre and Miquelon",
        "id": "508",
        "title": "+508",
        "code": "PM"
    },
    {
        //"name": "Saint Vincent and the Grenadines",
        "id": "1 784",
        "title": "+1 784",
        "code": "VC"
    },
    {
        //"name": "Samoa",
        "id": "685",
        "title": "+685",
        "code": "WS"
    },
    {
        //"name": "San Marino",
        "id": "378",
        "title": "+378",
        "code": "SM"
    },
    {
        //"name": "Sao Tome and Principe",
        "id": "239",
        "title": "+239",
        "code": "ST"
    },
    {
        //"name": "Saudi Arabia",
        "id": "966",
        "title": "+966",
        "code": "SA"
    },
    {
        //"name": "Senegal",
        "id": "221",
        "title": "+221",
        "code": "SN"
    },
    {
        //"name": "Serbia",
        "id": "381",
        "title": "+381",
        "code": "RS"
    },
    {
        //"name": "Seychelles",
        "id": "248",
        "title": "+248",
        "code": "SC"
    },
    {
        //"name": "Sierra Leone",
        "id": "232",
        "title": "+232",
        "code": "SL"
    },
    {
        //"name": "Singapore",
        "id": "65",
        "title": "+65",
        "code": "SG"
    },
    {
        //"name": "Slovakia",
        "id": "421",
        "title": "+421",
        "code": "SK"
    },
    {
        //"name": "Slovenia",
        "id": "386",
        "title": "+386",
        "code": "SI"
    },
    {
        //"name": "Solomon Islands",
        "id": "677",
        "title": "+677",
        "code": "SB"
    },
    {
        //"name": "Somalia",
        "id": "252",
        "title": "+252",
        "code": "SO"
    },
    {
        //"name": "South Africa",
        "id": "27",
        "title": "+27",
        "code": "ZA"
    },
    {
        //"name": "South Georgia and the South Sandwich Islands",
        "id": "500",
        "title": "+500",
        "code": "GS"
    },
    {
        //"name": "Spain",
        "id": "34",
        "title": "+34",
        "code": "ES"
    },
    {
        //"name": "Sri Lanka",
        "id": "94",
        "title": "+94",
        "code": "LK"
    },
    {
        //"name": "Sudan",
        "id": "249",
        "title": "+249",
        "code": "SD"
    },
    {
        //"name": "Suriname",
        "id": "597",
        "title": "+597",
        "code": "SR"
    },
    {
        //"name": "Svalbard and Jan Mayen",
        "id": "47",
        "title": "+47",
        "code": "SJ"
    },
    {
        //"name": "Swaziland",
        "id": "268",
        "title": "+268",
        "code": "SZ"
    },
    {
        //"name": "Sweden",
        "id": "46",
        "title": "+46",
        "code": "SE"
    },
    {
        //"name": "Switzerland",
        "id": "41",
        "title": "+41",
        "code": "CH"
    },
    {
        //"name": "Syrian Arab Republic",
        "id": "963",
        "title": "+963",
        "code": "SY"
    },
    {
        //"name": "Taiwan",
        "id": "886",
        "title": "+886",
        "code": "TW"
    },
    {
        //"name": "Tajikistan",
        "id": "992",
        "title": "+992",
        "code": "TJ"
    },
    {
        //"name": "Tanzania, United Republic of Tanzania",
        "id": "255",
        "title": "+255",
        "code": "TZ"
    },
    {
        //"name": "Thailand",
        "id": "66",
        "title": "+66",
        "code": "TH"
    },
    {
        //"name": "Timor-Leste",
        "id": "670",
        "title": "+670",
        "code": "TL"
    },
    {
        //"name": "Togo",
        "id": "228",
        "title": "+228",
        "code": "TG"
    },
    {
        //"name": "Tokelau",
        "id": "690",
        "title": "+690",
        "code": "TK"
    },
    {
        //"name": "Tonga",
        "id": "676",
        "title": "+676",
        "code": "TO"
    },
    {
        //"name": "Trinidad and Tobago",
        "id": "1 868",
        "title": "+1 868",
        "code": "TT"
    },
    {
        //"name": "Tunisia",
        "id": "216",
        "title": "+216",
        "code": "TN"
    },
    {
        //"name": "Turkey",
        "id": "90",
        "title": "+90",
        "code": "TR"
    },
    {
        //"name": "Turkmenistan",
        "id": "993",
        "title": "+993",
        "code": "TM"
    },
    {
        //"name": "Turks and Caicos Islands",
        "id": "1 649",
        "title": "+1 649",
        "code": "TC"
    },
    {
        //"name": "Tuvalu",
        "id": "688",
        "title": "+688",
        "code": "TV"
    },
    {
        //"name": "Uganda",
        "id": "256",
        "title": "+256",
        "code": "UG"
    },
    {
        //"name": "Ukraine",
        "id": "380",
        "title": "+380",
        "code": "UA"
    },
    {
        //"name": "United Arab Emirates",
        "id": "971",
        "title": "+971",
        "code": "AE"
    },
    {
        //"name": "United Kingdom",
        "id": "44",
        "title": "+44",
        "code": "GB"
    },
    {
        //"name": "United States",
        "id": "1",
        "title": "+1",
        "code": "US"
    },
    {
        //"name": "Uruguay",
        "id": "598",
        "title": "+598",
        "code": "UY"
    },
    {
        //"name": "Uzbekistan",
        "id": "998",
        "title": "+998",
        "code": "UZ"
    },
    {
        //"name": "Vanuatu",
        "id": "678",
        "title": "+678",
        "code": "VU"
    },
    {
        //"name": "Venezuela, Bolivarian Republic of Venezuela",
        "id": "58",
        "title": "+58",
        "code": "VE"
    },
    {
        //"name": "Vietnam",
        "id": "84",
        "title": "+84",
        "code": "VN"
    },
    {
        //"name": "Virgin Islands, British",
        "id": "1 284",
        "title": "+1 284",
        "code": "VG"
    },
    {
        //"name": "Virgin Islands, U.S.",
        "id": "1 340",
        "title": "+1 340",
        "code": "VI"
    },
    {
        //"name": "Wallis and Futuna",
        "id": "681",
        "title": "+681",
        "code": "WF"
    },
    {
        //"name": "Yemen",
        "id": "967",
        "title": "+967",
        "code": "YE"
    },
    {
        //"name": "Zambia",
        "id": "260",
        "title": "+260",
        "code": "ZM"
    },
    {
        //"name": "Zimbabwe",
        "id": "263",
        "title": "+263",
        "code": "ZW"
    }
]
/*[
    {id:1,title: "+1"},
    {id:673,title: "+673"},
    {id:359,title: "+359"},
    {id:226,title: "+226"},
    {id:257,title: "+257"}
]*/
const gender = [
    { id:"F",title:"Female",},
    { id:"M",title:"Male",}
]

const Confirmation = () => {
    const {t} = useTranslation();
    const {lang} = useParams()
    const history = useHistory()
    const {otp, PHONE,EMAIL,CLOSE,ERROR,MULTI} = useOTP();
    const [infoData, setInfoData] = useState({
        firstName:'',
        email:'',
        mobile:'',
        gender:'',
        dob:"",
        lastName:'',
        username:'',
        currency: "EUR",
        country:"",
        mobileConfirmed:0,
        emailConfirmed:0,
        mobilePrefix:""
    });

    const [documents,setDocuments]=useState({
        "passportType":"",
        "docNumber":"",
        "country": "",
        "doc_expire_date":moment(new Date(),"YYYY-MM-DD").add(1,"days").format('YYYY-MM-DD'),
        "front":"",
        "back":""
    })
    const [status]=useState({
        status:"",
        msg:""
    })
    const [errors,setErrors]=useState([])
    const [step,setStep]=useState(1)
    const [otpSource,setOtpSources]=useState(null)
    useEffect(()=>{
        getInfo()
    },[])

    const getInfo = ()=>{
        Actions.User.info().then(response=>{
            if(response.status){
                if (response?.data?.data?.userVerifyStatus === 2){setStep(2)}
                let res = response.data.data;
                setInfoData(_.fromPairs(_.map(infoData, (v,k)=> {
                    switch (k){
                        default: return [k,res[k]];
                    }
                })))

                /*const {
                    firstName,
                    email,
                    mobile,
                    lastName,
                    username,
                    currency,
                    dob,
                    gender,
                    country,
                    mobileConfirmed,
                    emailConfirmed,
                    mobilePrefix
                }=response.data.data;
                setInfoData({
                    firstName:firstName,
                    email:email,
                    mobile:mobile,
                    lastName:lastName,
                    username:username,
                    currency: currency,
                    gender: gender,
                    dob:dob,
                    country:country,
                    mobileConfirmed:mobileConfirmed,
                    emailConfirmed:emailConfirmed,
                    mobilePrefix:mobilePrefix
                })*/
            }
        })
    }
    const error=(key)=>{
        return errors.indexOf(key)>-1?"error":""
    }
    const nextStep = ()=>{
        setErrors([])
        let error = _.chain(infoData).map((v,k)=>{
            if(["mobileConfirmed","emailConfirmed","mobilePrefix","mobile","email"].includes(k)){
                return {key:k,value:1}
            }
            return {key:k,value:v}
        }).filter(v=>!v.value).map(v=>v.key).value();

        console.log(error);

        if(error.length>0){
            setErrors([...error])
        }else{
             setStep(2)
        }
    }
    const finishStep=()=>{
        setErrors([])
        let error = _.chain(documents).map((v,k)=>{
            return {key:k,value:v}
        }).filter(v=>!v.value).map(v=>v.key).value();
        if(error.length>0){
            setErrors([...error])
        }else{

            MULTI({
                email:infoData.email,
                send:"/os/v1/api/secured/otp/profile-verification",
                title:t('Confirm Operation'),
                save:({code,sourceId})=>{
                    if(code){
                        console.log("infodata",infoData)
                        Actions.User.verification({data:{
                            ...infoData,...documents,otp:code,sourceId:sourceId

                        },loader:"verifyOtp"}).then(response=>{
                            if(response.status){
                                CLOSE();
                                window.pushEvent(t("The operation was performed successfully"),"success")
                                history.push(`/${lang}/account/info`)
                            }else{
                                console.log("catch")
                                ERROR({error:t("error")})
                            }
                        }).catch(e=>{
                            console.log("catch")
                            ERROR({error:t("error")})
                        })
                    }

                }
            })

        }
    }
    return (
        <>
            <div id="accountTabContent">
                <div
                    className="tab-pane fade show active"
                    id="personal"
                    role="tabpanel"
                    aria-labelledby="personal-tab"
                >
                    <div className="account-tab-inner">
                        <div className="tab-headline">{t("Account Confirmation")}</div>

                        <form onSubmit={e=>{
                            e.preventDefault()

                        }} className="personal-data">
                            <div className="tab-content row">
                                {
                                    step === 1 ? <div
                                        className="col-12 col-md-12 tab-pane show active"
                                        id="information"
                                    >
                                        <div className="row personal-row">
                                            <div className="col-12 d-none d-md-flex">
                                                <div className="form-title">{t("Information")}</div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div style={{display:'flex',width:"100%"}}>
                                                    <div style={{width:"100px",marginRight: '10px'}}>
                                                        <SelectBox
                                                            data={MobilePrefixList}
                                                            value={infoData.mobilePrefix}
                                                            placeholder={t("Prefix")}
                                                            //plData={''} plName={t("Choose Sex")}
                                                            onSelect={(e)=> setInfoData({...infoData,mobilePrefix:e.id})}
                                                        />
                                                    </div>
                                                    <div className={`input-label-border`} style={{flex:1,position: "relative"}}>
                                                        <input
                                                            type="number"
                                                            name="mobile"
                                                            id="mobile"
                                                            className="for-confirm"
                                                            value={infoData.mobile}
                                                            onChange={e => setInfoData({...infoData,mobile:e.target.value})}
                                                        />
                                                        <label htmlFor="phone">{t("Phone")}</label>
                                                        {
                                                            infoData?.mobileConfirmed===1?<span className="confirmed">{t("Confirmed")}</span>:
                                                                <button
                                                                    type="button"
                                                                    className="btn-confirm"
                                                                    onClick={()=>{
                                                                        if(infoData.mobile.trim().length>0){
                                                                            PHONE({
                                                                                prefix:infoData.mobilePrefix,
                                                                                number:infoData.mobile,
                                                                                send:"/os/v1/api/secured/otp/profile-verification-mobile",
                                                                                verify:"/os/v1/api/secured/otp/profile-verification-mobile",
                                                                                save:e=>{
                                                                                    if(e){
                                                                                        setInfoData({...infoData,mobileConfirmed:1});
                                                                                        window.pushEvent(t("The operation was performed successfully"),"success");
                                                                                        CLOSE();
                                                                                    }

                                                                                }
                                                                            })
                                                                        }
                                                                    }}
                                                                >
                                                                    {t("Confirm")}
                                                                </button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div  className={`input-label-border ${error("email")}`}>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        className="for-confirm"
                                                        value={infoData.email}
                                                        onChange={e => setInfoData({...infoData,email:e.target.value})}
                                                    />
                                                    <label htmlFor="email">Email</label>
                                                    {
                                                        infoData?.emailConfirmed===1?<span className="confirmed">Confirmed</span>:
                                                            <button
                                                                onClick={()=>{
                                                                    if(infoData.email.trim().length>0){
                                                                        EMAIL({
                                                                                email:infoData.email,
                                                                                send:"/os/v1/api/secured/otp/profile-verification-email",
                                                                                verify:"/os/v1/api/secured/otp/profile-verification-email",
                                                                                save:e=>{
                                                                                    if(e){
                                                                                        window.pushEvent(t("The operation was performed successfully"),"success");
                                                                                        setInfoData({...infoData,emailConfirmed:1});
                                                                                        CLOSE()
                                                                                    }
                                                                                }
                                                                        })
                                                                    }
                                                                }}
                                                                type="button"
                                                                className="btn-confirm"
                                                            >
                                                                {t("Confirm")}
                                                            </button>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div  className={`input-label-border ${error("firstName")}`}>
                                                    <input onChange={e => setInfoData({...infoData,firstName:e.target.value})} value={infoData.firstName} type="text" name="name" id="name"/>
                                                    <label htmlFor="name">{t("Name")}</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className={`input-label-border ${error("lastName")}`}>
                                                    <input onChange={e => setInfoData({...infoData,lastName:e.target.value})} value={infoData.lastName} type="text" name="surname" id="surname"/>
                                                    <label htmlFor="surname">{t("Surname")}</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className={`${error("gender")}`}>
                                                <SelectBox
                                                        data={gender} value={infoData.gender}
                                                        placeholder={t("Sex")}
                                                        id={'gender'}
                                                        error={error("gender")}
                                                        onSelect={(e)=> setInfoData({...infoData,gender:e.id})}
                                                />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className={`input-label-border ${error("dob")}`}>
                                                    <input onChange={e => setInfoData({...infoData,dob:e.target.value})} value={infoData.dob} type="date" name="dob" id="dob"/>
                                                    <label htmlFor="dob">{t("Date of birth")}</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className={`input-label-border ${error("username")}`}>
                                                    <input onChange={e => setInfoData({...infoData,username:e.target.value})} value={infoData.username} type="text" name="username" id="username"/>
                                                    <label htmlFor="username">{t("Username")}</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className={`${error("Nationality")}`}>
                                                <SelectBox
                                                        data={countries}
                                                        value={infoData.country}
                                                        placeholder={t("Nationality")}
                                                        error={error("country")}
                                                        onSelect={(e)=> setInfoData({...infoData,country:e.id})}
                                                />
                                                </div>
                                            </div>
                                            {/*<div className="col-12 col-md-6">
                                                <div className={`input-label-border`}>
                                                    <input value={currency[0].title} type="text" name="currency" id="currency"/>
                                                    <label htmlFor="currency">{t("currency")}</label>
                                                </div>
                                            </div>*/}
                                            {/*<div className="col-12 col-md-6">
                                                <div className={`${error("currency")}`}>
                                                <SelectBox
                                                        data={currency}
                                                        value={infoData.currency}
                                                        placeholder={t("Currency")}
                                                        error={error("currency")}
                                                        onSelect={(e)=> setInfoData({...infoData,currency:e.id})}
                                                />
                                                </div>
                                            </div>*/}

                                        </div>
                                    </div>:null
                                }
                                {
                                    step===2? <div
                                        className="col-12 col-md-12 "
                                    >
                                        <div className="row personal-row">
                                            <div className="col-12 order-3 order-md-2">
                                                <div className="row step2" style={{marginTop:'20px'}}>

                                                    <div className="col-12 col-md-6">
                                                        <SelectBox
                                                            data={passportType}
                                                            placeholder={"Document Type"}
                                                            value={documents.passportType}
                                                            error={error("passportType")}
                                                            onSelect={(e)=> setDocuments({...documents,passportType:e.id})}

                                                        />
                                                       {/* <Select data={passportType} value={documents.passportType} label={t("Document Type")}
                                                                plData={''} plName={t("Choose type")}
                                                                id={'passportType'}
                                                                error={error("passportType")}
                                                                onSelect={(e)=> setDocuments({...documents,passportType:e})}
                                                        />*/}
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <SelectBox
                                                                data={countries}
                                                                value={documents.country}
                                                                placeholder={t("Nationality")}
                                                                error={error("country")}
                                                                onSelect={(e)=> setDocuments({...documents,country:e.id})}
                                                        />
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <div className={`input-label-border ${error("docNumber")}`}>
                                                            <input type="text" name="docNumber" id="docNumber" value={documents.docNumber} onChange={event => setDocuments({...documents,docNumber:event.target.value})}/>
                                                            <label htmlFor="phone">{t("Document Number")}</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <div className={`input-label-border ${error("doc_expire_date")}`}>
                                                            <input
                                                                    onChange={e => setDocuments({...documents,doc_expire_date:e.target.value})}
                                                                    value={documents.doc_expire_date}
                                                                    type="date" name="dob"
                                                                    id="dob"
                                                                    min={moment(new Date(),"YYYY-MM-DD").add(1,"days").format("YYYY-MM-DD")}/>
                                                            <label htmlFor="dob">{t("Document Expire Date")}</label>
                                                        </div>
                                                    </div>
                                                    <div className={`col-12 col-md-6 ${error("front")}`}>
                                                        <UploadDoc
                                                            id={"front"}
                                                            onSelect={e=>setDocuments({...documents,front:e})}
                                                            title={"Upload a photo of the first spread or passport/ID card front side."}
                                                        />

                                                    </div>
                                                    <div className={`col-12 col-md-6 ${error("front")}`}>
                                                        <UploadDoc
                                                            id={"back"}
                                                            onSelect={e=>setDocuments({...documents,back:e})}
                                                            title={"Upload a photo of the first spread or passport/ID card front side."}
                                                        />
                                                    </div>

                                                    {/*<div className={"error-text"}>{t("error")}</div>*/}

                                                </div>

                                            </div>
                                        </div>
                                    </div>:null
                                }

                            </div>
                        </form>
                        <div className="col-12 col-md-4">
                            <div style={{color:`${status.status ==="success"? 'green':'red'}`}}>{status.msg}</div>
                            <button type="submit" style={{width:'100%'}} className="btn-primary" onClick={()=>{
                                if(step===1){
                                    console.log(1111,infoData);
                                    nextStep();
                                }else{
                                    finishStep();
                                }
                            }}>{t("Confirm And Continue")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Confirmation;
