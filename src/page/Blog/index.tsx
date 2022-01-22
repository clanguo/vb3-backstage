import { Button, Drawer, Form, message, Spin } from 'antd';
import { goBack, push, RouterState } from 'connected-react-router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Route,
	RouteComponentProps,
	RouteProps,
	RouterProps,
	Switch,
} from 'react-router-dom';
import BlogForm from '../../components/BlogForm';
import BlogTable from '../../components/BlogTable';
import BlogActions, { TBlogActions } from '../../redux/actions/BlogActions';
import { fetchTag } from '../../redux/actions/TagActions';
import { IState } from '../../redux/reducers';
import { IBlogState, ISearchCondition } from '../../redux/reducers/BlogReducer';
import BlogServices, { IBlog } from '../../services/BlogServices';
import './index.sass';

interface IBlogFormDrawer extends Pick<IBlog, 'id'> {
	onClose(): void;
}

const BlogFormDrawer: React.FC<IBlogFormDrawer> = props => {
	const [currentBlog, setCurrentBlog] = useState<IBlog | null>(null);
	const dispatch = useDispatch<TBlogActions & any>();

	// const [visiable, setVisiable] = useState<boolean>(true);

	useEffect(() => {
		console.log('props.id', props.id);
		BlogServices.getBlogById(props.id).then(res => {
			if (res.err) {
				message.error('操作失败');
			} else {
				setCurrentBlog(res.data!);
			}
		});
	}, [props.id]);

	const onSubmit = async (form: IBlog) => {
		await BlogServices.editBlogInfo(props.id, form);
		const { err, data } = await BlogServices.editBlogContent(
			props.id,
			form.content as any
		);
		if (err) {
			message.error(err);
		} else {
			message.success('修改成功');
			const { err, data: newBlog } = await BlogServices.getBlogById(
				props.id
			);
			!err && dispatch(BlogActions.editBlog(props.id, newBlog!));
		}
	};

	return (
		<Drawer
			title="修改博客"
			width={720}
			visible={true}
			bodyStyle={{ paddingBottom: 80 }}
			onClose={props.onClose}
		>
			{currentBlog ? (
				<BlogForm
					initialValue={currentBlog!}
					disableReset={true}
					onSubmit={onSubmit}
				></BlogForm>
			) : (
				<div className="blog-form-spin">
					<Spin></Spin>
				</div>
			)}
		</Drawer>
	);
};

interface IBlogList {}

const BlogList: React.FC<IBlogList> = props => {
	const blogs = useSelector<IState, IBlogState>(state => state.blog);

	const dispatch = useDispatch<TBlogActions & any>();

	const onChange = (page: number) => {
		dispatch(BlogActions.fetchBlogs({ page }));
	};

	const [editBlogId, setEditBlogId] = useState<string | null>(null);

	const onEdit = (id: string) => {
		setEditBlogId(id);
	};

	const onDelete = async (id: string) => {
		dispatch(BlogActions.setLoadingAction(true));
		const res = await BlogServices.deleteBlog(id);
		if (res.err) {
			message.error('删除失败:' + res.err);
		} else {
			message.success('删除成功');
			dispatch(BlogActions.deleteBlogAction(id));
		}
		dispatch(BlogActions.setLoadingAction(false));
	};

	console.log(editBlogId);

	return (
		<>
			<BlogTable
				data={blogs.blogs}
				loading={blogs.isLoading}
				condition={blogs.condition}
				count={blogs.count}
				onChange={onChange}
				onDelete={onDelete}
				onEdit={onEdit}
			></BlogTable>
			{editBlogId ? (
				<BlogFormDrawer
					id={editBlogId}
					onClose={() => setEditBlogId(null)}
				></BlogFormDrawer>
			) : null}
		</>
	);
};

const Blog: React.FC = () => {
	const dispatch = useDispatch<TBlogActions & any>();

	useEffect(() => {
		dispatch(BlogActions.fetchBlogs({ page: 1, key: '' }));
		dispatch(fetchTag());
	}, []);

	return (
		<div className="blog-container">
			<div className="blog-main">
				<BlogList></BlogList>
			</div>
		</div>
	);
};

export default Blog;
