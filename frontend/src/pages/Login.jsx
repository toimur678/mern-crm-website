import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'antd';
import { login } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import LoginForm from '@/forms/LoginForm';
import AuthModule from '@/modules/AuthModule';

export default function LoginPage() {
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);
  return (
    <AuthModule
      AUTH_TITLE="Sign in"
      authContent={
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={(values) => dispatch(login({ loginData: values }))}
        >
          <LoginForm />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isLoading}
              size="large"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      }
    />
  );
}
