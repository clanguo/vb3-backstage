import { Avatar, Button, List, message, Modal, Popconfirm, Table } from 'antd';
import React, { useState } from 'react';
import { IBlog } from '../services/BlogServices';
import TagServices, { ITag } from '../services/TagServices';

interface ITagTable {
	data: ITag[];
	onDelete(id: string): void;
}

const TagTable: React.FC<ITagTable> = props => {
	const columns = [
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: '标签名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '创建时间',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (createdAt: any) => new Date(createdAt).toLocaleString(),
		},
		{
			title: '已关联博客',
			dataIndex: 'blogs',
			key: 'blogs',
			render: (blogs: []) => blogs.length,
		},
		{
			title: '操作',
			key: 'actions',
			render: (record: ITag) => {
				return (
					<>
						<Button
							type="primary"
							size="small"
							disabled={!(record.blogs && record.blogs.length)}
							onClick={() => onViewTag(record.id!)}
						>
							查看
						</Button>
						<Popconfirm
							title="你确定要删除吗"
							onConfirm={() => props.onDelete(record.id!)}
							okText="确定"
							cancelText="取消"
						>
							<Button danger size="small">
								删除
							</Button>
						</Popconfirm>
					</>
				);
			},
		},
	];

	const renderListItem = (item: IBlog) => {
		return (
			<List.Item
				actions={[
					<Button size="small" type="primary">
						查看
					</Button>,
					<Button size="small" type="primary" danger>
						解除关联
					</Button>,
				]}
			>
				<List.Item.Meta
					avatar={<Avatar src={item.poster}></Avatar>}
					title={item.title}
					description={item.description}
				></List.Item.Meta>
			</List.Item>
		);
	};

	const [tagBlogs, setTagBlogs] = useState<ITag | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);

	const onViewTag = async (id: string) => {
		setLoading(true);
		setShowModal(true);
		try {
			const res = await TagServices.getTag(id);
			if (res.err) {
				message.error(res.err);
			} else {
				setTagBlogs(res.data!);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const onCancelModal = () => {
		setShowModal(false);
	}

	return (
		<div>
			<Table
				columns={columns}
				dataSource={props.data}
				rowKey={'id'}
			></Table>
			<Modal visible={showModal} title={tagBlogs?.name} onCancel={onCancelModal} footer={null}>
				<List
					itemLayout="horizontal"
					renderItem={renderListItem}
					dataSource={tagBlogs?.blogs}
					loading={loading}
				></List>
			</Modal>
		</div>
	);
};

export default TagTable;
