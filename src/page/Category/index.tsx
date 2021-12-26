import { Button, Form, Input, message, Popconfirm, Table } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryActions, { addCategoryAction, deleteCategoryAction } from '../../redux/actions/CategoryActions';
import { IState } from '../../redux/reducers';
import { IBlog } from '../../services/BlogServices';
import CategoryServices, { ICategory } from '../../services/CategoryServices';
import './index.sass';

interface ICategoryTable {
	data: ICategory[];

	onRemoveCategory(id: string): void;
}

const CategoryTable: React.FC<ICategoryTable> = props => {
	const columns: ColumnsType<ICategory> = [
		{
			key: 'no',
			// dataIndex: 'id',
			title: '序号',
			render: (value, category, index) => {
				return index;
			},
		},
		{
			key: 'name',
			dataIndex: 'name',
			title: '名称',
		},
		{
			key: 'createdAt',
			dataIndex: 'createdAt',
			title: '创建时间',
		},
		{
			key: 'blogs',
			dataIndex: 'blogs',
			title: '文章数',
			render: (blogs: IBlog[]) => blogs.length,
		},
		{
			key: 'actions',
			title: '操作',
			render: (category: ICategory) => {
				return (
					<Popconfirm
						title="你确定要删除吗"
						okText="确定"
						cancelText="取消"
						onConfirm={() => props.onRemoveCategory(category.id!)}
					>
						<Button danger size="small">
							删除
						</Button>
					</Popconfirm>
				);
			},
		},
	];

	return (
		<Table
			columns={columns}
			bordered={true}
			dataSource={props.data}
			pagination={false}
		></Table>
	);
};

interface ICategoryForm {
	onSubmit(form: any, reset: () => void): void;
}

const CategoryForm: React.FC<ICategoryForm> = (props) => {
	const [form] = useForm();

	const reset = () => form.resetFields();

	return (
		<Form
			layout="vertical"
			wrapperCol={{
				span: 12,
			}}
			onFinish={values => props.onSubmit(values, reset)}
			form={form}
		>
			<Form.Item
				name="name"
				label="名称"
				rules={[
					{
						type: 'string',
						max: 10,
						message: '分组名不能超过10个字',
					},
				]}
			>
				<Input></Input>
			</Form.Item>
			<Form.Item
				labelCol={{
					span: 0,
				}}
			>
				<Button htmlType="submit">添加</Button>
			</Form.Item>
		</Form>
	);
};

const Category: React.FC = () => {
	const category = useSelector<IState, ICategory[]>(
		state => state.categories
	);

	const dispatch = useDispatch<any>();

	const onRemoveCategory = async (id: string) => {
		const { err } = await CategoryServices.removeCategory(id);
		if (err) {
			message.error(err);
		} else {
			dispatch(deleteCategoryAction(id));
			message.success('操作成功');
		}
	};

	const onAddCategory = async (value: any, reset: () => void) => {
		const { err, data } = await CategoryServices.addCategory(value.name);
		if (err) {
			message.error(err);
		} else {
			message.success("添加成功");
			dispatch(addCategoryAction(data!));
			reset();
		}
	}

	return (
		<div id="category">
			<div className="category-add">
				<h3>添加分组</h3>
				<div className="category-add-form">
					<CategoryForm onSubmit={onAddCategory}></CategoryForm>
				</div>
			</div>
			<div className="category-list">
				<CategoryTable
					data={category}
					onRemoveCategory={onRemoveCategory}
				></CategoryTable>
			</div>
		</div>
	);
};

export default Category;
