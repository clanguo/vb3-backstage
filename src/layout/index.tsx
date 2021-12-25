import React, { Component, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminActions, {
	loginAdminAction,
	logoutAdminAction,
	setLoadingAction,
} from '../redux/actions/AdminActions';
import { IAdminState } from '../redux/reducers/AdminReducers';
import AdminServices from '../services/AdminServices';
import Home from '../page/Home/Home';
import Login from '../page/Login';
import './index.sass';

const _Layout: React.FC = props => {
	const dispatch = useDispatch<any>();

	useEffect(() => {
		(async () => {
			dispatch(AdminActions.setLoadingAction(true));

			const { data, headers } = await AdminServices.whoim();
			let account = null;
			if (!data.err) {
				if (data.data?.account) {
					let token = headers.authorization;
					account = data.data.account;
					dispatch(loginAdminAction({ token, account }));
				} else {
					dispatch(logoutAdminAction());
				}
			}

			dispatch(setLoadingAction(false));
		})();
	}, []);

	return (
		<div className="layout-container">
			<Switch>
				<Route path="/login" component={Login}></Route>
				<ProtectedRoute component={Home}></ProtectedRoute>
			</Switch>
		</div>
	);
};

export default _Layout;
