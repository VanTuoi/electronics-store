import DOMPurify from "dompurify";
import { Product } from "~/types";
import "./product-description.css";

interface ProductDescriptionProps {
    product: Product;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
    const createMarkup = (html: string) => ({
        __html: DOMPurify.sanitize(html, {
            ALLOWED_TAGS: [
                "p",
                "br",
                "strong",
                "em",
                "u",
                "h1",
                "h2",
                "h3",
                "h4",
                "ul",
                "ol",
                "li",
                "img",
                "a",
                "table",
                "tr",
                "td",
                "th"
            ],
            ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "style"],
            ADD_ATTR: ["loading"]
        })
    });

    return (
        <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
            <div
                dangerouslySetInnerHTML={createMarkup(product.description || "")}
                className="product-description prose max-w-none"
            />
        </div>
    );
};

export default ProductDescription;
