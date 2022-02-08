import { message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BlogForm, { TResetCallBack } from '../../../components/BlogForm';
import { setLoadingAction } from '../../../redux/actions/AdminActions';
import BlogActions from '../../../redux/actions/BlogActions';
import CategoryActions from '../../../redux/actions/CategoryActions';
import TagActions from '../../../redux/actions/TagActions';
import BlogServices, { IBlog } from '../../../services/BlogServices';

const BlogAdd: React.FC = () => {
	const dispatch = useDispatch<any>();

	useEffect(() => {
		dispatch(TagActions.fetchTag());
		dispatch(CategoryActions.fetchCategory());
	});

	const onSubmit = async (form: IBlog, callback: TResetCallBack) => {
		dispatch(BlogActions.setLoadingAction(true));
		try {
			const res = await BlogServices.addBlog(form);
			if (res.err) {
				message.error(res.err);
			} else {
				message.success('添加成功');
				callback(true);
				dispatch(BlogActions.addBlogAction(res.data!));
			}
			dispatch(setLoadingAction(false));
		} catch (e) {
			message.error("发生异常!添加失败!");
			console.error(e);
		}
	};

	return (
		<>
			<div className="blog-add-container">
				<BlogForm onSubmit={onSubmit}></BlogForm>
			</div>
		</>
	);
};

export default BlogAdd;
