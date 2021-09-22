import React from 'react';
import SearchBox from '@/components/SearchBox';
import { useTranslation } from 'react-i18next';

const SearchPhoneTab = () => {
    const { t: translation } = useTranslation();
    return (
        <>
             <SearchBox placeholder={translation("baseSearchBox.placeHolder.timTheoDiaChi")}></SearchBox>
        </>
    );
}

export default SearchPhoneTab;