import React, { useEffect, useState } from 'react';
import PropTypes, { string } from 'prop-types';
import Logo from '../../common/components/logo'
import Tabs from '@/components/tabs';

const Contacts = (): JSX.Element => {
    const [data, setData] = useState();
    const [render, setRender] = useState('props.path');
    
    return (
        <>
            <Logo></Logo>
            <Tabs />
        </>
    );
}

export default Contacts;