export const loadSCSS = (url: string) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  link.dataset.scope = "layout-styles";
  document.head.appendChild(link);

  return () => {
    if (link.parentNode) {
      document.head.removeChild(link);
    }
  };
};

export const unloadScopedStyles = () => {
  document.querySelectorAll('link[data-scope="layout-styles"]').forEach(link => {
    document.head.removeChild(link);
  });
};
