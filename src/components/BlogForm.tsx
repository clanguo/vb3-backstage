import { Button, Col, Form, Input, message, Row, Select, Space } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../redux/reducers';
import { IBlog } from '../services/BlogServices';
import { ITag } from '../services/TagServices';
import UploadImg from './UploadImg';
import './BlogForm.sass';
import { ICategory } from '../services/CategoryServices';
import MarkdownIt from 'markdown-it';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { ProjectServices } from '../services/ProjectServices';

export type TResetCallBack = (isReset: boolean) => void;

// const MarkdownComponent = React.lazy(
// 	() => import('react-markdown-editor-lite')
// );

const markdownParser = new MarkdownIt();

const MarkdownComponent: React.FC<any> = (props: any) => {
	const onChange = ({ text }: { text: string }) => {
		props?.onChange(text);
	};

	const uploadImg = async (file: File) => {
		const formData = new FormData();
		formData.append("poster", file);
		const result = await ProjectServices.uploadPoster(formData);
		if (result.err) {
			message.error("上传失败:" + result.err);
			return "";
		}
		return result.data;
	}

	const { onChange: _, ...anotherProps } = props;
	return (
		<MarkdownEditor
			renderHTML={(text: string) => markdownParser.render(text)}
			onChange={onChange}
			onImageUpload={uploadImg}
			{...anotherProps}
		/>
	);
};

interface IBlogForm {
	onSubmit?(form: IBlog, callback?: TResetCallBack): void;

	initialValue?: Partial<IBlog>;

	disableReset?: boolean;
}

const BlogForm: React.FC<IBlogForm> = props => {
	const tagStore = useSelector<IState, ITag[]>(state => state.tags);
	const categoryStore = useSelector<IState, ICategory[]>(
		state => state.categories
	);

	const [form] = Form.useForm();

	const onFinsh = (values: any) => {
		const postForm = { ...values };
		props.initialValue?.id && (postForm.id = props.initialValue.id);
		props.onSubmit &&
			props.onSubmit(postForm, isReset => {
				if (isReset) form.resetFields();
			});
	};

	return (
		<Form
			form={form}
			labelAlign="right"
			onFinish={onFinsh}
			id="blog-form"
			labelCol={{
				lg: {
					span: 4,
				},
				span: 2,
			}}
			// wrapperCol={{
			// 	span: 20,
			// }}
		>
			<Row gutter={8}>
				<Col lg={12} span={24}>
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
						<Select
							mode="tags"
							allowClear
							placeholder="请选择标签"
							maxTagCount={4}
						>
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
						rules={[
							{ required: true, message: '必须选择一个分类' },
						]}
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
					>
						<Input></Input>
					</Form.Item>
				</Col>
				<Col lg={12} span={24}>
					<Form.Item
						label="封面"
						name="poster"
						valuePropName={'imageUrl'}
						initialValue={props.initialValue?.poster}
						// labelCol={{
						// 	span: 8,
						// }}
					>
						<UploadImg
							imageUrl={form.getFieldValue('poster')}
						></UploadImg>
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Form.Item
						name="content"
						rules={[{ required: true, message: '必须填写内容' }]}
						initialValue={props.initialValue?.content?.content}
						wrapperCol={{
							offset: 2,
						}}
					>
						<MarkdownComponent style={{ height: '500px' }} />
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Form.Item
						// wrapperCol={{ xs: { offset: 0 }, sm: { offset:  } }}
						wrapperCol={{ offset: 2 }}
					>
						<Space>
							<Button
								type="primary"
								htmlType="submit"
								size="large"
							>
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
				</Col>
			</Row>
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
