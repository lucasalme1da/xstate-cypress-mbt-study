/* eslint-disable no-undef */
/// <reference types="cypress" />

import { Machine } from "xstate";
import { createModel } from "@xstate/test";
import { akauntingStates } from "./states";

import { faker } from "@faker-js/faker";
import { loginElements } from "./elements/login";
import { menuElements } from "./elements/menu";
import { vendorsElements } from "./elements/vendors";
import { itemsElements } from "./elements/items";
import { invoicesElements } from "./elements/invoices";
import { categoriesElements } from "./elements/categories";
import { profitElements } from "./elements/profit";
import { transactionElements } from "./elements/transaction";
import { profileElements } from "./elements/profile";
import { revenuesElements } from "./elements/revenues";
import { customerElements } from "./elements/customer";

const assertPage = (page = "") => cy.get("h1").should("contain.text", page);

const assertMessage = (message = "") =>
  cy
    .xpath("/html/body/div/div/section[2]/div[1]")
    .should("contain.text", message);

const assertErrorMessage = (message = "") =>
  cy
    .xpath("/html/body/div/div/section[2]/div/form/div[1]/div[2]/p")
    .should("contain.text", message);

const addTests = (state, tests) => {
  return {
    ...state,
    states: Object.entries(state.states).reduce((s, [stateKey, stateValue]) => {
      return {
        ...s,
        [stateKey]: {
          ...stateValue,
          meta: {
            ...stateValue.meta,
            test: tests[stateKey],
          },
        },
      };
    }, {}),
  };
};

