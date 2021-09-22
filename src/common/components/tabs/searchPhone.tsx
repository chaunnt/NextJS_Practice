import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '@/components/search';

SearchPhoneTab.propTypes = {
    
};

function SearchPhoneTab() {
    return (
        <div>
             <SearchBar placeholder="Nhập tìm kiếm liên hệ theo số điện thoại"></SearchBar>
        </div>
    );
}

export default SearchPhoneTab;