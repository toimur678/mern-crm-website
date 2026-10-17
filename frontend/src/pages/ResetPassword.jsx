import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import { Form, Button } from 'antd';
import ResetPasswordForm from '@/forms/ResetPasswordForm';
import AuthModule from '@/modules/AuthModule';

export default function ResetPassword() {
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const navigate = useNavigate();
  const { userId, resetToken } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);
  return (
    <AuthModule
      AUTH_TITLE="Reset Password"
      authContent={
        <Form
          layout="vertical"
          name="reset_password"
          className="login-form"
          onFinish={(values) =>
            dispatch(
              resetPassword({
                resetPasswordData: { password: values.password, userId, resetToken },
              })
            )
          }
        >
          <ResetPasswordForm />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              loading={isLoading}
            >
              Update password
            </Button>
          </Form.Item>
          <Link className="auth-back-link" to="/login">
            Back to sign in
          </Link>
        </Form>
      }
    />
  );
}