describe("akaunting app", () => {
  const vendors = [];
  const items = [];
  const invoices = [1, 2];
  const customers = [];

  /**
   * Assertivas dos estados da MEF
   */
  const assertivas = {
    LOGGED_OFF: () => {
      loginElements.loginEmail().should("be.visible");
      loginElements.loginPassword().should("be.visible");
      loginElements.loginButton().should("be.visible");
    },
    DASHBOARD: () => {
      assertPage("Dashboard");
    },
    VENDORS: () => {
      assertPage("Vendors");
    },
    ITEMS: () => {
      assertPage("Items");
    },
    INVOICES: () => {
      assertPage("Invoices");
    },
    CATEGORIES: () => {
      assertPage("Categories");
    },
    PROFIT: () => {
      assertPage("Profit & Loss");
    },
    TRANSACTIONS: () => {
      assertPage("Transactions");
    },
    PROFILE: () => {
      assertPage("Edit User");
    },
    CUSTOMERS: () => {
      assertPage("Customers");
    },
    REVENUES: () => {
      assertPage("Revenues");
    },
    VENDOR_ADDED: () => {
      assertMessage("Vendor added!");
    },
    VENDOR_FAIL_EXISTING: () => {
      assertErrorMessage("The email has already been taken.");
    },
    VENDOR_FAIL_WRONG_EMAIL: () => {
      assertErrorMessage("The email must be a valid email address.");
    },
    ITEM_ADDED: () => {
      assertMessage("Item added!");
    },
    ITEM_FAIL_EXISTING: () => {
      assertErrorMessage("The sku has already been taken.");
    },
    ITEM_DELETED: () => {
      assertMessage("Item deleted!");
    },
    INVOICE_ADDED: () => {
      assertPage(`Invoice: INV-`);
    },
    INVOICE_CHECKED: () => {
      assertPage(`Invoice: INV-`);
    },
    CATEGORY_UPDATED: () => {
      assertMessage("Category updated!");
    },
    PROFIT_ZERO: () => {
      const { netProfit } = profitElements;

      netProfit().should("contain.text", "$0.00");
    },
    TRANSACTION_WITH_TRANSFER: () => {
      assertMessage("Transfer");
    },
    PROFILE_LANGUAGE_CHANGED: () => {
      assertMessage("Usuário atualizado!");
    },
    REVENUE_ADDED: () => {
      assertPage("New Revenue");
    },
    CUSTOMER_ADDED: () => {
      assertPage("Add New");
    },
    CUSTOMER_INVOICE_ADDED: () => {
      assertPage(`New Invoice`);
    },
  };

  console.log(`Número de estados: ${Object.keys(assertivas).length}`);

  const akauntingMachine = Machine(addTests(akauntingStates, assertivas));

  const events = {
    LOGIN: () => {
      loginElements.loginEmail().type("test@test.com", { delay: 0 });
      loginElements.loginPassword().type("test", { delay: 0 });
      loginElements.loginButton().click();
    },
    TO_VENDORS: () => {
      menuElements.expenses().click();
      menuElements.vendors().click();
    },
    TO_ITEMS: () => {
      menuElements.items().click();
    },
    TO_INVOICES: () => {
      menuElements.incomes().click();
      menuElements.invoices().click();
    },
    TO_CATEGORIES: () => {
      menuElements.settings().click();
      menuElements.categories().click();
    },
    TO_PROFIT: () => {
      menuElements.reports().click();
      menuElements.profitLoss().click();
    },
    TO_TRANSACTIONS: () => {
      menuElements.banking().click();
      menuElements.transaction().click();
    },
    TO_PROFILE: () => {
      menuElements.profile().click();
      menuElements.profileButton().click();
    },
    TO_CUSTOMERS: () => {
      menuElements.incomes().click();
      menuElements.customers().click();
    },
    TO_REVENUES: () => {
      menuElements.incomes().click();
      menuElements.btnRevenues().click();
    },
    ADD_VENDOR: () => {
      const newVendor = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        tax: 1,
        phone: faker.phone.number("502######"),
        website: faker.internet.url(),
        address: "nothing",
      };

      const {
        addVendorsButton,
        name,
        email,
        tax_number,
        currency,
        usDollar,
        phone,
        website,
        address,
        enabled,
        save,
      } = vendorsElements;

      addVendorsButton().click();

      name().type(newVendor.name, { delay: 0 });
      email().type(newVendor.email, { delay: 0 });
      tax_number().type(newVendor.tax, { delay: 0 });
      currency().click();
      usDollar().click();
      phone().type(newVendor.phone, { delay: 0 });
      website().type(newVendor.website, { delay: 0 });
      address().type(newVendor.address, { delay: 0 });
      enabled().click();
      save().click();

      vendors.push(newVendor);
    },
    ADD_VENDOR_EXISTING: () => {
      const {
        addVendorsButton,
        name,
        email,
        tax_number,
        currency,
        usDollar,
        phone,
        website,
        address,
        enabled,
        save,
      } = vendorsElements;

      addVendorsButton().click();

      name().type(vendors[0].name, { delay: 0 });
      email().type(vendors[0].email, { delay: 0 });
      tax_number().type(vendors[0].tax, { delay: 0 });
      currency().click();
      usDollar().click();
      phone().type(vendors[0].phone, { delay: 0 });
      website().type(vendors[0].website, { delay: 0 });
      address().type(vendors[0].address, { delay: 0 });
      enabled().click();
      save().click();
    },
    ADD_VENDOR_WRONG_EMAIL: () => {
      const newVendor = {
        name: faker.name.firstName(),
        email: faker.internet.email().replace("@", "%"),
        tax: 1,
        phone: faker.phone.number("502######"),
        website: faker.internet.url(),
        address: "nothing",
      };

      const {
        addVendorsButton,
        name,
        email,
        tax_number,
        currency,
        usDollar,
        phone,
        website,
        address,
        enabled,
        save,
      } = vendorsElements;

      addVendorsButton().click();

      name().type(newVendor.name, { delay: 0 });
      email().type(newVendor.email, { delay: 0 });
      tax_number().type(newVendor.tax, { delay: 0 });
      currency().click();
      usDollar().click();
      phone().type(newVendor.phone, { delay: 0 });
      website().type(newVendor.website, { delay: 0 });
      address().type(newVendor.address, { delay: 0 });
      enabled().click();
      save().click();
    },
    ADD_ITEM: () => {
      const newItem = {
        pname: faker.commerce.product(),
        skup: faker.random.numeric(1, {
          bannedDigits: items.map((i) => i.skup),
        }),
        description: faker.lorem.sentence(10),
        salePrice: 1000 + (Number(faker.random.numeric(3)) - 500),
        purchasePrice: 1000 + (Number(faker.random.numeric(3)) + 500),
        quantity: faker.random.numeric(2),
      };

      const {
        name,
        sku,
        description,
        salePrice,
        purchasePrice,
        quantity,
        spinnerTax,
        spinnerCategory,
        enabled,
        save,
        addItemsButton,
      } = itemsElements;

      addItemsButton().click();

      name().type(newItem.pname, { delay: 0 });
      sku().type(newItem.skup, { delay: 0 });
      description().type(newItem.description, { delay: 0 });
      salePrice().type(newItem.salePrice, { delay: 0 });
      purchasePrice().type(newItem.purchasePrice, { delay: 0 });
      quantity().type(newItem.quantity, { delay: 0 });
      spinnerTax().click();
      cy.get(".select2-search__field")
        .type("Tax Exempt", { delay: 0 })
        .type("{enter}", { delay: 0 });
      spinnerCategory().click();
      cy.get(".select2-search__field")
        .type("General", { delay: 0 })
        .type("{enter}", { delay: 0 });
      enabled().click();
      save().click();

      items.push(newItem);
    },
    ADD_ITEM_EXISTING: () => {
      const {
        name,
        sku,
        description,
        salePrice,
        purchasePrice,
        quantity,
        spinnerTax,
        taxButton,
        spinnerCategory,
        general,
        enabled,
        save,
        addItemsButton,
      } = itemsElements;

      addItemsButton().click();

      name().type(items[0].pname, { delay: 0 });
      sku().type(items[0].skup, { delay: 0 });
      description().type(items[0].description, { delay: 0 });
      salePrice().type(items[0].salePrice, { delay: 0 });
      purchasePrice().type(items[0].purchasePrice, { delay: 0 });
      quantity().type(items[0].quantity, { delay: 0 });
      spinnerTax().click();
      cy.get(".select2-search__field")
        .type("Tax Exempt", { delay: 0 })
        .type("{enter}", { delay: 0 });

      spinnerCategory().click();
      cy.get(".select2-search__field")
        .type("General", { delay: 0 })
        .type("{enter}", { delay: 0 });
      enabled().click();
      save().click();
    },
    DELETE_ITEM: () => {
      const { confirm } = itemsElements;

      cy.get(".btn.btn-default.dropdown-toggle").first().click();
      cy.get("button[class='delete-link']").first().click();
      confirm().click();
    },
    ADD_INVOICE: () => {
      const {
        addInvoicesButton,
        addNewCustomer,
        name,
        email,
        taxNumber,
        address,
        saveCustomer,
        selectDayInvoice,
        selectDayDue,
        orderNumber,
        itemsName,
        quantity,
        prices,
        notes,
        sppinerCategory,
        deposit,
        save,
      } = invoicesElements;

      addInvoicesButton().click();

      addNewCustomer().click();

      const firstname = faker.name.firstName();

      const newCustomer = {
        name: firstname,
        email: faker.internet.email(firstname),
        taxNumber: faker.random.numeric(1),
        address: faker.address.streetAddress(),
      };

      cy.wait(10000);

      name().type(newCustomer.name, { delay: 0 });
      email().type(newCustomer.email, { delay: 0 });
      taxNumber().type(newCustomer.taxNumber, { delay: 0 });
      address().type(newCustomer.address, { delay: 0 });

      saveCustomer().click();

      cy.wait(10000);

      orderNumber().type(1, { delay: 0 });

      selectDayInvoice().type("{selectall}2018-10-10", {
        delay: 0,
      });
      selectDayDue().type(`{selectall}2018-10-20`, {
        delay: 0,
      });

      itemsName().type(faker.commerce.product(), { delay: 0 });

      quantity().type(1, { delay: 0 });
      cy.wait(200);

      prices().type("{selectall}800", {
        delay: 0,
      });
      cy.wait(200);

      cy.get(
        "td .select2.select2-container.select2-container--default"
      ).click();

      cy.get(".select2-search__field")
        .type("Tax Exempt", { delay: 0 })
        .type("{enter}", { delay: 0 });

      cy.wait(200);

      notes().type(faker.lorem.words(3), { delay: 0 });
      cy.wait(200);

      sppinerCategory().click();
      deposit().click();
      save().click();

      invoices.push(invoices.length + 1);
    },
    CHECK_ADDED_INVOICE: () => {
      const { incomes, invoices } = menuElements;
      const { showButton } = invoicesElements;

      incomes().click();
      invoices().click();
      showButton().click();
    },
    UPDATE_CATEGORY_CORRECT_COLOR: () => {
      const { general, colour, save } = categoriesElements;

      general().click();

      colour().type("{selectall}#0b0c0d", { delay: 0 });

      save().click();
    },
    UPDATE_CATEGORY_WRONG_COLOR: () => {
      const { general, colour, save } = categoriesElements;

      general().click();

      colour().type("{selectall}#/*/*/*/*/*/", { delay: 0 });

      save().click();
    },
    CHECK_CURRENT_PROFIT: () => {
      const { year } = profitElements;

      year().select("2018");
    },
    TRANSACTION_FILTER_BY_EXPENSE: () => {
      const { select, filter } = transactionElements;

      select().select("Expense");
      filter().click();
    },
    CHANGE_LANGUAGE: () => {
      const { name, password, password_confirmation, viewLanguages, save } =
        profileElements;

      name().type("{selectall}test2@teste.com", { delay: 0 });
      password().type("test", { delay: 0 });
      password_confirmation().type("test", { delay: 0 });
      viewLanguages().click();

      cy.get(".select2-search__field").type("Port{enter}", { delay: 0 });

      save().click();

      assertMessage("User updated!");

      menuElements.profile().click();
      menuElements.profileButton().click();

      name().type("{selectall}test2@teste.com", { delay: 0 });
      password().type("test", { delay: 0 });
      password_confirmation().type("test", { delay: 0 });
      viewLanguages().click();

      cy.get(".select2-search__field").type("English{enter}", { delay: 0 });

      save().click();
    },
    ADD_REVENUE: () => {
      const { category, btnOk, btnAdd } = revenuesElements;

      btnAdd().click();
      category().click();
      cy.get(".select2-search__field").type("Sales{enter}", { delay: 0 });
      btnOk().click();
    },
    ADD_CUSTOMER: () => {
      const { btnAdd, name, submit } = customerElements;

      btnAdd().click();

      const newCustomer = faker.name.firstName();

      name().type(newCustomer, { delay: 0 });
      submit().click();

      customers.push(newCustomer);
    },
    ADD_CUSTOMER_INVOICE: () => {
      const { invoices: cinv } = menuElements;

      cinv().click();

      const {
        btnAdd,
        customerSelect,
        selectDayInvoice,
        selectDayDue,
        orderNumber,
        itemsName,
        quantity,
        prices,
        notes,
        sppinerCategory,
        deposit,
        save,
      } = invoicesElements;

      btnAdd().click();
      customerSelect().click();

      cy.get(".select2-search__field")
        .type(customers[customers.length - 1], { delay: 0 })
        .type("{enter}", { delay: 0 });

      orderNumber().type(1, { delay: 0 });

      selectDayInvoice().type("{selectall}2018-10-10", {
        delay: 0,
      });
      selectDayDue().type(`{selectall}2018-10-20`, {
        delay: 0,
      });

      itemsName().type(faker.commerce.product(), { delay: 0 });

      quantity().type(1, { delay: 0 });
      cy.wait(200);

      prices().type("{selectall}800", {
        delay: 0,
      });
      cy.wait(200);

      cy.get(
        "td .select2.select2-container.select2-container--default"
      ).click();

      cy.get(".select2-search__field")
        .type("Tax Exempt", { delay: 0 })
        .type("{enter}", { delay: 0 });

      cy.wait(200);

      notes().type(faker.lorem.words(3), { delay: 0 });
      cy.wait(200);

      sppinerCategory().click();
      deposit().click();
      save().click();

      invoices.push(invoices.length + 1);
    },
  };

  console.log(`Número de eventos: ${Object.keys(events).length}`);

  const testModel = createModel(akauntingMachine, {
    events,
  });

  const testPlans = testModel.getSimplePathPlans();

  console.log(testPlans);

  console.log(JSON.stringify(akauntingStates));

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        it(path.description, () => {
          return cy.visit("/").then(() => {
            return path.test();
          });
        });
      });
    });
  });

  describe("coverage", () => {
    it("should pass", () => {
      testModel.testCoverage();
    });
  });
});
