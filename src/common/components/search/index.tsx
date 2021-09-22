import React from 'react';
import PropTypes from 'prop-types';
import styles from './search.module.scss'
import BaseIcon from '../Icon'

interface Props{
    placeholder?: string
}

const Search: React.FC<Props> = ({ placeholder } : Props) : JSX.Element => {
    return (
            <form>
                <div className={styles.searchBar}>
                    <input className={styles.searchInput} type="text" placeholder={placeholder} />
                    <button className={styles.searchButton} type="submit" value="Tìm Kiếm">
                        <BaseIcon className="material-icons-outlined" icon="search" variant="outlined"></BaseIcon>
                    </button>
                </div>
            </form>
    );
}

// Search.propTypes = {
//     placeholder: PropTypes.string
// }

// Search.defaultProps = {
//     placeholder: ''
// }

export default Search;