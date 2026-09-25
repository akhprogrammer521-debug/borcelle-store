export const API_Config = {
  BASE_URL: "https://training.tamkeen-dev.com/tamkeenstore/public/api",
  ENDPOINTS: {
    // AUTH
    AUTH: {
      REGISTER: "register",
      LOGIN: "login",
      RESEND: "resend",
      VERIFY: "verify",
    },

    // Contact Ua

    CONTACT_US: {
      CONTACT: "contact"
    },

    // categories

    CATS: {
      INDEX: "category",
      STORE: "category",
      UPDATE: "category",
      DELETE: "category",
      SHOW: "category"
    },

    // Products

    PRODUCTS: {
      INDEX: "product",
      MY_PRODUCTS: "product",
      STORE: "product",
      UPDATE: "product",
      DELETE: "product",
      SHOW: "product",
      PRODUCT_VARIANT: "/product-variant"
    },

    // Cart
    CART: {
      INDEX: "cart",
      STORE: "cart",
      DELETE: "cart",
      NEW_REQUEST: "cart"
    }
  },
};
