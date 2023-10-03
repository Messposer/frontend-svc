import { TemplateVariableType, UserTemplateType } from "services/types/TemplateServiceType";
import { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';

interface ShowVariableProps {
  toggleShowVariable: () => void;
  userTemplate: UserTemplateType | undefined;
}

const ShowVariable = ({ toggleShowVariable, userTemplate } : ShowVariableProps) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([{ name: '', value: '' }]);

  const handleAddField = () => {
    setFields([...fields, { name: '', value: '' }]);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const onFinish = (values: { variables: TemplateVariableType[] }) => {
    const payload: Record<string, string> = {};
    values.variables.forEach((item) => {
      payload[item.name] = item.value;
    });
    console.log('Payload:', payload);
  };
  return (
    <>
      <h4>Variables</h4>
      <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
        {fields.map((field, index) => (
          <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
            <Form.Item
              {...field}
              name={['variables', index, 'name']}
              fieldKey={['variables', index, 'name']}
              rules={[{ required: true, message: 'Missing name' }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              {...field}
              name={['variables', index, 'value']}
              fieldKey={['variables', index, 'value']}
              rules={[{ required: true, message: 'Missing value' }]}
            >
              <Input placeholder="Value" />
            </Form.Item>
            {fields.length > 1 && (
              <span onClick={() => handleRemoveField(index)}>Delete</span>
            )}
          </Space>
        ))}

        <Form.Item>
          <Button type="dashed" onClick={handleAddField} block>
            Add Field
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ShowVariable;