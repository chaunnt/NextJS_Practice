import React, { useEffect, useState } from 'react';
import BaseLogo from '../../frameworks/components/Logo'
import TabsControl from '@/components/TabsControl';
import { useTranslation } from 'react-i18next';
import { listTabs } from '@/constants/common'

const Contacts = () => {
    const {t: translation} = useTranslation();
    return (
        <>
            <BaseLogo customClass=""></BaseLogo>
            <div className="hodace-network-slogan">
                <p>{translation('baseLogo.slogan')}</p>
            </div>
            <TabsControl listTabs={listTabs} className="tab-items"/>
        </>
    );
}

export default Contacts;