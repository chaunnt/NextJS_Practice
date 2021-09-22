import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './logo.module.scss';


interface Props{
    placeholder?: string
}

const Logo: React.FC<Props> = ({ placeholder } : Props) : JSX.Element => {
    return (
        <>
            <div className={styles.hodaceNetwork__logo}>
                <Link href="/">
                    <a >
                        <span>Hodace</span>
                        <p>Network</p>
                    </a>
                </Link>
            </div>
            <div className={styles.hodaceNetwork__slogan}>
                <p>{placeholder}</p>
            </div>
        </>
    );
}

export default Logo;