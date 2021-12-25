import { Button, Checkbox, Form, Input, Spin } from 'antd';
import React, { Component, Dispatch, useEffect } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.sass';
import { connect } from 'react-redux';
import { IState } from '../../redux/reducers';
import AdminActions from '../../redux/actions/AdminActions';
import { replace, RouterState } from 'connected-react-router';
import { IAdminState } from '../../redux/reducers/AdminReducers';

function mapDispatchToProps(dispatch: Dispatch<any>) {
	return {
		onSubmit(form: any) {
			dispatch(AdminActions.loginAdmin(form));
		},

		backToUrlPage(url: string) {
			dispatch(replace(url));
		}
	};
}

function mapStateToProps(state: IState) {
	return {
		isLoading: state.admin.isLoading,
		account: state.admin.account,
		router: state.router
	};
}

interface ILogin {
	onSubmit(form: any): void;
	backToUrlPage(url: string): void;
	isLoading: boolean;
	account: string | null;
	router: RouterState
}

const Login: React.FC<ILogin> = props => {
	const formDom = (
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

	useEffect(() => {
		if (props.account) {
			props.backToUrlPage(props.router.location.query.url || "/");
		}
	}, [props.account])

	return (
		<div className="login-container">
			<div className="wrapper">{formDom}</div>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
