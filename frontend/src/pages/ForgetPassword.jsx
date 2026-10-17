import { Link } from 'react-router-dom';
import { Form, Button } from 'antd';
import { ArrowLeftIcon, EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import useOnFetch from '@/hooks/useOnFetch';
import { request } from '@/request';
import ForgetPasswordForm from '@/forms/ForgetPasswordForm';
import AuthModule from '@/modules/AuthModule';

export default function ForgetPassword() {
  const { onFetch, isSuccess, isLoading } = useOnFetch();
  return (
    <AuthModule
      AUTH_TITLE={isSuccess ? 'Check your email' : 'Forget Password'}
      authContent={
        isSuccess ? (
          <div className="auth-success">
            <span className="auth-success-icon">
              <EnvelopeOpenIcon />
            </span>
            <p>
              If an account exists for that address, you’ll receive instructions to reset your
              password. Check your spam folder, too.
            </p>
            <Link className="auth-back-link" to="/login">
              <ArrowLeftIcon /> Back to sign in
            </Link>
          </div>
        ) : (
          <Form
            layout="vertical"
            name="forgot_password"
            className="login-form"
            onFinish={(values) =>
              onFetch(request.post({ entity: 'forgetpassword', jsonData: values }))
            }
          >
            <ForgetPasswordForm />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={isLoading}
                size="large"
              >
                Send reset link
              </Button>
            </Form.Item>
            <Link className="auth-back-link" to="/login">
              <ArrowLeftIcon /> Back to sign in
            </Link>
          </Form>
        )
      }
    />
  );
}
