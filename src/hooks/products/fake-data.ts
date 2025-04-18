import { Product } from "~/types";

export const fakeProducts: Product[] = Array.from({ length: 23 }, (_, index) => {
    const id = `DLP1-3P60LS-${index + 1}`;
    const name = `Tủ điện phân phối chiếu sáng ngoài trời 3P 60A LS ${index + 1}`;
    const isEven = index % 2 === 0;
    const category = {
        name: !isEven ? "Tủ điều khiển" : "Tủ phân phối",
        id: "67ffadb1df633387fbfce3b1"
    };
    const baseImage = `/imgs/product_1.png`;
    const price = (index + 1) * 1_000_000;

    const isPriceText = index % (3 + (index % 2)) === 0;
    const hasDiscount = index % 2 === 0;
    const discountPercent = hasDiscount ? 10 + (index % 3) * 5 : undefined;
    const discountPrice = discountPercent ? Math.round(price * (1 - discountPercent / 100)) : undefined;

    return {
        id,
        name,
        code: id,
        category,
        description: `Mô tả chi tiết cho ${name} - thuộc loại ${category}, thiết kế chắc chắn, độ bền cao.`,
        usage: "Dùng để phân phối và điều khiển nguồn điện trong công nghiệp và dân dụng.",
        price,
        priceText: isPriceText ? `Giá liên hệ` : ``,
        discountPercent,
        discountPrice,
        images: [{ url: baseImage, isMain: true }, { url: "/imgs/product_2.png" }, { url: "/imgs/product_3.png" }],
        specs: [
            { key: "Chất liệu", value: "Thép sơn tĩnh điện" },
            { key: "Cấp bảo vệ", value: isEven ? "IP55" : "IP65" },
            { key: "Điện áp vào", value: "3P 60A 220/380A 50/60Hz" },
            { key: "Điện áp ra", value: "1P+N 32A (3 Output), 16A (3 Output)" },
            { key: "Trọng lượng", value: `${20 + index}kg` }
        ],
        material: "Thép sơn tĩnh điện",
        capacity: `${30 + index}A`,
        inputVoltage: "3P 60A 220/380A 50/60Hz",
        outputVoltage: "1P+N 32A (3 Output), 16A (3 Output)",
        protectionLevel: isEven ? "IP55" : "IP65",
        weightKg: 20 + index,
        origin: "Việt Nam",
        dimensions: {
            width: 600 + (index % 3) * 50,
            height: 800 + (index % 4) * 50,
            depth: 250,
            unit: "mm"
        },
        features: ["Chống nước", "Cửa mica", "Có quạt thông gió"],
        url: `https://example.com/san-pham/${id}`
    };
});
