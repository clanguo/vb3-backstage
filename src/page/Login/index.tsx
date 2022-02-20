import { Button, Checkbox, Form, Input, Spin } from 'antd';
import React, { useEffect } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.sass';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../redux/reducers';
import AdminActions from '../../redux/actions/AdminActions';
import { replace, RouterState } from 'connected-react-router';
import { useTitle } from '../../util';

const Login: React.FC = props => {
	useTitle("登录");

	const dispatch = useDispatch();

	const onSubmit = (form: any) => {
		// 把boolean类型的remeber参数变成0|1
		form.remember = +form.remember;
		dispatch(AdminActions.loginAdmin(form));
	}

	const backToUrlPage = (url: string) => {
		dispatch(replace(url));
	}

	const isLoading = useSelector<IState, boolean>(state => state.admin.isLoading);

	const account = useSelector<IState, string | null>(state => state.admin.account);
	
	const router = useSelector<IState, RouterState>(state => state.router);

	const formDom = (
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{ remember: true }}
			size="large"
			onFinish={onSubmit}
		>
			<Form.Item
				name="account"
				rules={[
					{
						required: true,
						message: '用户名不能为空',
					},
					{
						pattern: /[a-zA-Z0-9@]{3,10}/,
						message: '账号只能是数字、字母或者@',
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
						pattern: /[a-zA-Z0-9@]{4,16}/,
						message: '密码只能是4-16位的数字、字母或者@',
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
					loading={isLoading}
				>
					登录
				</Button>
			</Form.Item>
		</Form>
	);

	useEffect(() => {
		if (account) {
			backToUrlPage(router.location.query.url || '/');
		}
	}, [account]);

	return (
		<div className="login-container">
			<div className="wrapper">
				<h1 className='login-title'>博客后台管理系统</h1>
				{formDom}
			</div>
		</div>
	);
};

export default Login;
