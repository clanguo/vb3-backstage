import { Button, message, Spin } from 'antd';
import { goBack, push, RouterState } from 'connected-react-router';
import React, { useEffect, useState } from 'react';
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

const BlogList: React.FC = () => {
	const blogs = useSelector<IState, IBlogState>(state => state.blog);

	const dispatch = useDispatch<TBlogActions & any>();

	const onChange = (page: number) => {
		dispatch(BlogActions.fetchBlogs({ page }));
	};

	const onEdit = async (id: string) => {
		dispatch(push('/blog/' + id));
		// dispatch(BlogActions.setLoadingAction(true));
		// const {data, err} = await BlogServices.getBlogById(id);
		// if(!err) {
		// 	setEditBlog(data);
		// 	setToggleEdit(true);
		// } else {
		// 	message.error(err);
		// }

		// dispatch(BlogActions.setLoadingAction(false));
		// const infoRes = await BlogServices.editBlogInfo(blog.id, blog);
		// const contentRes = await BlogServices.editBlogContent(
		// 	blog.id,
		// 	blog.content
		// );
		// let err =
		// 	(infoRes.err ? infoRes.err : '') +
		// 	(contentRes.err ? contentRes.err : '');
		// if (err) {
		// 	message.error(err);
		// } else {
		// 	message.success('全部修改成功');
		// }
		// dispatch(BlogActions.fetchBlogs({}));
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

	return (
		<BlogTable
			data={blogs.blogs}
			loading={blogs.isLoading}
			condition={blogs.condition}
			count={blogs.count}
			onChange={onChange}
			onDelete={onDelete}
			onEdit={onEdit}
		></BlogTable>
	);
};

const BlogEdit: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
	const dispatch = useDispatch<TBlogActions & any>();

	const [editBlog, setEditBlog] = useState<IBlog | null>(null);

	const router = useSelector<IState, RouterState>(state => state.router);

	const exitEdit = () => {
		dispatch(goBack());
	};

	useEffect(() => {
		if (match.params.id) {
			BlogServices.getBlogById(match.params.id).then(res => {
				if (!res.err) {
					setEditBlog(res.data);
				} else {
					message.error(res.err);
				}
			});
		}
	}, []);

	const onSubmit = async (form: IBlog) => {
		await BlogServices.editBlogInfo(match.params.id, form);
		const { err, data } = await BlogServices.editBlogContent(match.params.id, form.content as any);
		if (err) {
			message.error(err);
		} else {
			message.success("修改成功");
			const { err, data: newBlog } = await BlogServices.getBlogById(match.params.id);
			!err && dispatch(BlogActions.editBlog(match.params.id, newBlog!));
		}
	}

	return (
		<div className="blog-form">
			<p>
				<Button onClick={exitEdit} type="primary">
					返回
				</Button>
			</p>
			{editBlog ? (
				<BlogForm
					initialValue={editBlog!}
					disableReset={true}
					onSubmit={onSubmit}
				></BlogForm>
			) : (
				<div className='blog-form-spin'>
					<Spin></Spin>
				</div>
			)}
		</div>
	);
};

const Blog: React.FC = () => {
	const dispatch = useDispatch<TBlogActions & any>();

	const [toggleEdit, setToggleEdit] = useState<boolean>(false);

	useEffect(() => {
		dispatch(BlogActions.fetchBlogs({ page: 1, key: '' }));
		dispatch(fetchTag());
	}, []);

	return (
		<div className="blog-container">
			<div className="blog-main">
				<Switch>
					<Route path="/blog/:id" component={BlogEdit}></Route>
					<Route path="/blog" exact component={BlogList}></Route>
				</Switch>
			</div>
		</div>
	);
};

export default Blog;
