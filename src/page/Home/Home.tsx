import { Button, Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { useEffect } from 'react';
import {
	NavLink,
	Route,
	Switch,
	// Routes, useHref,
	useLocation,
} from 'react-router-dom';
import './Home.sass';
import {
	AppstoreOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	PieChartOutlined,
	DesktopOutlined,
	ContainerOutlined,
	MailOutlined,
	BarsOutlined
} from '@ant-design/icons';
import DashBoard from './Dashboard';
import { ProjectServices } from '../../services/ProjectServices';
import { useDispatch, useSelector } from 'react-redux';
import ProjectActions from '../../redux/actions/ProjectActions';
import Blog from '../Blog';
import BlogAdd from '../Blog/BlogAdd';
import * as pathToRegexp from 'path-to-regexp';
import Tag from '../Tag';
import { IState } from '../../redux/reducers';
import { IAdminState } from '../../redux/reducers/AdminReducers';
import AdminActions from '../../redux/actions/AdminActions';
import CategoryActions from '../../redux/actions/CategoryActions';
import { RouterState } from 'connected-react-router';

const { Header, Footer, Sider, Content } = Layout;

export default function Home() {
	const location = useLocation();

	const dispatch = useDispatch();

	const admin = useSelector<IState, IAdminState>(state => state.admin);

	// const router = useSelector<IState, RouterState>(state => state.router);

	useEffect(() => {
		dispatch(CategoryActions.fetchCategory());
	}, []);

	useEffect(() => {
		if (location.pathname === '/') {
			dispatch(ProjectActions.fetchTimeLine());
		}
	}, [location.pathname]);

	const logout = () => {
		dispatch(AdminActions.logoutAdmin());
	};

	return (
		<div className="home">
			<Layout>
				<Header className="home-header">
					<div className="header-container">
						<NavLink to="/">
							<h1>博客后台管理系统</h1>
						</NavLink>
						<div className="header-account">
							<span>{admin.account}</span>
							<Button
								type="primary"
								size="middle"
								className="header-account-btn"
								onClick={logout}
							>
								退出登录
							</Button>
						</div>
					</div>
				</Header>
				<Layout>
					<Sider className="home-sider">
						<Menu
							defaultSelectedKeys={[location.pathname]}
							defaultOpenKeys={['blog', 'tag']}
							mode="inline"
							theme="dark"
						>
							<Menu.Item key="/" icon={<PieChartOutlined />}>
								<NavLink to="/">数据面板</NavLink>
							</Menu.Item>
							<SubMenu
								key="blog"
								icon={<MailOutlined />}
								title="博客管理"
							>
								<Menu.Item key="/blog">
									<NavLink to="/blog">博客列表</NavLink>
								</Menu.Item>
								<Menu.Item key="/blog/add">
									<NavLink to="/blog/add">添加博客</NavLink>
								</Menu.Item>
							</SubMenu>
							<SubMenu
								key="tag"
								icon={<AppstoreOutlined />}
								title="标签管理"
							>
								<Menu.Item key="/tag">
									<NavLink to="/tag">标签列表</NavLink>
								</Menu.Item>
							</SubMenu>
							<Menu.Item
								key="/category"
								icon={<BarsOutlined />}
							>
								<NavLink to="/category">分类管理</NavLink>
							</Menu.Item>
						</Menu>
					</Sider>
					<Content className="layout-content">
						<div className="layout-content-wrapper">
							<Switch>
								<Route
									path="/"
									exact
									component={DashBoard}
								></Route>
								<Route
									path="/blog/add"
									component={BlogAdd}
								></Route>
								<Route path="/blog" component={Blog}></Route>
								<Route path="/tag/:id?" component={Tag}></Route>
								<Route path="/category/:id?"></Route>
							</Switch>
						</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
}
