export const formatCurrency = (amount: number | string, locale = "VI") =>
    new Intl.NumberFormat(locale === "VI" ? "vi-VN" : "en-US", {
        style: "currency",
        currency: locale === "VI" ? "VND" : "USD",
        minimumFractionDigits: 0
    }).format(typeof amount !== "number" ? parseFloat(amount) : amount);
