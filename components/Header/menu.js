import { Container, Toolbar } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { pathKeys } from '../../constants';
import { buildPathnameForListPage } from '../../utils/urlUtils';

const Menu = ({ menus, combineQuery }) => {
  const router = useRouter();
  const newAsPath = decodeURI(router.asPath);

  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);

  useEffect(() => {
    if (selectedMenuIndex === null) {
      setSelectedMenuIndex(
        menus
          ? menus.findIndex((m) => {
              return newAsPath.indexOf(m.name.replace(' ', '+')) >= 0;
            })
          : null,
      );
    }
  }, [newAsPath, selectedMenuIndex]);

  const getHref = (menuItem) => {
    let pathName = menuItem.pathName;
    if (!combineQuery || pathName === pathKeys.ROOT) {
      return pathName;
    }
    const clonedQuery = { ...router.query };
    if (Object.keys(clonedQuery).length === 0) {
      return pathName;
    }
    // delete query element
    for (let i = 0; i < menus.length; i++) {
      const queryEls = menus[i].pathName.replace(/[/|?]/gi, '').split('=');
      if (queryEls.length === 0) {
        continue;
      }
      if (clonedQuery[`${queryEls[0]}`]) {
        delete clonedQuery[`${queryEls[0]}`];
      }
    }

    const queryEls = pathName.replace(/[/|?]/gi, '').split('=');
    if (queryEls.length === 0) {
      return pathName;
    }
    pathName = `${buildPathnameForListPage(clonedQuery)}`;
    clonedQuery[`${queryEls[0]}`] = queryEls[1];
    if (pathName !== menuItem.pathName) {
      return {
        pathname: pathName,
        query: clonedQuery,
      };
    }
    return pathName;
  };

  if (!menus || menus.length === 0) {
    return null;
  }

  return (
    <Container className="header-wrapper__container">
      <Toolbar className="toolBar">
        {menus.map((item, index) => {
          return (
            <Link key={index} href={getHref(item)} shallow={true}>
              <a
                style={{ marginLeft: item.pathName !== pathKeys.ROOT && index !== 0 ? '20px' : '' }}
                className={`item-menu ${
                  ((selectedMenuIndex !== null && index === selectedMenuIndex) || newAsPath === item.pathName) &&
                  item.pathName !== '/'
                    ? 'item-menu__active'
                    : ''
                }`}
                key={`${index}`}
                onClick={() => setSelectedMenuIndex(index)}
              >
                {item.pathName === pathKeys.ROOT ? (
                  <>
                    <span>
                      <svg width={20} height={20} focusable="false" viewBox="0 0 24 24">
                        <path fill="#34a853" d="M10 2v2a6 6 0 0 1 6 6h2a8 8 0 0 0-8-8" />
                        <path fill="#ea4335" d="M10 4V2a8 8 0 0 0-8 8h2c0-3.3 2.7-6 6-6" />
                        <path fill="#fbbc04" d="M4 10H2a8 8 0 0 0 8 8v-2c-3.3 0-6-2.69-6-6" />
                        <path
                          fill="#4285f4"
                          d="M22 20.59l-5.69-5.69A7.96 7.96 0 0 0 18 10h-2a6 6 0 0 1-6 6v2c1.85 0 3.52-.64 4.88-1.68l5.69 5.69L22 20.59"
                        />
                      </svg>
                    </span>
                    <span> {item.name}</span>
                  </>
                ) : (
                  <> {item.name}</>
                )}
              </a>
            </Link>
          );
        })}
      </Toolbar>
    </Container>
  );
};

export default Menu;
