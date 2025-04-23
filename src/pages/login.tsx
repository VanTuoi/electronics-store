import { memo } from "react";
import { LoginForm } from "~/components/pages/login/login-form";

const Login = memo(() => (
    <div className="login-page">
        <div className="container login-page-form min-vh-100 d-flex align-items-center justify-content-center">
            <LoginForm />
        </div>
    </div>
));

export default Login;
