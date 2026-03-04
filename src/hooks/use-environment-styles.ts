import { useEffect } from "react";

export const useEnvironmentStyles = (isAdmin: boolean) => {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const removedNodes: (HTMLLinkElement | HTMLStyleElement)[] = [];

    const removeElements = (matchFn: (el: Element) => boolean) => {
      const elements = Array.from(document.head.children).filter(matchFn);
      elements.forEach(el => {
        removedNodes.push(el.cloneNode(true) as HTMLLinkElement | HTMLStyleElement);
        el.remove();
      });
    };

    removeElements(
      el =>
        (el.tagName === "LINK" &&
          !!(el as HTMLLinkElement).href &&
          (el as HTMLLinkElement).href.includes("bootstrap")) ||
        (el.tagName === "LINK" && !!(el as HTMLLinkElement).href && (el as HTMLLinkElement).href.includes("/style-")) ||
        (el.tagName === "STYLE" && !!el.textContent && el.textContent.includes("bootstrap"))
    );

    if (isAdmin) {
      import("~/styles/admin.css");
    }

    // eslint-disable-next-line consistent-return
    return () => {
      removedNodes.forEach(el => {
        document.head.appendChild(el);
      });
    };
  }, [isAdmin]);
};
