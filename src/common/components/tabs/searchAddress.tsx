import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import styles from './searchAddress.module.scss'
import SearchBar from '@/components/search';

function SearchAddressTab() : JSX.Element {
    return (
        <>
            <SearchBar placeholder="Nhập tìm kiếm liên hệ theo địa chỉ"></SearchBar>
            <div className={styles.dropdownList__location}>
                <DropdownButton id="dropdown-basic-button" variant="" title="Tỉnh / Thành Phố">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" variant="" title="Quận / Huyện">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" variant="" title="Xã / Phường">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
            </div>
        </>
    );
}

// SearchAddressTab.propTypes = {

// };

export default SearchAddressTab;