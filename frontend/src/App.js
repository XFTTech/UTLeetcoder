import React from 'react';
import { Layout } from 'antd';
import SideBar from './component/SideBar';
import { Outlet } from 'react-router-dom';
const { Footer } = Layout;


const App = () => {
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <SideBar />
            <Layout className="site-layout">
                
                <Outlet/>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    UTLeetcoder ©2022 Created by <a href="https://github.com/Ethan-ZYF">Ethan-ZYF</a>, <a href="
                        https://github.com/zhuyuezx">zhuyuezx</a>, and <a href="https://github.com/Yorafa">Yorafa</a>
                </Footer>
            </Layout>
        </Layout>
    );
};
export default App;