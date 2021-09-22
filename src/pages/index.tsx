import React, { useEffect } from 'react'
import DefaultLayout from 'src/frameworks/layouts/default'
import { useTranslation } from 'react-i18next'
import styles from '@/styles/pages/home.module.scss'
import FiltersList from '@/components/FiltersList'

export default function Landing(props: any) {
  const { t:translation } = useTranslation()

  return (
    <DefaultLayout>
        <div className={styles.navbar}>
          <header className={styles.header}>
            <div className={styles.header_logo}>
              <p className={styles.header_logo_hodance}>
                HODANCE
              </p>
              <p className={styles.header_logo_network}>
                  network
              </p>
            </div>
            <div className={styles.header_search}>
              <i className={styles.header_search_icon}>i</i>
            </div>
          </header>
          <ul className={styles.lists}> {/* select add class list_item_active */}
            <li className={styles.list_item_active}>Tất cả</li>
            <li>Tất cả</li>
            <li>Tất cả</li>
            <li>Tất cả</li>
            <li>Tất cả</li>
            <li>Tất cả</li>
            <li>Tất cả</li>
            <li>Tất cả</li>
            <li>Tất cả</li>
            <li>Tất cả</li>
          </ul>
          <div className={styles.options}>
            <div className={styles.options_search}>
              <label htmlFor="filters-show" className={styles.options_filter}>
                <i className={styles.content_item_evaluation_icon}>i</i>
                <p>Bộ lọc (4)</p>
              </label>
              <div className={styles.options_sort}>
                <p>Sắp xếp theo: </p>
                <p className={styles.options_sort_select}> Mới nhất <i className={styles.content_item_evaluation_icon}>i</i></p>
                {/* <ul>
                  <li></li>
                </ul> */}
            </div>
            </div>
            <div className={styles.result}>
              <p>Tìm kiếm được: 8,123,342 kết quả</p>
            </div>
          </div>
        </div>
        <div className={styles.wrap_contents}>
            <ul className={styles.contents}>
                   <li className={styles.content_item}>
                    <span className={styles.content_item_title}>
                      [ Môi giới ][ Rao bán ] Huyện Hoài Đức, Xã An Khánh, Sổ hồng riêng, Đất, ngang 4.0m, 1 tầng, Giá 50 triệu,
                    </span>
                    <ul className={styles.content_item_evaluations}>
                        <li className={styles.content_item_evaluation}>
                            <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                            <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                        <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                             <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                            <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                    </ul>
                    <p className={styles.content_item_description}>
                        <p className={styles.content_item_description_time}>11 hours ago --</p>
                        <p className={styles.content_item_description_content}>Huyện Hoài Đức,Thành phố Hà Nội,Đất,Xã An Khánh,1Tầng,Loại giấy tờ pháp lý Sổ hồng riêng,Chiều ngang 4.0m,Đường trước nhà 4.5m... </p>
                    </p>
                </li>
                    
            </ul>
            <ul className={styles.contents}>
                   <li className={styles.content_item}>
                    <span className={styles.content_item_title}>
                      [ Môi giới ][ Rao bán ] Huyện Hoài Đức, Xã An Khánh, Sổ hồng riêng, Đất, ngang 4.0m, 1 tầng, Giá 50 triệu,
                    </span>
                    <ul className={styles.content_item_evaluations}>
                        <li className={styles.content_item_evaluation}>
                            <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                            <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                        <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                             <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                            <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                    </ul>
                    <p className={styles.content_item_description}>
                        <p className={styles.content_item_description_time}>11 hours ago --</p>
                        <p className={styles.content_item_description_content}>Huyện Hoài Đức,Thành phố Hà Nội,Đất,Xã An Khánh,1Tầng,Loại giấy tờ pháp lý Sổ hồng riêng,Chiều ngang 4.0m,Đường trước nhà 4.5m... </p>
                    </p>
                </li>
                    
            </ul>
            <ul className={styles.contents}>
                   <li className={styles.content_item}>
                    <span className={styles.content_item_title}>
                      [ Môi giới ][ Rao bán ] Huyện Hoài Đức, Xã An Khánh, Sổ hồng riêng, Đất, ngang 4.0m, 1 tầng, Giá 50 triệu,
                    </span>
                    <ul className={styles.content_item_evaluations}>
                        <li className={styles.content_item_evaluation}>
                            <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                            <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                        <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                             <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                            <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                    </ul>
                    <p className={styles.content_item_description}>
                        <p className={styles.content_item_description_time}>11 hours ago --</p>
                        <p className={styles.content_item_description_content}>Huyện Hoài Đức,Thành phố Hà Nội,Đất,Xã An Khánh,1Tầng,Loại giấy tờ pháp lý Sổ hồng riêng,Chiều ngang 4.0m,Đường trước nhà 4.5m... </p>
                    </p>
                </li>
                    
            </ul>
            <ul className={styles.contents}>
                   <li className={styles.content_item}>
                    <span className={styles.content_item_title}>
                      [ Môi giới ][ Rao bán ] Huyện Hoài Đức, Xã An Khánh, Sổ hồng riêng, Đất, ngang 4.0m, 1 tầng, Giá 50 triệu,
                    </span>
                    <ul className={styles.content_item_evaluations}>
                        <li className={styles.content_item_evaluation}>
                            <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                            <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                        <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                             <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                            <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                    </ul>
                    <p className={styles.content_item_description}>
                        <p className={styles.content_item_description_time}>11 hours ago --</p>
                        <p className={styles.content_item_description_content}>Huyện Hoài Đức,Thành phố Hà Nội,Đất,Xã An Khánh,1Tầng,Loại giấy tờ pháp lý Sổ hồng riêng,Chiều ngang 4.0m,Đường trước nhà 4.5m... </p>
                    </p>
                </li>
                    
            </ul>
            <ul className={styles.contents}>
                   <li className={styles.content_item}>
                    <span className={styles.content_item_title}>
                      [ Môi giới ][ Rao bán ] Huyện Hoài Đức, Xã An Khánh, Sổ hồng riêng, Đất, ngang 4.0m, 1 tầng, Giá 50 triệu,
                    </span>
                    <ul className={styles.content_item_evaluations}>
                        <li className={styles.content_item_evaluation}>
                            <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                            <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                        <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                             <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                        <li className={styles.content_item_evaluation}>
                            <i className={styles.content_item_evaluation_icon}>i</i>
                            <p>999</p>
                        </li>
                    </ul>
                    <p className={styles.content_item_description}>
                        <p className={styles.content_item_description_time}>11 hours ago --</p>
                        <p className={styles.content_item_description_content}>Huyện Hoài Đức,Thành phố Hà Nội,Đất,Xã An Khánh,1Tầng,Loại giấy tờ pháp lý Sổ hồng riêng,Chiều ngang 4.0m,Đường trước nhà 4.5m... </p>
                    </p>
                </li>
            </ul>
        </div>
        <div className={styles.footer}>
          <a href="#" className={styles.footer_item}>
            <i className={styles.content_item_evaluation_icon}>i</i>
            <p>Rao bán</p>
          </a>
          <a href="#" className={styles.footer_item}>
            <i className={styles.content_item_evaluation_icon}>i</i>
            <p>Cho thuê</p>
          </a>
          <a href="#" className={styles.footer_item}>
            <i className={styles.content_item_evaluation_icon}>i</i>
            <p>Liên hệ</p>
          </a>
        </div>
        <input type="checkbox" id="filters-show" className={styles.filters_show} />
        <div className={styles.wrap_filters}>
          <div className={styles.filters}>
                <div className={styles.filters_header}>
                  <label htmlFor="filters-show">
                    <i className={styles.filters_header_icon}>i</i>
                  </label>
                  <header>Bộ lọc</header>
                </div>
                <FiltersList />
          </div>
        </div>
    </DefaultLayout>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {},
  }
}
