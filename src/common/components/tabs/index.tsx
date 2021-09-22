import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './tabs.module.scss'
import SearchAddressTab from './searchAddress';
import SearchPhoneTab from './searchPhone';

const Tabs: React.FC<any> = ({ ...props }): JSX.Element => {
    const [changedTabs, setChangedTabs] = useState('phone_tab');
    const [renderTabs, setRenderTabs] = useState(<div>search Phone</div>);
    let listTabs = [
        { name: 'phone_tab', active: false, title: 'Tìm theo số điện thoại', template: <SearchPhoneTab /> },
        { name: 'address_tab', active: false, title: 'Tìm theo địa chỉ', template: <SearchAddressTab /> },
    ];
    const [active, setActive] = useState(listTabs);

    useEffect(() => {
        active.map((value, index) => {
            if (value.name === changedTabs) {
                setRenderTabs(value.template);
                value.active = true
            }
            else {
                value.active = false;
            }
        })
    }, [changedTabs]);

    function handleChange(name: string) {
        setChangedTabs(name)
    }

    return (
        <>
            {console.log('render')}
            <div className={styles.sub_tabs}>
                {
                    active.map((value, index) => {
                        return <div key={value.name} className={styles.underline}>
                            <a className={value.active ? styles.active_tab : ''} onClick={() => handleChange(value.name)}>{value.title}</a>
                        </div>
                    })
                }
            </div>
            {renderTabs}
        </>
    );
}

// Tabs.propTypes = {
//     handleClicked: PropTypes.func
// };

// Tabs.defaultProps = {
//     handleClick: () => { },
// }

export default Tabs;