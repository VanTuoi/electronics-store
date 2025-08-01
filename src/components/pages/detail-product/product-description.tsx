import "./product-description.css";

import DOMPurify from "dompurify";
import { memo } from "react";

import { Product } from "~/types";

interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription = memo(({ product }: ProductDescriptionProps) => {
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
});

export default ProductDescription;
