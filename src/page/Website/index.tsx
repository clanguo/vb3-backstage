import { Button, Form, Input, message, Spin, Switch } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { ISetting, ProjectServices } from '../../services/ProjectServices';
import './index.sass';

const Website: React.FC = () => {
	const [form] = useForm();

	const [spining, setSpining] = useState<boolean>(true);

	useEffect(() => {
		const request = ProjectServices.getSetting();
		request.then(
			({ data, err }) => {
				if (err) {
					message.error(err);
				} else {
					console.log(data);
					form.setFieldsValue({
						projectAddress: data?.projectAddress,
						imgProtect: data?.allowOrigin ? 'checked' : '',
						allowOrigin:
							typeof data?.allowOrigin === 'boolean'
								? data.allowOrigin
									? '*'
									: ''
								: data?.allowOrigin.join('\n'),
					});
				}
			},
			err => {
				console.error(err);
			}
		);
		request.finally(() => {
			setSpining(false);
		});
	}, []);


	const [postLoading, setPostLoading] = useState<boolean>(false);
	const onFinish = async (form: any) => {
		setPostLoading(true);
		const postForm: ISetting = {
			projectAddress: form.projectAddress,
			imgProtect: form.imgProtect === 'checked' ? true : false,
			allowOrigin:
				form.allowOrigin === ''
					? false
					: form.allowOrigin === '*'
					? true
					: form.allowOrigin.split('\n'),
		};

		const { err } = await ProjectServices.setSetting(postForm);
		if (err) {
			message.error(err);
		} else {
			message.success('操作成功');
		}

		setPostLoading(false);
	};

	return (
		<div className="website">
			<h3>网站设置</h3>
			<div className="website-form">
				<Spin tip="loading" spinning={spining}>
					<Form
						layout="horizontal"
						labelCol={{
							span: 4,
						}}
						wrapperCol={{
							span: 12,
						}}
						form={form}
						onFinish={onFinish}
					>
						<Form.Item
							label="首页Git Issues地址"
							name="projectAddress"
							rules={[
								{ required: true, message: '项目地址不能为空' },
							]}
						>
							<Input></Input>
						</Form.Item>
						<Form.Item
							label="开启图片防盗链"
							name="imgProtect"
							valuePropName="checked"
						>
							<Switch></Switch>
						</Form.Item>
						<Form.Item
							label="跨域请求白名单"
							extra="输入*设置允许任何请求的跨域；每个白名单域名单独占一行"
							name="allowOrigin"
						>
							<Input.TextArea rows={4}></Input.TextArea>
						</Form.Item>
						<Form.Item
							wrapperCol={{
								offset: 4,
							}}
						>
							<Button htmlType="submit" type="primary" loading={postLoading}>
								保存
							</Button>
						</Form.Item>
					</Form>
				</Spin>
			</div>
		</div>
	);
};

export default Website;
