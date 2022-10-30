/* eslint-disable no-undef */
/// <reference types="cypress" />

import { Machine } from "xstate";
import { createModel } from "@xstate/test";
import { sysPassStates } from "./states";
import { v4 } from "uuid";

import { faker } from "@faker-js/faker";

const assertHelper = {
  modalOpen: (title = "") => {
    cy.get('div[class="mfp-content"]').should("be.visible");
    cy.get('h2[class="center"]').should("contain.text", title);
  },
  modalDelete: () =>
    cy
      .get(".mdl-card")
      .find('p[id="alert-text"]')
      .should("contain.text", "Delete item?"),
  checkIfTabIsActive: (tabNumber = -1, tabName = "") => {
    cy.get(`a[href="#tabs-${tabNumber}"]`).should("have.class", "is-active");
    cy.get(`a[href="#tabs-${tabNumber}"]`).should("contain.text", tabName);
  },
  checkIfTableIsEmpty: (tableId = "") =>
    cy.get(`tbody[id="${tableId}"]`).find("tr").should("have.length", 0),
  checkIfTableIsNotEmpty: (tableId = "") =>
    cy
      .get(`tbody[id="${tableId}"]`)
      .find("tr")
      .its("length")
      .should("be.gte", 1),
};

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

describe("feedback app", () => {
  let accounts = [];
  let notifications = [];
  let customers = [];
  let users = [];
  /**
   * Assertivas dos estados da MEF
   */
  const assertivas = {
    LOGIN_PAGE: () => {
      cy.get('div[data-page="login"]').should("be.visible");
    },
    SEARCH_ACCOUNTS_LIST: () => {
      cy.get('form[name="frmSearch"]').should("be.visible");
    },
    PROFILE_LIST_WITH_PROFILE_ADDED: () => {
      cy.get("#data-rows-tblProfiles")
        .find("tr")
        .not(':contains("Admin")') // Ignoring admin profile
        .should("have.length.greaterThan", 0);
    },
    GROUP_LIST_WITH_GROUP_ADDED: () => {
      cy.get("#data-rows-tblGroups")
        .find("tr")
        .not(':contains("Admins")') // Ignoring admins group
        .should("have.length.greaterThan", 0);
    },
    USER_LIST_WITH_USER_ADDED: () => {
      cy.get("#data-rows-tblUsers")
        .find("tr")
        .not(':contains("testuser")') // Ignoring admins group
        .should("have.length.greaterThan", 0);
    },
    SEARCH_ACCOUNTS_LIST_WITH_ACCOUNT_ADDED: () => {
      cy.get("#res-content").not(':contains("No records found")');
    },
    CATEGORY_LIST_WITH_CATEGORY_ADDED: () => {
      cy.get("#data-table-tblCategories")
        .find("tr")
        .should("have.length.greaterThan", 0);
    },
    LOGS_LIST: () => {
      cy.xpath(
        "//tbody[@id = 'resSearch']/tr/td[contains(text(), 'INFO')]"
      ).should("have.length.at.least", 1);
      cy.xpath(
        "//tbody[@id = 'resSearch']/tr/td[contains(text(), 'TESTUSER')]"
      ).should("have.length.at.least", 1);
    },
    SEARCH_ACCOUNTS_LIST_AS_CARDS: () => {
      cy.get(".account-actions").find("i").should("have.length.at.least", 6);
    },
    LOGGED_OFF: () => {
      cy.get('div[class="toast-message"]').should(
        "contain.text",
        "Session finished"
      );
    },
    MODAL_ACCOUNT_PASSWORD: () => {
      assertHelper.modalOpen("Account Password");
      cy.get(".dialog-user-text").should("contain.text", accounts[0].login);
      cy.get(".dialog-pass-text").should("contain.text", accounts[0].password);
    },
    ACCOUNT_DETAILS: () => {
      cy.get("#name").should("have.value", accounts[0].name);
      cy.get("tbody tr:nth-child(2) .selectize-control .item").should(
        "contain.text",
        accounts[0].customer
      );
      cy.get("tbody tr:nth-child(3) .selectize-control .item").should(
        "contain.text",
        accounts[0].category
      );
      cy.get("#login").should("have.value", accounts[0].login);
    },
    NOTIFICATION_LIST_WITH_ADDED_ITEM: () => {
      cy.get(`tbody[id="data-rows-tblNotices"]`)
        .find("tr")
        .should("have.length.at.least", 1);
    },
    NOTIFICATION_LIST_WITHOUT_ADDED_ITEM: () => {
      cy.get(`tbody[id="data-rows-tblNotices"]`)
        .find("tr")
        .should("not.contain.text", notifications[0].type);

      notifications = notifications.slice(1);
    },
    CUSTOMER_LIST_WITH_CUSTOMER_ADDED: () => {
      cy.get(`tbody[id="data-rows-tblCustomers"]`)
        .find("tr")
        .should("have.length.at.least", 1);
    },
    SEARCH_ACCOUNTS_LIST_WITH_ACCOUNT_DELETED: () => {
      cy.get("#btn-60").click();
      cy.wait(250);

      cy.get('a[href="#tabs-4"]').click();
      cy.xpath('//*[@id="btn-search-4"]').click();
      cy.xpath('//*[@id="search-4"]')
        .type(accounts[0].name, { delay: 0 })
        .type("{enter}");
      cy.wait(250);

      cy.get(`tbody[id="data-rows-tblAccounts"]`)
        .find("tr")
        .should("have.length", 0);
      accounts = accounts.slice(1);
    },
    CUSTOMER_LIST_WITH_CUSTOMER_DELETED: () => {
      cy.get(`tbody[id="data-rows-tblCustomers"]`).should(
        "not.contain.text",
        customers[0].name
      );

      customers = customers.slice(1);
    },
    USER_LIST_WITH_USER_EDITED: () => {
      cy.get(".toast-message", { timeout: 10000 }).should(
        "contain.text",
        "User updated"
      );
      cy.wait(250);
    },
  };

  console.log(`Número de estados: ${Object.keys(assertivas).length}`);

  const sysPassMachine = Machine(addTests(sysPassStates, assertivas), {
    // guards: {
    //   hasAccounts: (ctx) => ctx.accounts > 0,
    //   noAccounts: (ctx) => ctx.accounts === 0,
    // },
    // actions: {
    //   addAccount: assign({
    //     accounts: (context) => context.accounts + 1,
    //   }),
    // },
  });

  const events = {
    LOGIN: () => {
      cy.get('input[name="user"]').type("testuser");
      cy.get('input[name="pass"]').type("testpass123");
      cy.get("#btnLogin").click();
    },
    ADD_NEW_PROFILE: () => {
      cy.wait(250);
      cy.get("#btn-70").click();

      cy.get('a[href="#tabs-2"]').click();
      cy.get("#btn-add-731").click();

      cy.get("#profile_name").type("User", { delay: 0 });
      cy.get("label[for='profile_accadd']").click();
      cy.get("label[for='profile_accview']").click();
      cy.get("label[for='profile_accviewpass']").click();
      cy.get("label[for='profile_accedit']").click();
      cy.get("label[for='profile_acceditpass']").click();
      cy.get("label[for='profile_accdel']").click();
      cy.get('button[form="frmProfiles"]').click();
      cy.get(".toast-message", { timeout: 10000 }).should(
        "contain.text",
        "Profile added"
      );
      cy.wait(250);
    },
    ADD_NEW_CATEGORY: () => {
      cy.get("#btn-60").click();
      cy.wait(250);

      cy.get('a[href="#tabs-0"]').click();
      cy.get("#btn-add-611").click();

      cy.get("#name").type("Category1", { delay: 0 });
      cy.get("#description").type("category 1 test", { delay: 0 });
      cy.xpath('//*[@id="box-popup"]/div/button').click();
      cy.get(".toast-message", { timeout: 10000 }).should(
        "contain.text",
        "Category added"
      );
      cy.wait(250);
    },
    ADD_NEW_CUSTOMER: () => {
      cy.get("#btn-60").click();
      cy.wait(250);

      const randomId = v4().split("-")[0];

      const newCustomer = {
        name: `Company_${randomId}`,
      };

      cy.get('a[href="#tabs-1"]').click();
      cy.get("#btn-add-621").click();

      cy.get("#name").type(newCustomer.name, { delay: 0 });
      cy.get("#description").type("Company test", { delay: 0 });
      cy.xpath('//*[@id="box-popup"]/div/button').click();
      cy.get(".toast-message", { timeout: 10000 }).should(
        "contain.text",
        "Customer added"
      );
      customers.push(newCustomer);

      cy.get(".toast-close-button").click({ multiple: true });

      cy.wait(250);
    },
    ADD_NEW_GROUP: () => {
      cy.get("#btn-70").click();
      cy.wait(250);

      cy.get('a[href="#tabs-1"]').click();
      cy.get("#btn-add-721").click();

      cy.get("#name").type("Standards", { delay: 0 });
      cy.get('button[form="frmGroups"]').click();
      cy.get(".toast-message", { timeout: 10000 }).should(
        "contain.text",
        "Group added"
      );
      cy.wait(250);
    },
    ADD_NEW_USER: () => {
      cy.get("#btn-70").click();
      cy.wait(250);

      cy.get('a[href="#tabs-0"]').click();
      cy.get("#btn-add-711").click();

      const name = faker.name.firstName();

      const newUser = {
        name,
        login: faker.internet.userName(name),
        email: faker.internet.email(name),
        userpass: faker.internet.password(8, true, /[A-Za-z0-9]/),
      };

      cy.get("#name").type(newUser.name, { delay: 0 });
      cy.get("#login").type(newUser.login, { delay: 0 });
      cy.get("#selProfile-selectized")
        .type("User", { delay: 0 })
        .type("{enter}");
      cy.get("#selGroup-selectized")
        .type("Standards", { delay: 0 })
        .type("{enter}");
      cy.get("#email").type(newUser.email, { delay: 0 });
      cy.get("#userpass").type(newUser.userpass, { delay: 0 });
      cy.get("#userpassR").type(newUser.userpass, { delay: 0 });
      cy.get('button[form="frmUsers"]').click();

      cy.get(".toast-message", { timeout: 10000 }).should(
        "contain.text",
        "User added"
      );

      cy.get(".toast-close-button").click({ multiple: true });

      users.push(newUser);
      cy.wait(250);
    },
    ADD_NEW_USER_WITH_PROPS: () => {
      cy.get("#btn-70").click();
      cy.wait(250);

      cy.get('a[href="#tabs-0"]').click();
      cy.get("#btn-add-711").click();

      const name = faker.name.firstName();

      const newUser = {
        name,
        login: faker.internet.userName(name),
        email: faker.internet.email(name),
        userpass: faker.internet.password(20, true, /[A-Za-z0-9]/),
        notes: faker.lorem.paragraph(),
      };

      cy.get("#name").type(newUser.name, { delay: 0 });
      cy.get("#login").type(newUser.login, { delay: 0 });
      cy.get("#selProfile-selectized")
        .type("newProfile", { delay: 0 })
        .type("{enter}");
      cy.get("#selGroup-selectized")
        .type("Admin", { delay: 0 })
        .type("{enter}");
      cy.get("#email").type(newUser.email, { delay: 0 });
      cy.get("#userpass").type(newUser.userpass, { delay: 0 });
      cy.get("#userpassR").type(newUser.userpass, { delay: 0 });
      cy.get("#notes").type(newUser.notes, { delay: 0 });

      cy.xpath('//*[@id="frmUsers"]/table/tbody/tr[9]/td[2]/label[1]').click();
      cy.xpath(
        '//*[@id="frmUsers"]/table/tbody/tr[9]/td[2]/label[2]/span[2]'
      ).click();

      cy.get('button[form="frmUsers"]').click();

      cy.get(".toast-message", { timeout: 10000 }).should(
        "contain.text",
        "User added"
      );
      cy.get(".toast-close-button").click({ multiple: true });

      users.push(newUser);

      cy.wait(250);
    },
    ADD_NEW_ACCOUNT: () => {
      cy.get("#btn-101").click();

      const randomId = v4().split("-")[0];

      const newAccount = {
        name: `Google_${randomId}`,
        customer: `John_${randomId}`,
        category: `Social_${randomId}`,
        login: `john_${randomId}`,
        password: `pineapple_${randomId}`,
      };

      cy.get("#name").type(newAccount.name, { delay: 0 });

      // Adding new customer
      cy.get('i[data-action-id="621"]').click();
      cy.get(".popup-data")
        .find("#name")
        .type(newAccount.customer, { delay: 0 });
      cy.get('button[form="frmCustomers"]').click();
      cy.wait(250);
      cy.get("#selCustomer-selectized")
        .type(newAccount.customer)
        .type("{enter}");

      // Adding new category
      cy.get('i[data-action-id="611"]').click();
      cy.get(".popup-data")
        .find("#name")
        .type(newAccount.category, { delay: 0 });
      cy.get('button[form="frmCategories"]').click();
      cy.wait(250);
      cy.get("#selCategory-selectized")
        .type(newAccount.category)
        .type("{enter}");

      cy.get("#login").type(newAccount.login, { delay: 0 });
      cy.get("#accountpass").type(newAccount.password, { delay: 0 });
      cy.get("#accountpassR").type(newAccount.password, { delay: 0 });
      cy.get("#btnSave").click();

      cy.get(".toast-message", { timeout: 10000 }).should(
        "contain.text",
        "Account added"
      );

      cy.get(".toast-close-button").click({ multiple: true });

      cy.get("#btn-1").click();

      cy.get(".mdl-chip__text", { timeout: 10000 }).should(
        "contain.text",
        newAccount.customer
      );

      cy.wait(250);
      accounts.push(newAccount);
    },
    ADD_NEW_ACCOUNT_WITH_EXPIRY_DATE: () => {
      cy.get("#btn-101").click();

      const randomId = v4().split("-")[0];

      const newAccount = {
        name: `newAccountTest_${randomId}`,
        customer: customers[0].name,
        category: `Category1`,
        login: `mika`,
        password: `user7890`,
        expiry: "2021-01-05",
      };

      cy.get("#name").type(newAccount.name, { delay: 0 });

      // Adding new customer
      cy.get("#selCustomer-selectized")
        .type(newAccount.customer)
        .type("{enter}");

      // Adding new category
      cy.get("#selCategory-selectized")
        .type(newAccount.category)
        .type("{enter}");

      cy.get("#login").type(newAccount.login, { delay: 0 });
      cy.get("#accountpass").type(newAccount.password, { delay: 0 });
      cy.get("#accountpassR").type(newAccount.password, { delay: 0 });
      cy.get("#accountpassdatechange")
        .click()
        .type(newAccount.expiry, { delay: 0 });
      cy.get("#btnSave").click();

      cy.get(".toast-message", { timeout: 10000 }).should(
        "contain.text",
        "Account added"
      );

      cy.get(".toast-close-button").click({ multiple: true });

      cy.get("#btn-1").click();

      cy.get(".mdl-chip__text", { timeout: 10000 }).should(
        "contain.text",
        newAccount.customer
      );

      cy.wait(250);
      accounts.push(newAccount);
    },
    VIEW_USER_PASSWORD: () => {
      cy.get("#btn-action-1-lock_open").click();
    },
    VIEW_ACCOUNT_DETAILS: () => {
      cy.get("#btn-action-1-visibility").click();
    },
    VIEW_LOGS_LIST: () => {
      cy.get("#btn-90").click();
    },
    CHANGE_ACCOUNT_VIEW_MODE: () => {
      cy.get('button[id="users-menu-lower-right"]').click();
      cy.get('li[id="btnPrefs"]').click();
      cy.get('label[for="resultsascards"]').click();
      cy.get('button[form="frmPreferences"]').click();
      cy.get(".toast-close-button").click({ multiple: true });
      cy.get("#btn-1").click();
    },
    LOGOUT: () => {
      cy.get('button[id="users-menu-lower-right"]').click();
      cy.get('li[id="btnLogout"]').click();
    },
    ADD_NEW_PROFILE_WITH_MANAGEMENT_PROPS: () => {
      cy.wait(250);
      cy.get("#btn-70").click();

      cy.get('a[href="#tabs-2"]').click();
      cy.get("#btn-add-731").click();

      cy.get("#profile_name").type("newProfile", { delay: 0 });
      cy.get("label[for='profile_accadd']").click();
      cy.get("label[for='profile_accview']").click();
      cy.get("label[for='profile_accviewpass']").click();
      cy.get("label[for='profile_accedit']").click();
      cy.get("label[for='profile_acceditpass']").click();
      cy.get("label[for='profile_accdel']").click();

      cy.xpath('//*[@id="btnProfilesUsers"]/label[1]/span[2]').click();
      cy.xpath('//*[@id="btnProfilesUsers"]/label[2]/span[2]').click();
      cy.xpath('//*[@id="btnProfilesUsers"]/label[3]/span[2]').click();
      cy.xpath('//*[@id="btnProfilesUsers"]/label[4]/span[2]').click();

      cy.get('button[form="frmProfiles"]').click();
      cy.get(".toast-message", { timeout: 10000 }).should(
        "contain.text",
        "Profile added"
      );
      cy.wait(250);
    },
    ADD_NEW_GROUP_WITH_DESCRIPTION_AND_USER: () => {
      cy.get("#btn-70").click();
      cy.wait(250);

      cy.get('a[href="#tabs-1"]').click();
      cy.get("#btn-add-721").click();

      cy.get("#name").type("newGroup", { delay: 0 });
      cy.get("#description").type("testing new group", { delay: 0 });
      cy.xpath('//*[@id="selUsers-selectized"]')
        .type("Admin", { delay: 0 })
        .type("{enter}");

      cy.get('button[form="frmGroups"]').click();

      cy.get(".toast-message", { timeout: 10000 }).should(
        "contain.text",
        "Group added"
      );
      cy.wait(250);
    },
    ADD_NEW_NOTIFICATION: () => {
      cy.get("#notices-user").click();
      cy.wait(250);

      cy.get("#btn-add-7611").click();

      const randomId = v4().split("-")[0];

      const newNotification = {
        type: `Type01_${randomId}`,
        component: `Component01_${randomId}`,
        description: `testing new notification_${randomId}`,
      };

      cy.get("#notice_type").type(newNotification.type, { delay: 0 });
      cy.get("#notice_component").type(newNotification.component, { delay: 0 });
      cy.get("#notice_description").type(newNotification.description, {
        delay: 0,
      });
      cy.xpath('//*[@id="notice_user-selectized"]')
        .type("Admin", { delay: 0 })
        .type("{enter}");

      cy.get('button[form="frmNotices"]').click();

      cy.get(".toast-message", { timeout: 10000 }).should(
        "contain.text",
        "Notification created"
      );
      cy.wait(250);
      notifications.push(newNotification);
    },
    DELETE_NOTIFICATION: () => {
      cy.get("#btn-search-0").click();

      cy.get("input[id='search-0']")
        .type(notifications[0].type, { delay: 0 })
        .type("{enter}");
      cy.wait(250);
      cy.xpath(
        '//*[@id="data-table-tblNotices"]/table/thead/tr/th[1]/label/span[3]'
      ).click();
      cy.wait(250);
      cy.xpath('//*[@id="tblNotices-menu-lower-right"]').click();
      cy.wait(250);
      cy.xpath('//*[@id="tabs-0"]/div[1]/ul/li[4]/div').click();
      cy.wait(250);
      cy.xpath('//*[@id="positive"]').click();
      cy.wait(250);
    },
    EDIT_USER: () => {
      cy.get("#btn-70").click();
      cy.wait(250);

      cy.get('a[href="#tabs-0"]').click();

      cy.xpath('//*[@id="btn-search-0"]').click();
      cy.xpath('//*[@id="search-0"]')
        .type(users[0].name, { delay: 0 })
        .type("{enter}");
      cy.wait(2000);
      cy.xpath('//*[@id="btn-action-2-712"]').click();
      cy.xpath(
        '//*[@id="frmUsers"]/table/tbody/tr[7]/td[2]/label[1]/span[2]'
      ).click();
      cy.xpath(
        '//*[@id="frmUsers"]/table/tbody/tr[7]/td[2]/label[2]/span[2]'
      ).click();
      cy.xpath('//*[@id="box-popup"]/div/button').click();
    },
    DELETE_ACCOUNT: () => {
      cy.get("#btn-60").click();
      cy.wait(250);

      cy.get('a[href="#tabs-4"]').click();

      cy.xpath('//*[@id="btn-search-4"]').click();
      cy.xpath('//*[@id="search-4"]')
        .type(accounts[0].name, { delay: 0 })
        .type("{enter}");
      cy.wait(250);
      cy.xpath(
        '//*[@id="data-table-tblAccounts"]/table/thead/tr/th[1]/label/span[3]'
      ).click();
      cy.xpath('//*[@id="tblAccounts-menu-lower-right"]').click();
      cy.xpath('//*[@id="tabs-4"]/div[1]/ul/li[3]/div/ul/li').click();
      cy.xpath('//*[@id="positive"]').click();
      cy.xpath('//*[@id="container"]/div/div/header/div[2]/span/img').click();

      cy.get(".toast-close-button").click({ multiple: true });
      cy.wait(250);
    },
    DELETE_COSTUMER: () => {
      cy.get("#btn-60").click();
      cy.wait(250);

      cy.get('a[href="#tabs-1"]').click();

      cy.xpath('//*[@id="btn-search-1"]').click();
      cy.xpath('//*[@id="search-1"]')
        .type(customers[0].name, { delay: 0 })
        .type("{enter}");

      cy.wait(250);

      cy.xpath(
        '//*[@id="data-table-tblCustomers"]/table/thead/tr/th[1]/label/span[3]'
      ).click();
      cy.xpath('//*[@id="tblCustomers-menu-lower-right"]').click();
      cy.xpath('//*[@id="tabs-1"]/div[1]/ul/li[4]/div/ul/li').click();
      cy.xpath('//*[@id="positive"]').click();

      cy.wait(250);
    },
  };

  console.log(`Número de eventos: ${Object.keys(events).length}`);

  const testModel = createModel(sysPassMachine, {
    events,
  });

  const testPlans = testModel.getSimplePathPlans();

  // console.log(JSON.stringify(sysPassStates));

  // const plansEvt1 = testModel.getShortestPathPlansTo("SCREEN_SEARCH_LIST");
  // const testPlans = plansEvt1;

  // console.group([`Evento 1 - ${Object.keys(assertivas)[8]}`]);
  // console.log(plansEvt1);
  // console.groupEnd();

  // const testPlans = testModel.getShortestPathPlans({
  //   eventSerializer: (evt) => console.log(evt),
  // });

  console.log(testPlans);

  console.log(JSON.stringify(sysPassStates));

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
