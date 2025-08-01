import { useAtom } from "jotai";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "~/components/pages";
import { userAtom } from "~/stores";

const Login = () => {
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);

  useEffect(() => {
    if (user?.user?.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
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
};

export default Login;
