import {
	Tag,
	Image,
	Table,
	Button,
	Popconfirm,
	Skeleton,
	Modal,
	message,
	PaginationProps,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { ReactElement, ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import BlogActions from '../redux/actions/BlogActions';
import { ISearchCondition } from '../redux/reducers/BlogReducer';
import BlogServices, { IBlog } from '../services/BlogServices';
import { ICategory } from '../services/CategoryServices';
import { ITag } from '../services/TagServices';
import { getRandomColor } from '../util';
import BlogForm from './BlogForm';

const colorsMap: any = {};

interface IBlogTable {
	data?: IBlog[];
	count: number;
	loading: boolean;
	onChange(page: number): void;
	onDelete(id: string): void;
	condition: ISearchCondition;
	onEdit?(id: string): void;
}

const BlogTable: React.FC<IBlogTable> = props => {
	const columns: ColumnsType<IBlog> = [
		{
			title: '标题',
			dataIndex: 'title',
			key: 'title',
			ellipsis: true,
		},
		{
			title: '封面',
			dataIndex: 'poster',
			key: 'poster',
			render: (poster: string) => {
				return (
					<Image
						src={poster}
						width={80}
						fallback="data:image/png;base64,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"
					></Image>
				);
			},
		},
		{
			title: '描述',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: '标签',
			dataIndex: 'tags',
			key: 'tags',
			shouldCellUpdate: (record, prevRecord) => {
				const tags = record.tags.map(tag => tag.id);
				const prevTags = prevRecord.tags.map(tag => tag.id);
				return tags.sort().toString() !== prevTags.sort().toString();
			},
			render: (tags: ITag[], record: any, index: number) => {
				return (
					<>
						{tags.length
							? tags.map(tag => {
									let color;
									if (colorsMap[tag.id!]) {
										color = colorsMap[tag.id!];
									} else {
										colorsMap[tag.id!] = color =
											getRandomColor();
									}
									return (
										<Tag key={tag.id} color={color}>
											{tag.name}
										</Tag>
									);
							  })
							: null}
					</>
				);
			},
		},
		{
			title: '分类',
			dataIndex: 'category',
			key: 'category',
			render: (category: ICategory) => {
				return (
					<Tag color="#2db7f5" key={category.id}>
						{category?.name}
					</Tag>
				);
			},
		},
		{
			title: '创建时间',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (createdAt: Date) => {
				return new Date(createdAt).toLocaleString();
			},
		},
		{
			title: '上一次更新时间',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			render: (updatedAt: Date) => new Date(updatedAt).toLocaleString(),
		},
		{
			title: '操作',
			render: (record: IBlog) => (
				<div>
					<Button
						type="primary"
						size="small"
						// onClick={() => {
						// 	loadingEditModal(record.id);
						// 	return undefined;
						// }}
						onClick={() => {
							// loadingEditModal(record.id)
							props.onEdit && props.onEdit(record.id);
						}}
					>
						编辑
					</Button>
					<Popconfirm
						title="你确定要删除吗"
						onConfirm={() => props.onDelete(record.id)}
						okText="确定"
						cancelText="取消"
					>
						<Button danger size="small">
							删除
						</Button>
					</Popconfirm>
				</div>
			),
		},
	];

	const dispatch = useDispatch<any>();
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [modalDOm, setModalDOm] = useState<ReactNode>(null);

	const loadingEditModal = async (id: string) => {
		dispatch(BlogActions.setLoadingAction(true));
		const res = await BlogServices.getBlogById(id);
		// debugger
		if (res.err) {
			message.error(res.err);
		} else {
			setModalDOm(
				<BlogForm
					initialValue={res.data!}
					onSubmit={onSubmit}
					disableReset={true}
				></BlogForm>
			);
			setShowEditModal(true);
		}
		dispatch(BlogActions.setLoadingAction(false));
	};

	const cancelModal = () => setShowEditModal(false);
	const onSubmit = (form: IBlog) => {
		// console.log(form);
		// props.onEdit && props.onEdit(form);
	};

	const changePager = (pagination: PaginationProps) => {
		props.onChange(pagination.current!);
	};

	return (
		<>
			<Table
				columns={columns}
				dataSource={props.data}
				rowKey="id"
				loading={props.loading}
				pagination={{
					current: props.condition.page,
					total: props.count,
				}}
				onChange={changePager}
			></Table>
			<Modal
				onCancel={cancelModal}
				visible={showEditModal}
				title="修改文章"
				footer={null}
				centered
				destroyOnClose
			>
				{modalDOm}
			</Modal>
		</>
	);
};

BlogTable.defaultProps = {
	data: [],
};

export default BlogTable;
