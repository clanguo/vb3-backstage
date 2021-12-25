import { Statistic, Row, Col, Button, Timeline } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TimeStatistic from '../../components/TimeStatistic';
import ProjectActions from '../../redux/actions/ProjectActions';
import { IState } from '../../redux/reducers';
import { EventType, IEventLog } from '../../services/ProjectServices';
import './Dashboard.sass';

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const DashBoard: React.FC = () => {
	// console.log("重新调用");
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(ProjectActions.fetchTimeLine());
	// });

	const timeLine = useSelector<IState, IEventLog[]>(state => state.project.timeLine);
	const renderTimeline = timeLine.map(event => {
		const date = new Date(event.timing).toLocaleString();
		switch (event.type) {
			case EventType.addBlog:
				return <Timeline.Item key={event.id}>添加文章《{<NavLink to={`/blog/${event.targetId}`}>{event.target}</NavLink>}》 {date}</Timeline.Item>;
			case EventType.removeBlog:
				return <Timeline.Item key={event.id}>删除文章《{event.target}》 {date}</Timeline.Item>;
			case EventType.addTag:
				return <Timeline.Item key={event.id}>添加标签【{<NavLink to={`/tag/${event.targetId}`}>{event.target}</NavLink>}】 {date}</Timeline.Item>;
			case EventType.removeTag:
				return <Timeline.Item key={event.id}>删除标签【{event.target}】 {date}</Timeline.Item>;
			case EventType.startServer:
				return <Timeline.Item key={event.id}>启动服务器 {date}</Timeline.Item>;
			default:
				return <Timeline.Item key={event.id}>{event.target} {date}</Timeline.Item>;
		}
	});

	return (
		<div className="dash-board">
			<div className="dash-statistic">
				<Row className="dashboard-row" justify="space-between">
					<Col span={11}>
						<Row>
							<Col>
								<TimeStatistic
									value={1633536001023}
									title="服务器已运行"
								></TimeStatistic>
							</Col>
						</Row>
					</Col>
					<Col span={11}>
						<Row justify="start">
							<Col span={12}>
								<Statistic
									value={10}
									title="已发布文章"
								></Statistic>
							</Col>
							<Col span={12}>
								<Statistic
									value={10}
									title="标签数"
								></Statistic>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
			<div className="dash-timeline">
				<h3 className="route-title">网站时间线</h3>
				<Timeline pending="持续记录中...">
					{renderTimeline}
				</Timeline>
			</div>
		</div>
	);
};

export default DashBoard;
