import React from 'react';
import styles from '@/styles/components/filters-list.module.scss'
const FiltersList = () => {
    return (
        <form className={styles.filters_form}>
            <ul className={styles.filters_list}>
                <select>
                    <option>Tỉnh/Thành Phố</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <select>
                    <option>Tỉnh/Thành Phố</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <select>
                    <option>Tỉnh/Thành Phố</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <select>
                    <option>Tỉnh/Thành Phố</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </ul>
            <div className={styles.footer_filters}>
            <p>Xóa Lựa Chọn</p>
            <button>Lọc Tìm Kiếm</button>
            </div>
        </form>
    );
};

export default FiltersList;