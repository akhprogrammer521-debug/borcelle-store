// These are the image paths already used in your uploaded component.
import Tshirt1 from "../assets/products_cloth/image 24.png";
import Tshirt2 from "../assets/products_cloth/image 26.png";
import Tshirt3 from "../assets/products_cloth/image 30.png";
import Tshirt4 from "../assets/products_cloth/image 34.png";
import Tshirt5 from "../assets/products_cloth/image 35.png";
import Tshirt6 from "../assets/products_cloth/image 36.png";

// Sample data: replace these values and image paths with your product data.
export const productDetails = {
    id: "cotton-shirt-23421",
    title: "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
    inStock: true,
    rating: 4.5,
    summary:
        "Ask the supplier about available sizes, colors, customization and order quantities.",

    images: [
        { id: "image-1", src: Tshirt1, alt: "Product image 1" },
        { id: "image-2", src: Tshirt2, alt: "Product image 2" },
        { id: "image-3", src: Tshirt3, alt: "Product image 3" },
        { id: "image-4", src: Tshirt4, alt: "Product image 4" },
        { id: "image-5", src: Tshirt5, alt: "Product image 5" },
        { id: "image-6", src: Tshirt6, alt: "Product image 6" },
    ],

    statistics: [
        { id: "reviews", icon: "reviews", count: 32, label: "reviews" },
        { id: "sold", icon: "sold", count: 154, label: "sold" },
    ],

    priceTiers: [
        { id: "small-order", price: 98, quantity: "50-100 pcs" },
        { id: "medium-order", price: 90, quantity: "100-700 pcs" },
        { id: "large-order", price: 78, quantity: "700+ pcs" },
    ],

    // Each group is an object of label/value pairs.
    detailGroups: [
        { id: "price", values: { Price: "Negotiable" } },
        {
            id: "attributes",
            values: {
                Condition: "Brand new",
                Material: "Cotton material",
                Category: "Casual shirts",
                "Item num": "23421",
            },
        },
        {
            id: "policies",
            values: {
                Customization: "Customized logo and design custom packages",
                Protection: "Refund Policy",
                Warranty: "2 years full warranty",
            },
        },
    ],

    supplier: {
        name: "Guanjoi Trading LLC",
        avatar: "R",
        features: [
            { id: "location", icon: "location", text: "Germany, Berlin", symbol: "🇩🇪" },
            { id: "verified", icon: "verified", text: "Verified Seller" },
            { id: "shipping", icon: "shipping", text: "Worldwide shipping" },
        ],
    },

    // The same tab renderer handles paragraphs, detail objects and feature arrays.
    tabs: [
        {
            id: "desc",
            title: "Description",
            paragraphs: [
                {
                    id: "description-1",
                    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                },
                {
                    id: "description-2",
                    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                },
            ],
            // Placeholder specifications retained from your uploaded example.
            details: {
                Model: "#8786867",
                Style: "Classic style",
                Certificate: "ISO-898921212",
                Size: "34mm x 450mm x 19mm",
                Memory: "36GB RAM",
            },
            features: [
                { id: "feature-1", text: "Some great feature name here" },
                { id: "feature-2", text: "Lorem ipsum dolor sit amet, consectetur" },
                { id: "feature-3", text: "Duis aute irure dolor in reprehenderit" },
                { id: "feature-4", text: "Some great feature name here" },
            ],
        },
        {
            id: "review",
            title: "Reviews",
            paragraphs: [
                { id: "review-info", text: "Written reviews are currently unavailable." },
            ],
        },
        {
            id: "ship",
            title: "Shipping",
            details: {
                Availability: "Worldwide shipping",
                "Delivery time": "Confirm with the supplier",
                "Shipping cost": "Depends on destination and order quantity",
            },
        },
        {
            id: "about",
            title: "About seller",
            details: {
                Supplier: "Guanjoi Trading LLC",
                Location: "Germany, Berlin",
                Status: "Verified Seller",
            },
        },
    ],

    // Demo recommendations reuse your available image imports.
    likedProducts: [
        { id: "liked-1", image: Tshirt1, model: "Men Blazers Sets Elegant Formal", price1: 7, price2: 99.5 },
        { id: "liked-2", image: Tshirt2, model: "Men Shirt Sleeve Polo Contrast", price1: 7, price2: 99.5 },
        { id: "liked-3", image: Tshirt3, model: "Men Casual Clothing Collection", price1: 7, price2: 99.5 },
        { id: "liked-4", image: Tshirt4, model: "Everyday T-shirts for Men", price1: 7, price2: 99.5 },
        { id: "liked-5", image: Tshirt5, model: "New Summer Men's Collection", price1: 7, price2: 99.5 },
    ],

    relatedProducts: [
        { id: "related-1", image: Tshirt1, model: "T-shirts with multiple colors, for men", price1: 10.3, price2: 40 },
        { id: "related-2", image: Tshirt4, model: "T-shirts with multiple colors, for men", price1: 10.3, price2: 40 },
        { id: "related-3", image: Tshirt2, model: "T-shirts with multiple colors, for men", price1: 10.3, price2: 40 },
        { id: "related-4", image: Tshirt3, model: "T-shirts with multiple colors, for men", price1: 10.3, price2: 40 },
        { id: "related-5", image: Tshirt5, model: "T-shirts with multiple colors, for men", price1: 10.3, price2: 40 },
        { id: "related-6", image: Tshirt6, model: "T-shirts with multiple colors, for men", price1: 10.3, price2: 40 },
    ],
};
