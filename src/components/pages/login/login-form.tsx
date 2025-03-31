import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Turnstile from "react-turnstile";
import { useLogin } from "~/hooks/auth/use-login";
import { loginSchema, type LoginFormData } from "~/utils/validation-schemas/form-login-schema";

const LoginForm = () => {
    const { login, loading, error } = useLogin();
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = (data: LoginFormData) => {
        if (!turnstileToken) {
            return;
        }
        login(data);
    };

    return (
        <div className="card shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
            <div className="card-body p-5">
                <h2 className="text-center mb-4">Đăng nhập</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            id="email"
                            {...register("email")}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            id="password"
                            {...register("password")}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>
                    <div className="mb-3 d-flex justify-content-center">
                        <Turnstile
                            sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                            onSuccess={token => setTurnstileToken(token)}
                            onError={() => setTurnstileToken(null)}
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error.message}</div>}
                    <button
                        type="submit"
                        className="btn w-100 py-2 text-white"
                        style={{ backgroundColor: "#00FF7F" }}
                        disabled={loading || !turnstileToken}
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>
                <div className="text-center mt-3">
                    <small>
                        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
