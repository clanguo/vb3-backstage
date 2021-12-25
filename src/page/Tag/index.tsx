import { Button, Form, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TagForm from '../../components/TagForm';
import TagTable from '../../components/TagTable';
import TagActions from '../../redux/actions/TagActions';
import { IState } from '../../redux/reducers';
import TagServices, { ITag } from '../../services/TagServices';

const Tag: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(TagActions.fetchTag());
	}, []);

	const tags = useSelector<IState, ITag[]>(state => state.tags);

	const onDelete = (id: string) => {
		dispatch(TagActions.fetchDeleteTag(id));
	};

	const [showAddModal, setShowAddModal] = useState<boolean>(false);

	const onCancelModal = () => {
		setShowAddModal(false);
		form.resetFields();
	};

	const onClickAddBtn = () => {
		setShowAddModal(true);
	};

	const onConfimAdd = async () => {
		try {
			const formData = await form.validateFields();
			const res = await TagServices.addTag(formData);
			if (res.err) {
				message.error(res.err);
			} else {
				message.success("添加成功");
				dispatch(TagActions.addTagAction(res.data!));
				form.resetFields();
				setShowAddModal(false);
			}
		} catch (e) {
			// 验证失败
		}
	}

	const [form] = Form.useForm();

	return (
		<div>
			<p>
				<Button type="primary" size="large" onClick={onClickAddBtn}>
					新增
				</Button>
			</p>
			<TagTable data={tags} onDelete={onDelete}></TagTable>
			<Modal
				visible={showAddModal}
				onCancel={onCancelModal}
				title="添加标签"
				keyboard={false}
				maskClosable={false}
				onOk={onConfimAdd}
			>
				<TagForm form={form}></TagForm>
			</Modal>
		</div>
	);
};

export default Tag;
