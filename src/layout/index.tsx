import React, { Component, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminActions, {
	loginAdminAction,
	logoutAdminAction,
	setLoadingAction,
} from '../redux/actions/AdminActions';
import AdminServices from '../services/AdminServices';
import Home from '../page/Home';
import Login from '../page/Login';
import './index.sass';

const _Layout: React.FC = props => {
	const dispatch = useDispatch<any>();

	useEffect(() => {
		(async () => {
			dispatch(AdminActions.setLoadingAction(true));

			try {
				const { data } = await AdminServices.whoim();
				let account = null;
				if (!data.err) {
					if (data.data?.account) {
						account = data.data.account;
						dispatch(loginAdminAction({ account }));
					} else {
						dispatch(logoutAdminAction());
					}
				}
			} finally {
				dispatch(setLoadingAction(false));
			}
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
