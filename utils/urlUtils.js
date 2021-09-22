import { QUERY_KEY } from '../components/SearchAdvance/constants';
import { removeVietnameseAccent } from './common';

const customizeUrlWithMaxLengthUrl = (pathname, queryObj, suffix, maxLengthUrl = 1800) => {
  const maxLengthOfRoute =
    maxLengthUrl -
    (new URLSearchParams(queryObj).toString().length + 1) - // 1 for ? character
    (suffix ? suffix.length : 0);

  if (maxLengthOfRoute <= 0) {
    return '';
  }

  const customizePathname = pathname.split('/').reduce((path, el) => {
    if (el.length === 0 || path.length + el.length > maxLengthOfRoute) {
      return path;
    }
    return (path += `/${el}`);
  }, '');
  return customizePathname;
};

export const buildPathnameForListPage = (queryObj, needToCustom = true) => {
  const areaQueryKeys = [QUERY_KEY.PROVINCE, QUERY_KEY.DISTRICT, QUERY_KEY.WARD];
  let path = '';

  areaQueryKeys.forEach((key) => {
    if (queryObj[key]) {
      path += `/${removeVietnameseAccent(queryObj[key])}`;
    }
  });

  Object.keys(queryObj).forEach((key) => {
    if (areaQueryKeys.indexOf(key) < 0 && queryObj[key] && key !== 'language') {
      path += `/${removeVietnameseAccent(queryObj[key])}`;
    }
  });

  if (path.length <= 0) {
    return '/';
  }

  if (needToCustom) {
    const pathname = customizeUrlWithMaxLengthUrl(path.replace(/\s/g, '-'), queryObj, '/list');
    return `${pathname}/list`;
  } else {
    return `${path.replace(/\s/g, '-')}/list`;
  }
};

export const buildPathnameForDetailPage = (queryObj, id) => {
  let pathname = customizeUrlWithMaxLengthUrl(buildPathnameForListPage(queryObj, false), queryObj, '/detail');
  if (pathname.indexOf('/list') > 0) {
    pathname = pathname.replace('/list', `/detail/${id}`);
  } else {
    pathname = `/detail/${id}`;
  }
  return pathname;
};
