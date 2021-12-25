import { Modal, Spin } from 'antd';
import React, { Dispatch, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import AdminActions, {
	loginAdminAction,
	logoutAdminAction,
	setLoadingAction,
	TAdminActions,
} from '../../redux/actions/AdminActions';
import './index.sass';
import { IState } from '../../redux/reducers';
import AdminServices from '../../services/AdminServices';
import Login from '../Login';
import { delay } from '../../util';
// import _Layout from '../Layout';
import {
	// Navigate,
	Route,
	// Routes,
	// useHref,
	useLocation,
} from 'react-router-dom';

interface IHome {
	whoIm(): Promise<string | null>;

	isLoading: boolean;

	account: string | null;
}

function mapStateToProps(state: IState) {
	return {
		account: state.admin.account,
		isLoading: state.admin.isLoading,
	};
}

function mapDispatchToProps(dispatch: Dispatch<TAdminActions>) {
	return {
		async whoIm() {
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
			return account;
		},
	};
}

const Home: React.FC<IHome> = props => {
	const location = useLocation();
	useEffect(() => {
		props.whoIm();
	}, []);

	return (
		<Spin
			spinning={props.isLoading}
			tip="加载中..."
			size="large"
			wrapperClassName="home-spin"
		>
			<div className="home">
			</div>
		</Spin>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
