import React, { useState, useEffect } from 'react';
import styles from './tabscontrol.module.scss'
import dynamic from 'next/dynamic'

interface TabsControlProps {
    className?: string;
    listTabs?: Array<ListTabsType>
}

type ListTabsType = {
    name: string,
    template: string,
    title: string
}

const TabsControl = (props: TabsControlProps) => {
    const { className, listTabs } = props;
    const [changedTabs, setChangedTabs] = useState('phone_tab');
    const [renderTabs, setRenderTabs] = useState(<></>);
    const [active, setActive] = useState(listTabs ? listTabs : []);

    useEffect(() => {
        active.map((value, index) => {
            if (value.name === changedTabs) {
                const DynamicComponent = dynamic(() => import(`@/layouts/Tabs/${value.template}.tsx`), { loading: () => <p>...</p> });
                setRenderTabs(<DynamicComponent />);
            }
        })
    }, [active, changedTabs]);

    return (
        <>
            <div className={`${styles["sub-tabs"]} ${className ? className : ''}`}>
                {
                    active.map((value, index) => {
                        return <div key={value.name} className={`${styles['underline']}`}>
                            <a className={value.name == changedTabs ? styles["active-tab"] : ''} onClick={() => setChangedTabs(value.name)}>{value.title}</a>
                        </div>
                    })
                }
            </div>
            {renderTabs}
        </>
    );
}

export default TabsControl;