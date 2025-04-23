import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Turnstile from "react-turnstile";
import { useLogin } from "~/hooks/auth/use-login";
import { loginSchema, type LoginFormData } from "~/utils/validation-schemas/form-login-schema";

const LoginForm = () => {
    const navigate = useNavigate();
    const { login, loading, errorMessage } = useLogin(() => navigate("/admin"));
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
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
                <div className="row">
                    <div className="d-flex justify-content-center align-items-center">
                        <Link className="navbar-brand fs-4 fw-bold" to="/">
                            Electronics<span> Store</span>
                        </Link>
                        <img src="/logo.png" alt="Logo" width="40" height="40" />
                    </div>
                </div>

                <h4 className="text-center mb-4">Đăng nhập</h4>
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
                            autoComplete="username"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Mật khẩu
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            id="password"
                            {...register("password")}
                            autoComplete="current-password"
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                        <div className="form-check mt-2">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="showPassword"
                                onChange={e => setShowPassword(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="showPassword">
                                Hiện mật khẩu
                            </label>
                        </div>
                    </div>
                    <div className="mb-3 d-flex justify-content-center">
                        <Turnstile
                            sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                            onSuccess={token => setTurnstileToken(token)}
                            onError={() => setTurnstileToken(null)}
                        />
                    </div>
                    {errorMessage && <div className="text-danger pb-4">{errorMessage}</div>}
                    <button
                        type="submit"
                        className={`btn w-100 py-2 text-white bg-primary ${loading || !turnstileToken ? "disabled" : ""}`}
                        disabled={loading || !turnstileToken}
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>
                <div className="text-center mt-3">
                    <small>
                        Quên mật khẩu? <Link to="/forgot-password">Lấy lại mật khẩu</Link>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
