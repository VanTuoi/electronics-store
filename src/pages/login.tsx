import { Helmet } from "react-helmet";

import { LoginForm } from "~/components/pages";

const Login = () => (
  <div className="login-page">
    <Helmet>
      <title>Đăng nhập | Electronics Store</title>
      <meta
        name="description"
        content="Đăng nhập để truy cập tài khoản của bạn và trải nghiệm các dịch vụ từ Electronics Store."
      />
    </Helmet>

    <div className="container login-page-form min-vh-100 d-flex align-items-center justify-content-center">
      <LoginForm />
    </div>
  </div>
);

export default Login;
