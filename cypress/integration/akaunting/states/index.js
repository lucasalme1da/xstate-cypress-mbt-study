export const akauntingStates = {
  id: "akauting",
  initial: "LOGGED_OFF",
  states: {
    LOGGED_OFF: {
      on: {
        LOGIN: "DASHBOARD",
      },
    },
    DASHBOARD: {
      on: {
        TO_PROFILE: "PROFILE",
        TO_VENDORS: "VENDORS",
        TO_ITEMS: "ITEMS",
        TO_INVOICES: "INVOICES",
        TO_CATEGORIES: "CATEGORIES",
        TO_PROFIT: "PROFIT",
        TO_TRANSACTIONS: "TRANSACTIONS",
        TO_CUSTOMERS: "CUSTOMERS",
        TO_REVENUES: "REVENUES",
      },
    },
    VENDORS: {
      on: {
        ADD_VENDOR: "VENDOR_ADDED",
        ADD_VENDOR_EXISTING: "VENDOR_FAIL_EXISTING",
        ADD_VENDOR_WRONG_EMAIL: "VENDOR_FAIL_WRONG_EMAIL",
      },
    },
    VENDOR_ADDED: {},
    VENDOR_FAIL_EXISTING: {},
    VENDOR_FAIL_WRONG_EMAIL: {},
    ITEMS: {
      on: {
        ADD_ITEM: "ITEM_ADDED",
      },
    },
    ITEM_ADDED: {
      on: {
        ADD_ITEM_EXISTING: "ITEM_FAIL_EXISTING",
        DELETE_ITEM: "ITEM_DELETED",
      },
    },
    ITEM_DELETED: {},
    ITEM_FAIL_EXISTING: {},
    INVOICES: {
      on: {
        ADD_INVOICE: "INVOICE_ADDED",
      },
    },
    INVOICE_ADDED: {
      on: {
        CHECK_ADDED_INVOICE: "INVOICE_CHECKED",
      },
    },
    INVOICE_CHECKED: {},
    CATEGORIES: {
      on: {
        UPDATE_CATEGORY_CORRECT_COLOR: "CATEGORY_UPDATED",
        UPDATE_CATEGORY_WRONG_COLOR: "CATEGORY_UPDATED",
      },
    },
    CATEGORY_UPDATED: {},
    PROFIT: {
      on: {
        CHECK_CURRENT_PROFIT: "PROFIT_ZERO",
      },
    },
    PROFIT_ZERO: {},
    TRANSACTIONS: {
      on: {
        TRANSACTION_FILTER_BY_EXPENSE: "TRANSACTION_WITH_TRANSFER",
      },
    },
    TRANSACTION_WITH_TRANSFER: {},
    PROFILE: {
      on: {
        CHANGE_LANGUAGE: "PROFILE_LANGUAGE_CHANGED",
      },
    },
    PROFILE_LANGUAGE_CHANGED: {},
    CUSTOMERS: {
      on: {
        ADD_CUSTOMER: "CUSTOMER_ADDED",
      },
    },
    CUSTOMER_ADDED: {
      on: {
        ADD_CUSTOMER_INVOICE: "CUSTOMER_INVOICE_ADDED",
      },
    },
    CUSTOMER_INVOICE_ADDED: {},
    REVENUES: {
      on: {
        ADD_REVENUE: "REVENUE_ADDED",
      },
    },
    REVENUE_ADDED: {},
  },
};

console.log(JSON.stringify(akauntingStates));
