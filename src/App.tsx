// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Layout from "./layouts/Layout";
import Providers from "./providers";
import "./styles/style.css";

const App = () => (
    <Providers>
        <Layout />
    </Providers>
);

export default App;
