import { Outlet } from "react-router-dom";
import Providers from "./providers";

const App = () => (
    <Providers>
        <Outlet />
    </Providers>
);

export default App;
