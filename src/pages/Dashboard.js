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
			<p
				className="text-base font-semibold"
				style={{
					color: color,
				}}
			>
				{currentValue}
			</p>
		);
	};

	useEffect(() => {
		(async function () {
			let resp = await fetch('https://knox-fullstack-back.herokuapp.com/clientes', { method: 'GET' });
			let json = await resp.json();
			json.data.forEach((val, i, arr) => {
				const { nacimiento, ...rest } = val;
				arr[i] = { ...rest, edad: date(date.now()).diff(nacimiento, 'years') };
			});
			setData(json.data);
			console.log('[llamada de api] - lista de todos los clientes', json.data);
		})();
	}, []);

	return (
		<>
			<Row className="w-full max-w-2xl" justify="space-around" gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 32]}>
				<Col>
					<CircularGauge value={data.filter((dat) => dat.edad <= 18).length} centerRender={centerRenderer} />
					<p className="text-base font-semibold">Clientes hasta los 18 años</p>
				</Col>
				<Col>
					<CircularGauge value={data.filter((dat) => dat.edad > 18).length} centerRender={centerRenderer} />
					<p className="text-base font-semibold">Clientes después de los 18 años</p>
				</Col>
			</Row>
      <Row>
        env var {process.env.KENDO_UI_LICENSE}
      </Row>
		</>
	);
};

export default Dashboard;
