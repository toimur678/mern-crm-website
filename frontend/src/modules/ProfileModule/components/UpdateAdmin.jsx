import { useProfileContext } from '@/context/profileContext';
import { generate as uniqueId } from 'shortid';

import { Button, Col, Form, Row } from 'antd';
import PageHeader from '@/components/PageHeader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileAdminForm from './ProfileAdminForm';

import { updateProfile } from '@/redux/auth/actions';

import { selectCurrentAdmin } from '@/redux/auth/selectors';

import useLanguage from '@/locale/useLanguage';
import { XCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

const UpdateAdmin = ({ config }) => {
  const translate = useLanguage();

  const { profileContextAction } = useProfileContext();
  const { updatePanel } = profileContextAction;
  const dispatch = useDispatch();
  const { ENTITY_NAME } = config;

  const currentAdmin = useSelector(selectCurrentAdmin);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(currentAdmin);
  }, [currentAdmin]);

  const handleSubmit = () => {
    form.submit();
  };

  const onSubmit = (fieldsValue) => {
    if (fieldsValue.file) {
      fieldsValue.file = fieldsValue.file[0].originFileObj;
    }

    dispatch(updateProfile({ entity: 'admin/profile', jsonData: fieldsValue }));
  };

  return (
    <div>
      <PageHeader
        onBack={() => updatePanel.close()}
        title={ENTITY_NAME}
        ghost={false}
        extra={[
          <Button
            onClick={() => updatePanel.close()}
            key={`${uniqueId()}`}
            icon={<Icon component={XCircleIcon} />}
          >
            {translate('Close')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              handleSubmit();
              updatePanel.close();
            }}
            type="primary"
            icon={<Icon component={CheckIcon} />}
            htmlType="submit"
          >
            {translate('Save')}
          </Button>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Row align="start">
        <Col xs={{ span: 24 }} sm={{ span: 6 }} md={{ span: 4 }}></Col>
        <Col xs={{ span: 16 }}>
          <Form
            form={form}
            onFinish={onSubmit}
            labelAlign="left"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 10 }}
          >
            <ProfileAdminForm isUpdateForm={true} />
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateAdmin;
