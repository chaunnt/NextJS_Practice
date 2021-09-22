import styles from '@/styles/pages/nha-dat-ban.module.scss'
import { IconInvestmentValue, IconLandCovenience, IconNegativeInfo, Iconplaning, IconPosition, IconPositiveInfo, IconPostType, IconRentableValue } from "public/icons"
import React from 'react'
import { useTranslation } from 'react-i18next'

const Analysis: React.FC=()=> {
  const {t:translation} = useTranslation();
   
  return (
    <div className={styles.category}>
        <ul>
            <li><Iconplaning className={styles.icon_category}/> <span>{translation('realEstateForSale.land-planing')}</span></li>
            <li> <IconPosition className={styles.icon_category}/><span> {translation('realEstateForSale.land-position')}</span></li>
            <li><IconPostType className={styles.icon_category}/><span>{translation('realEstateForSale.systemPostType')}</span></li>
            <li><IconLandCovenience className={styles.icon_category}/><span> {translation('realEstateForSale.land-convenience')}</span></li>
            <li><IconInvestmentValue className={styles.icon_category}/><span>{translation('realEstateForSale.investmentValue')}</span></li>
            <li><IconRentableValue className={styles.icon_category}/><span>{translation('realEstateForSale.rentableValue')}</span></li>
            <li><IconPositiveInfo className={styles.icon_category}/><span>{translation('realEstateForSale.positiveInfo')}</span></li>
            <li><IconNegativeInfo className={styles.icon_category}/><span>{translation('realEstateForSale.negativeInfo')}</span></li>
        </ul>
    </div>
  )
}

export default Analysis;