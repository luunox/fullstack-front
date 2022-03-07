import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import date from 'moment';
import { CircularGauge } from '@progress/kendo-react-gauges';

const Dashboard = () => {
	const [data, setData] = useState([]);
	const gaugeStyles = {
		display: 'block',
	};

	const centerRenderer = (currentValue, color) => {
		return (
			<h3
				style={{
					color: color,
				}}
			>
				{currentValue}
			</h3>
		);
	};

	useEffect(() => {
		(async function () {
			const request = {
				method: 'GET',
			};
			let resp = await fetch('https://knox-fullstack-back.herokuapp.com/clientes', request);
			let json = await resp.json();
			json.data.forEach((val, i, arr) => {
				const { nacimiento, ...rest } = val;
				arr[i] = { ...rest, edad: date(date.now()).diff(nacimiento, 'years') };
			});
			setData(json.data);
			console.log('[llamada de api] - lista de todos los clientes', json.data[0]);
		})();
	}, []);

	return (
		<>
			<Row className="min-w-full h-40 justify-around">
				<Col>
					<CircularGauge style={gaugeStyles} value={data.filter((dat) => dat.edad <= 18).length} centerRender={centerRenderer} />
					<p className="text-base font-semibold">Clientes hasta los 18 años</p>
				</Col>
				<Col>
					<CircularGauge style={gaugeStyles} value={data.filter((dat) => dat.edad > 18).length} centerRender={centerRenderer} />
					<p className="text-base font-semibold">Clientes después de los 18 años</p>
				</Col>
			</Row>
		</>
	);
};

export default Dashboard;
