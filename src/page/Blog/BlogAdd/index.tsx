import {
	AutoComplete,
	Button,
	Cascader,
	Checkbox,
	Col,
	Form,
	Input,
	InputNumber,
	message,
	Row,
	Select,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BlogForm, { TResetCallBack } from '../../../components/BlogForm';
import { setLoadingAction } from '../../../redux/actions/AdminActions';
import BlogActions from '../../../redux/actions/BlogActions';
import { fetchTag } from '../../../redux/actions/TagActions';
import BlogServices, { IBlog } from '../../../services/BlogServices';

const BlogAdd: React.FC = () => {
	const dispatch = useDispatch<any>();

	const onSubmit = async (form: IBlog, callback: TResetCallBack) => {
		dispatch(BlogActions.setLoadingAction(true));
		const res = await BlogServices.addBlog(form);
		if (res.err) {
			message.error(res.err);
		} else {
			message.success("添加成功");
			callback(true);
			dispatch(BlogActions.addBlogAction(res.data!));
		}
		dispatch(setLoadingAction(false));
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
