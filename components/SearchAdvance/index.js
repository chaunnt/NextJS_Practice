import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { buildPathnameForListPage } from '../../utils/urlUtils';
import AreaSearchAdvance from './AreaSearchAdvance';
import OtherMetaSearchAdvance from './OtherMetaSearchAdvance';
import { resetFiltersAction, SearchAdvanceContext, setFiltersAction } from './SearchAdvanceContext';

const formatFilters = (objFilter) => {
  const newFilter = {}
  Object.entries(objFilter).forEach(([key,val]) => {
    if(typeof val === 'object'){
      Object.entries(val).forEach(([subKey, subVal]) =>{
        newFilter[key+'_'+subKey] =subVal
      })
    }
    else{
      newFilter[key] =val
    }
  })
  
  return newFilter
}
const SearchAdvance = ({ isShow = false } = props) => {
  const router = useRouter();
  const [state, dispatch] = useContext(SearchAdvanceContext);

  useEffect(() => {
    if (isShow && router.query) {
      dispatch(setFiltersAction(router.query));
    }
  }, [isShow]);

  return (
    <div>
      <AreaSearchAdvance isShow={isShow} />
      <OtherMetaSearchAdvance isShow={isShow} />
      <button
        style={{ color: '#fff' }}
        className="btn my-2"
        onClick={() => {
          router.push({
            pathname: buildPathnameForListPage(formatFilters(state.filters)),
            query: { ...formatFilters(state.filters) },
          });
        }}
      >
        Tìm kiếm
      </button>
      <button
        style={{ color: '#fff', marginLeft: '10px' }}
        className="btn my-2"
        onClick={() => {
          dispatch(resetFiltersAction());
          router.push({
            pathname: `/`,
          });
        }}
      >
        Xóa bộ lọc
      </button>
    </div>
  );
};
export default SearchAdvance;
