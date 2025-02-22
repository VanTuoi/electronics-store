import { Link } from "react-router-dom";

const Footer = () => (
    <footer>
        <div className="container-fluid copyright py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center text-md-start mb-3 mb-md-0">
                        &copy;{" "}
                        <Link className="border-bottom text-primary" to="/">
                            Electronics Store
                        </Link>
                        , All Right Reserved.
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
