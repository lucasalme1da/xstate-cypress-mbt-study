export const fireflyStatesBeforeRegister = {
  id: "firefly - before register",
  initial: "BEGIN",
  states: {
    BEGIN: {
      on: {
        REGISTER: "REGISTRED",
      },
    },
    REGISTRED: {},
  },
};

export const fireflyStatesAfterRegister = {
  id: "firefly - after register",
  initial: "LOGIN_PAGE",
  states: {
    LOGIN_PAGE: {
      on: {
        INVALID_LOGIN: "LOGIN_ERROR",
        LOGIN: "DASHBOARD",
      },
    },
    LOGIN_ERROR: {},
    DASHBOARD: {
      on: {
        LOGOUT: "LOGIN_PAGE",
        NEW_ACTIVE_ACCOUNT: "ACTIVE_ACCOUNT_CREATED",
        NEW_TAG: "TAG_CREATED",
        NEW_INVOICE: "INVOICE_CREATED",
        NEW_INVOICE_ERROR: "INVOICE_CREATION_ERROR",
        NEW_BUDGET: "BUDGET_CREATED",
        NEW_DEPOSIT: "DEPOSIT_DONE",
        TO_INCOME: "INCOME",
        TO_BILL: "BILL",
        TO_PIGGYBANK: "PIGGYBANK",
        NEW_REPORT: "REPORT_CREATED",
        NEW_CATEGORY: "CATEGORY_CREATED",
      },
    },
    ACTIVE_ACCOUNT_CREATED: {},
    TAG_CREATED: {},
    INVOICE_CREATED: {},
    INVOICE_CREATION_ERROR: {},
    BUDGET_CREATED: {
      on: {
        TO_EXPENSES: "EXPENSES",
      },
    },
    DEPOSIT_DONE: {},
    INCOME: {
      on: {
        NEW_DEPOSIT_WITH_INCOME: "DEPOSIT_WITH_INCOME_DONE",
      },
    },
    BILL: {
      on: {
        NEW_BILL: "BILL_CREATED",
      },
    },
    BILL_CREATED: {},
    EXPENSES: {
      on: { NEW_WITHDRAW: "WITHDRAW_DONE" },
    },
    DEPOSIT_WITH_INCOME_DONE: {},
    WITHDRAW_DONE: {},
    PIGGYBANK: {
      on: {
        NEW_PIGGYBANK: "PIGGYBANK_CREATED",
      },
    },
    PIGGYBANK_CREATED: {
      on: {
        SAVE_ON_PIGGYBANK: "SAVED_ON_PIGGYBANK",
      },
    },
    SAVED_ON_PIGGYBANK: {},
    REPORT_CREATED: {},
    CATEGORY_CREATED: {
      on: {
        NEW_WITHDRAW_WITH_CATEGORY: "WITHDRAW_WITH_CATEGORY",
      },
    },
    WITHDRAW_WITH_CATEGORY: {
      on: {
        DELETE_ACCOUNT: "ACCOUNT_DELETED",
      },
    },
    ACCOUNT_DELETED: {},
  },
};

console.log(JSON.stringify(fireflyStatesBeforeRegister));
console.log(JSON.stringify(fireflyStatesAfterRegister));
