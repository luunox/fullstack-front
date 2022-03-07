import date, { now } from 'moment';
import Highlighter from 'react-highlight-words';
import React, { useEffect, useState } from 'react';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Drawer, Input, Row, Space, Table } from 'antd';

date.locale('es');

const ClientList = () => {
	const [data, setData] = useState([]);
	const [client, setClient] = useState({});
	const [config, setConfig] = useState({});
	const [promedio, setPromedio] = useState(0);
	const [searchInput, setSearchInput] = useState({});
	const [drawerVisible, setDrawerVisible] = useState(false);

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					className="block mb-2"
					ref={setSearchInput}
					value={selectedKeys[0]}
					placeholder={`Buscar ${dataIndex}`}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
				/>
				<Space>
					<Button
						className="bg-sky-400 text-slate-900 flex items-center justify-center"
						size="small"
						type="primary"
						style={{ width: 90 }}
						icon={<SearchOutlined />}
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
					>
						Buscar
					</Button>
					<Button className="text-slate-900 flex items-center justify-center" onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
						Limpiar
					</Button>
					<Button
						className="text-cyan-500 hover:text-blue-600"
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							setConfig({ ...config, searchText: selectedKeys[0], searchedColumn: dataIndex });
						}}
					>
						Filtrar
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) => (record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : ''),
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => !!searchInput && searchInput.select(), 100);
			}
		},
		render: (text) =>
			config.searchedColumn === dataIndex ? (
				<Highlighter highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }} searchWords={[config.searchText]} autoEscape textToHighlight={text ? text.toString() : ''} />
			) : (
				text
			),
	});

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setConfig({ ...config, searchText: selectedKeys[0], searchedColumn: dataIndex });
	};

	const handleReset = (clearFilters) => {
		clearFilters();
		setConfig({ ...config, searchText: '' });
	};

	const tableColumns = [
		{
			title: 'Nombres',
			dataIndex: 'nombres',
			...getColumnSearchProps('nombres'),
		},
		{
			title: 'Apellidos',
			dataIndex: 'apellidos',
			...getColumnSearchProps('apellidos'),
		},
		{
			title: 'Edad',
			dataIndex: 'nacimiento',
			showSorterTooltip: { title: 'Click para cambiar el orden' },
			render: (e) => date(now()).diff(e, 'years'),
			sorter: (a, b) => date(now()).diff(a.nacimiento, 'years') - date(now()).diff(b.nacimiento, 'years'),
		},
		{
			title: 'Action',
			key: 'action',
			sorter: false,
			render: (data) => {
				return (
					<Space size="middle">
						{/* <button className="text-cyan-500 hover:text-blue-600">Delete</button> */}
						<button
							className="flex items-center text-cyan-500 hover:text-blue-600"
							onClick={() => {
								setClient(data);
								setDrawerVisible(true);
							}}
						>
							Mas datos &nbsp; <RightOutlined />
						</button>
					</Space>
				);
			},
		},
	];

	const ShortDescription = ({ title, content }) => (
		<Row>
			<Col className="mb-1.5 text-sm font-bold" flex="100px">
				{title}:
			</Col>
			<Col className="font-semibold" flex="auto">
				{content}
			</Col>
		</Row>
	);

	const LongDescription = ({ title, content }) => (
		<Row wrap={false}>
			<Col className="mb-1.5 text-sm font-bold" flex="100px">
				{title}:
			</Col>
			<Col className="font-semibold" flex="auto">
				{content}
			</Col>
		</Row>
	);

	useEffect(() => {
		(async function () {
			const request = {
				method: 'GET',
			};
			let resp = await fetch('http://localhost:5050/clientes', request);
			let json = await resp.json();
			json.data.forEach((val, i, arr) => {
				const { id, ...rest } = val;
				arr[i] = { ...rest, key: id };
			});
			setData(json.data);

			resp = await fetch('http://localhost:5050/promedio_edades', request);
			json = await resp.json();
			setPromedio(json.data);
		})();
	}, []);

	return (
		<>
			<Table
				size="middle"
				loading={false}
				bordered={false}
				dataSource={data}
				columns={tableColumns}
				scroll={{ y: '400px' }}
				pagination={{ position: ['none', 'bottomRight'] }}
				footer={() => <>Promedio de edades: {promedio}</>}
			/>
			<br />
			<Drawer
				width={600}
				closable={false}
				getContainer={false}
				placement="right"
				title={<p className="block text-lg font-bold">Datos del cliente</p>}
				visible={drawerVisible}
				style={{ position: 'absolute' }}
				onClose={() => setDrawerVisible(false)}
			>
				<p className="block mb-4 text-base font-bold">Personal</p>
				<Row>
					<Col span={12}>
						<ShortDescription title="Nombres" content={client.nombres} />
					</Col>
					<Col span={12}>
						<ShortDescription title="Apellidos" content={client.apellidos} />
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<ShortDescription title="City" content="HangZhou" />
					</Col>
					<Col span={12}>
						<ShortDescription title="Country" content="China🇨🇳" />
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<ShortDescription title="Birthday" content={date(client.nacimiento).format('DD/MM/YYYY')} />
					</Col>
					<Col span={12}>
						<ShortDescription title="Email" content="AntDesign@example.com" />
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<LongDescription title="Message" content="Make things as simple as possible but no simpler." />
					</Col>
				</Row>
				<Divider />
				<p className="block mb-4 text-base font-bold">Company</p>
				<Row>
					<Col span={12}>
						<ShortDescription title="Position" content="Programmer" />
					</Col>
					<Col span={12}>
						<ShortDescription title="Job Type" content="Coding" />
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<ShortDescription title="Department" content="XTech" />
					</Col>
					<Col span={12}>
						<ShortDescription title="Supervisor" content={<a>Lin</a>} />
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<LongDescription
							title="Skills"
							content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
						/>
					</Col>
				</Row>
				<Divider />
				<p className="block mb-4 text-base font-bold">Contacts</p>
				<Row>
					<Col span={12}>
						<ShortDescription title="Email" content="AntDesign@example.com" />
					</Col>
					<Col span={12}>
						<ShortDescription title="Phone Number" content="+86 181 0000 0000" />
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<LongDescription title="Github" content={<a href="http://github.com/ant-design/ant-design/">github.com/ant-design/ant-design/</a>} />
					</Col>
				</Row>
			</Drawer>
		</>
	);
};

export default ClientList;
