import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import styles from './searchaddress.module.scss';
import SearchBox from '@/components/SearchBox';
import { useTranslation } from 'react-i18next';

const SearchAddressTab = () => {
    const { t: translation } = useTranslation();
    return (
        <>
            <SearchBox placeholder={translation("baseSearchBox.placeHolder.timTheoDiaChi")}></SearchBox>
            <div className={styles["dropdown-list-location"]}>
                <DropdownButton id={styles["dropdown-basic-button"]} variant="" title="Tỉnh / Thành Phố">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id={styles["dropdown-basic-button"]} variant="" title="Quận / Huyện">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id={styles["dropdown-basic-button"]} variant="" title="Xã / Phường">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
            </div>
        </>
    );
}

export default SearchAddressTab;