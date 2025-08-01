import { useEffect } from "react";

export const useEnvironmentStyles = (isAdmin: boolean) => {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const bootstrapLinks = Array.from(document.querySelectorAll<HTMLLinkElement>('link[href*="bootstrap"]'));
    bootstrapLinks.forEach(link => link.remove());

    const styleLinks = Array.from(document.querySelectorAll<HTMLLinkElement>('link[href*="/style-"]'));
    styleLinks.forEach(link => link.remove());

    if (isAdmin) {
      import("~/styles/admin.css");
    } else {
      const hasBootstrap = document.querySelector('link[href*="bootstrap"]');
      if (!hasBootstrap) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/bootstrap.min.css";
        document.head.appendChild(link);
      }
    }
  }, [isAdmin]);
};
