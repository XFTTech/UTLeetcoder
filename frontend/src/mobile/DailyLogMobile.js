import React from 'react'
import { CapsuleTabs } from 'antd-mobile'


const Tabs = () => {
    return (
        <>
            <CapsuleTabs
                defaultActiveKey='total'
            >
                <CapsuleTabs.Tab title='Easy' key='easy'>
                    easy
                </CapsuleTabs.Tab>
                <CapsuleTabs.Tab title='Medium' key='medium'>
                    medium
                </CapsuleTabs.Tab>
                <CapsuleTabs.Tab title='Hard' key='hard'>
                    hard
                </CapsuleTabs.Tab>
                <CapsuleTabs.Tab title='Total' key='total'>
                    total
                </CapsuleTabs.Tab>
            </CapsuleTabs>
        </>
    )
};

export default Tabs