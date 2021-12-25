import { message, Modal, Upload } from 'antd';
import React, { useState, useCallback } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import BlogServices from '../services/BlogServices';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { UploadFile } from 'antd/lib/upload/interface';

interface IUploadImg {
	name?: string;

	imageUrl?: string;

	onChange?(url: string): void;
}

const UploadImg: React.FC<IUploadImg> = props => {
	const [loading, setLoading] = useState<boolean>(false);

	const getFileList = useCallback(() => {
		return props.imageUrl
			? [
					{
						uid: props.imageUrl,
						name: props.imageUrl,
						url: props.imageUrl,
					},
			  ]
			: [];
	}, [props.imageUrl]);

	const handleUpload = async (options: UploadRequestOption) => {
		setLoading(true);
		const form = new FormData();
		form.append(props.name!, options.file);
		const res = await BlogServices.uploadPoster(form);
		if (res.err) {
			message.error('上传失败:' + res.err);
		} else {
			message.success('上传成功');
			props.onChange && props.onChange(res.data!);
		}
		setLoading(false);
	};

	const handleRemove = () => {
		props.onChange && props.onChange('');
	};

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	const handlePreview = () => {
		setIsModalVisible(true);
	};

	const onCancelPreview = () => {
		setIsModalVisible(false);
	};

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);
	return (
		<>
			<Upload
				name={props.name}
				listType="picture-card"
				className="avatar-uploader"
				accept=".jpg,.png,.gif,.jpeg"
				customRequest={handleUpload}
				fileList={getFileList()}
				action="/api/uploads"
				maxCount={1}
				onRemove={handleRemove}
				onPreview={handlePreview}
			>
				{props.imageUrl ? null : uploadButton}
			</Upload>

			<Modal
				title="图片预览"
				visible={isModalVisible}
				footer={null}
				onCancel={onCancelPreview}
			>
				<img src={props.imageUrl} style={{ width: '100%' }} alt="" />
			</Modal>
		</>
	);
};

UploadImg.defaultProps = {
	name: 'poster',
};

export default UploadImg;