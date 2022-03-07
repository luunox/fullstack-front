import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined, DashboardOutlined, OrderedListOutlined, UserAddOutlined } from '@ant-design/icons';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import DashBoard from './Dashboard';
import ClientList from './ClientsList';
import ClientCreate from './ClientCreate';

const { Header, Sider, Content } = Layout;

const Home = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [contentWidth, setContentWidth] = useState(200);
	const [collapsed, setCollapsed] = useState(false);

	const toggle = () => setCollapsed(!collapsed);
	useEffect(() => setContentWidth(collapsed ? 80 : 200), [collapsed]);

	return (
		<Layout className="h-full bg-slate-300" hasSider>
			<Sider className="bg-slate-300 fixed left-0 top-0 right-0 bottom-0 z-10" collapsible collapsed={collapsed} trigger={null} width={200} collapsedWidth={80}>
				<div className="logo" />
				<Menu className="bg-slate-300 border-0" mode="vertical" defaultSelectedKeys={[location.pathname]}>
					<Menu.Item key="/" icon={<DashboardOutlined />} onClick={() => navigate('/')}>
						DashBoard
					</Menu.Item>
					<Menu.Item key="/create_client" icon={<UserAddOutlined />} onClick={() => navigate('/create_client')}>
						Crear cliente
					</Menu.Item>
					<Menu.Item key="/list_clients" icon={<OrderedListOutlined />} onClick={() => navigate('/list_clients')}>
						Lista de clientes
					</Menu.Item>
				</Menu>
			</Sider>

			<Layout className="bg-slate-200 transition-spacing ease-in-out delay-[0ms] duration-[180ms]" style={{ marginLeft: contentWidth + 'px' }}>
				<Header className="bg-slate-300 px-5">
					{React.createElement(!collapsed ? ArrowLeftOutlined : ArrowRightOutlined, {
						className: 'trigger ',
						onClick: toggle,
					})}
				</Header>
				<Content className="relative flex flex-col justify-center items-center site-layout-background overflow-x-hidden overflow-y-auto h-screen min-h-[280px] p-6">
					<Routes>
						<Route path="/" element={<DashBoard />} />
						<Route path="/create_client" element={<ClientCreate />} />
						<Route path="/list_clients" element={<ClientList contentWidth={contentWidth} />} />
					</Routes>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Home;
