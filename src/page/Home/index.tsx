import { Button, Dropdown, Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { useEffect } from 'react';
import {
	NavLink,
	Route,
	Switch,
	// Routes, useHref,
	useLocation,
} from 'react-router-dom';
import './index.sass';
import {
	AppstoreOutlined,
	PieChartOutlined,
	MailOutlined,
	BarsOutlined,
	SettingOutlined,
	MessageOutlined
} from '@ant-design/icons';
import DashBoard from './Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import ProjectActions from '../../redux/actions/ProjectActions';
import Blog from '../Blog';
import BlogAdd from '../Blog/BlogAdd';
import Tag from '../Tag';
import { IState } from '../../redux/reducers';
import { IAdminState } from '../../redux/reducers/AdminReducers';
import AdminActions from '../../redux/actions/AdminActions';
import CategoryActions from '../../redux/actions/CategoryActions';
import Category from '../Category';
import Website from '../Website';
import TagActions from '../../redux/actions/TagActions';
import { useTitle } from '../../util';

const { Header, Sider, Content } = Layout;

function useData() {
	const location = useLocation();

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(CategoryActions.fetchCategory());
	}, []);

	useEffect(() => {
		if (location.pathname === '/') {
			dispatch(ProjectActions.fetchTimeLine());
		}
	}, [location.pathname]);
	
	useEffect(() => {
		dispatch(TagActions.fetchTag());
	});
}

export default function Home() {
	// 请求数据
	useData();

	useTitle("首页");

	const location = useLocation();

	const dispatch = useDispatch();

	const admin = useSelector<IState, IAdminState>(state => state.admin);

	// const router = useSelector<IState, RouterState>(state => state.router);

	const onAccountMenuClick = (event: any) => {
		if (event.key === 'logout') {
			dispatch(AdminActions.logoutAdmin());
		}
	};

	const accoutDropDownMenu = (
		<Menu>
			<Menu.Item key="logout" onClick={onAccountMenuClick}>
				<span>退出登录</span>
			</Menu.Item>
		</Menu>
	);

	return (
		<div className="home">
			<Layout>
				<Header className="home-header">
					<div className="header-container">
						<NavLink to="/">
							<h1
								style={{
									display: 'inline-block',
									lineHeight: '64px',
								}}
							>
								博客后台管理系统
							</h1>
						</NavLink>
						<Dropdown
							overlay={accoutDropDownMenu}
							placement="bottomRight"
							className="header-account"
						>
							<Button type="primary">{admin.account}</Button>
						</Dropdown>
					</div>
				</Header>
				<Layout>
					<Sider collapsible className="home-sider">
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
							<Menu.Item key="/tag" icon={<AppstoreOutlined />}>
								<NavLink to="/tag">标签列表</NavLink>
							</Menu.Item>
							<Menu.Item key="/category" icon={<BarsOutlined />}>
								<NavLink to="/category">分类管理</NavLink>
							</Menu.Item>
							<Menu.Item key="/comment" icon={<MessageOutlined />}>
								<NavLink to="/comment">评论管理</NavLink>
							</Menu.Item>
							<SubMenu
								key="/website"
								icon={<SettingOutlined />}
								title="网站管理"
							>
								<Menu.Item key="/websiteSetting">
									<NavLink to="/websiteSetting">
										网站设置
									</NavLink>
								</Menu.Item>
								{/* <Menu.Item key="/websiteSource">
									<NavLink to="/websiteSource">
										资源管理
									</NavLink>
								</Menu.Item> */}
							</SubMenu>
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
								<Route
									path="/category"
									component={Category}
								></Route>
								<Route
									path="/websiteSetting"
									component={Website}
								></Route>
								{/* <Route
									path="/websiteSource"
								></Route> */}
							</Switch>
						</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
}
