import React from 'react';
import styles from './searchbox.module.scss'
import BaseIcon from '../Icon'

interface BaseSearchBoxProps {
    placeholder?: string,
    className?: string
}

const BaseSearchBox = (props: BaseSearchBoxProps) => {
    const { placeholder, className } = props;
    return (
        <form>
            <div className={`${styles["search-bar"]} ${className}`}>
                <input className={styles["search-input"]} type="text" placeholder={placeholder ? placeholder : ''} />
                <button className={styles["search-button"]} type="submit" value="Tìm Kiếm">
                    <BaseIcon className={styles["material-icons-outlined"]} icon="search" variant="outlined"></BaseIcon>
                </button>
            </div>
        </form>
    );
}

export default BaseSearchBox;