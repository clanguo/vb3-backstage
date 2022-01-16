import { Spin } from 'antd';
import { RouterState } from 'connected-react-router';
import React, { ElementType } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { IState } from '../redux/reducers';
import { IAdminState } from '../redux/reducers/AdminReducers';

const ProtectedRoute: React.FC<
	RouteProps & Required<Pick<RouteProps, 'component'>>
> = ({ children, render, component: Component, ...rest }) => {
	const admin = useSelector<IState, IAdminState>(state => state.admin);

	return (
		<Route
			{...rest}
			render={values => {
				if (admin.isLoading) {
					return (
						<div style={{
							width: '100vw',
							height: '100vh',
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#f2f2f2"
						}}>
							<Spin
								tip="加载中..."
								size="large"
								wrapperClassName="home-spin"
							></Spin>
						</div>
					);
				} else {
					if (admin.account) {
						return <Component {...values} />;
					} else {
						return (
							<Redirect
								to={{
									pathname: '/login',
									search: '?url=' + values.location.pathname,
								}}
							></Redirect>
						);
					}
				}
			}}
		></Route>
	);
};

export default ProtectedRoute;
