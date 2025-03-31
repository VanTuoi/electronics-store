import { useEffect } from "react";
import { Link } from "react-router-dom";

interface IntroduceProps {
    breadcrumbs: [string, string][];
    title: string;
}

export const Breadcrumbs = ({ breadcrumbs, title }: IntroduceProps) => {
    useEffect(() => {
        window.scrollTo({
            top: 265,
            behavior: "smooth"
        });
    }, []);

    return (
        <section
            className="hero-wrap hero-wrap-2 js-fullheight"
            style={{ backgroundImage: "url('/imgs/bg/bg.jpg')" }}
            data-stellar-background-ratio="0.5"
        >
            <div className="overlay"></div>
            <div className="container">
                <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
                    <div className="col-md-9 pb-5">
                        <p className="breadcrumbs">
                            <span className="mr-2">
                                <Link to="/">
                                    Trang chủ <i className="fa fa-chevron-right"></i>
                                </Link>
                            </span>
                            {breadcrumbs.map(([text, url], index) => (
                                <span key={index} className="mr-2">
                                    <Link to={url}>
                                        {text} <i className="fa fa-chevron-right"></i>
                                    </Link>
                                </span>
                            ))}
                        </p>
                        <h1 className="mb-3 bread">{title}</h1>
                    </div>
                </div>
            </div>
        </section>
    );
};
