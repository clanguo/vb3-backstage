import { Button, Checkbox, Form, Input } from 'antd';
import React, { Component, Dispatch } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export interface ILoginForm {
	onSubmit(form: any): void;
}

const LoginForm: React.FC<ILoginForm> = props => {
	return (
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{ remember: true }}
			size="large"
			onFinish={props.onSubmit}
		>
			<Form.Item
				name="account"
				rules={[
					{
						required: true,
						message: '用户名不能为空',
					},
					{
						max: 10,
						message: '用户名不能超过10位',
					},
					{
						min: 3,
						message: '用户名不能小于3位',
					},
				]}
			>
				<Input
					prefix={<UserOutlined className="site-form-item-icon" />}
					placeholder="请输入用户名"
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						required: true,
						message: '密码不能为空',
					},
					{
						max: 16,
						message: '用户名不能超过16位',
					},
					{
						min: 4,
						message: '用户名不能小于4位',
					},
				]}
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="请输入密码"
				/>
			</Form.Item>
			<Form.Item>
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<Checkbox>记住我？</Checkbox>
				</Form.Item>
			</Form.Item>

			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					className="login-form-button"
				>
					登录
				</Button>
			</Form.Item>
		</Form>
	);
};

export default LoginForm;
