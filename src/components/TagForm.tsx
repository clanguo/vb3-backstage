import { Form, FormInstance, Input } from 'antd';
import React from 'react';

interface ITagForm {
  form: FormInstance
}

const TagForm: React.FC<ITagForm> = (props) => {
	return (
		<div>
			<Form form={props.form}>
				<Form.Item
					label="标签名"
					name="name"
					rules={[
						{ required: true, message: '标签名必须填写' },
						{ max: 10, message: '标签名不易过长' },
					]}
				>
          <Input></Input>
        </Form.Item>
			</Form>
		</div>
	);
};

export default TagForm;
