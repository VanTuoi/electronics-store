import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }: PropsWithChildren) => (
    <>
        {children}
        <Toaster
            toastOptions={{
                style: {
                    zIndex: 999999
                }
            }}
            containerStyle={{ zIndex: 999999 }}
        />
    </>
);

export default Providers;
