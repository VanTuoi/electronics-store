import { useEffect } from "react";

export const useEnvironmentStyles = (isAdmin: boolean) => {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const bootstrapLinks = Array.from(document.querySelectorAll<HTMLLinkElement>('link[href*="bootstrap"]'));

    if (isAdmin) {
      bootstrapLinks.forEach(link => link.remove());
      import("~/styles/admin.css");
    } else {
      if (!bootstrapLinks.length) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/bootstrap.min.css";
        document.head.appendChild(link);
      }
    }
  }, [isAdmin]);
};
