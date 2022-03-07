import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import { defaultValidateMessages } from '../locales/Validation';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 6 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 14 },
	},
};

const ClientCreate = () => {
	const textConfig = {
		rules: [{ type: 'string', required: true, message: 'Escriba un texto válido!' }],
	};
	const dateConfig = {
		rules: [{ type: 'object', required: true, message: 'Seleccione una fecha válida!' }],
	};

	const onFinish = async (fieldsValue) => {
		const values = {
			...fieldsValue,
			nombres: fieldsValue['nombres'],
			apellidos: fieldsValue['apellidos'],
			nacimiento: fieldsValue['nacimiento'].format('YYYY/MM/DD'),
		};
		const request = {
			method: 'POST',
			headers: { Accept: '*/*', 'Content-Type': 'application/json' },
			body: JSON.stringify(values),
		};
		const resp = await fetch('http://localhost:5050/crear_cliente', request);
		const json = await resp.json();
		console.log('Received values of form: ', json);
	};

	return (
		<>
			<Form className="h-max w-full max-w-md" onFinish={onFinish} validateMessages={defaultValidateMessages} {...formItemLayout}>
				<Form.Item name="nombres" label="Nombres" hasFeedback {...textConfig}>
					<Input placeholder="Digite sus nombres" id="nombres" />
				</Form.Item>

				<Form.Item name="apellidos" label="Apellidos" hasFeedback {...textConfig}>
					<Input placeholder="Digite sus apellidos" id="apellidos" />
				</Form.Item>

				<Form.Item name="nacimiento" label="Nacimiento" hasFeedback {...dateConfig}>
					<DatePicker placeholder="Seleccione una fecha" style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						xs: { span: 24, offset: 0 },
						sm: { span: 16, offset: 8 },
					}}
				>
					<Button className="text-slate-900" type="primary" htmlType="submit">
						Registrarse
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default ClientCreate;
