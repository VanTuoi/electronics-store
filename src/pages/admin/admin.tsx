import { useAtom } from "jotai";
import { memo, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEnvironmentStyles } from "~/hooks/use-environment-styles";
import AppLayout from "~/layouts/admin/app-layout";
import { userAtom } from "~/stores/auth";

const AdminHomePage = memo(() => {
    const navigate = useNavigate();
    const [user] = useAtom(userAtom);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEnvironmentStyles(true);

    useEffect(() => {
        if (user?.user?.role !== "admin") {
            setErrorMessage("Bạn không có quyền truy cập chức năng này !!!");
        }
        setIsLoading(false);
    }, [user]);

    const handleLoginRedirect = () => {
        navigate("/auth/login");
    };

    if (isLoading || errorMessage) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <div className="text-lg">{errorMessage}</div>
                <p className="mt-4 text-sm">
                    Đăng nhập để tiếp tục{" "}
                    <button className="text-blue-500 underline" onClick={handleLoginRedirect}>
                        tại đây
                    </button>
                </p>
            </div>
        );
    }

    return (
        <>
            <AppLayout />
            <Toaster />
        </>
    );
});

export default AdminHomePage;
