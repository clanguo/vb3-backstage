import { Button, Form, Input, Select, Space } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../redux/reducers';
import { IBlog } from '../services/BlogServices';
import { ITag } from '../services/TagServices';
import UploadImg from './UploadImg';
import './BlogForm.sass';
import { ICategory } from '../services/CategoryServices';

interface IBlogForm {
	onSubmit?(form: IBlog): void;

	initialValue?: Partial<IBlog>;

	disableReset?: boolean;
}

const BlogForm: React.FC<IBlogForm> = props => {
	const tagStore = useSelector<IState, ITag[]>(state => state.tags);
	const categoryStore = useSelector<IState, ICategory[]>(state => state.categories);

	const [form] = Form.useForm();

	const onFinsh = (values: any) => {
		const postForm = { ...values };
		props.initialValue?.id && (postForm.id = props.initialValue.id);
		props.onSubmit && props.onSubmit(postForm);
	};

	return (
		<Form
			form={form}
			labelAlign="right"
			onFinish={onFinsh}
			id="blog-form"
			labelCol={{
				span: 4,
			}}
			wrapperCol={{
				span: 20,
			}}
		>
			<div style={{ overflow: 'hidden' }}>
				<div id="blog-form-poster">
					<Form.Item
						label="封面"
						name="poster"
						valuePropName={'imageUrl'}
						initialValue={props.initialValue?.poster}
						labelCol={{
							span: 8,
						}}
					>
						<UploadImg
							imageUrl={form.getFieldValue('poster')}
						></UploadImg>
					</Form.Item>
				</div>
				<div id="blog-form-info">
					<Form.Item
						label="标题"
						name="title"
						rules={[{ required: true, message: '标题不能为空' }]}
						initialValue={props.initialValue?.title}
					>
						<Input></Input>
					</Form.Item>

					<Form.Item
						label="标签"
						name="tags"
						initialValue={props.initialValue?.tags?.map(
							tag => `${tag.id}`
						)}
					>
						<Select mode="tags" allowClear placeholder="请选择标签" maxTagCount={4}>
							{tagStore.map(tag => (
								<Select.Option
									key={tag.id}
									value={`${tag.id!}`}
								>
									{tag.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						label="分组"
						name="category"
						initialValue={props.initialValue?.category?.id}
						rules={[{ required: true, message: "必须选择一个分类" }]}
					>
						<Select allowClear placeholder="请选择分类">
							{categoryStore.map(category => (
								<Select.Option
									key={category.id}
									value={`${category.id!}`}
								>
									{category.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item
						label="描述"
						name="description"
						rules={[{ max: 50, message: '描述不易过长' }]}
						initialValue={props.initialValue?.description}
						// labelCol={{
						// 	span: 2,
						// }}
						// wrapperCol={{
						// 	span: 22,
						// }}
					>
						<Input></Input>
					</Form.Item>
				</div>
			</div>

			<div id="blog-form-content">
				<Form.Item
					// label="内容"
					name="content"
					rules={[{ required: true, message: '必须填写内容' }]}
					initialValue={props.initialValue?.content?.content}
					labelCol={{
						span: 2,
					}}
					wrapperCol={{}}
				>
					<Input.TextArea className="blog-form-textarea"></Input.TextArea>
				</Form.Item>
			</div>
			<div>
				<Form.Item
					// wrapperCol={{ xs: { offset: 0 }, sm: { offset:  } }}
					wrapperCol={{ offset: 19 }}
				>
					<Space>
						<Button type="primary" htmlType="submit" size="large">
							提交
						</Button>
						<Button
							type="primary"
							htmlType="reset"
							size="large"
							disabled={props.disableReset}
						>
							重置
						</Button>
					</Space>
				</Form.Item>
			</div>
		</Form>
	);
};

BlogForm.defaultProps = {
	initialValue: {
		title: '',
		poster: '',
		description: '',
		tags: [],
		content: {
			content: '',
		},
	},

	disableReset: false,
};

export default BlogForm;
