/* eslint-disable no-undef */
/// <reference types="cypress" />

import { Machine } from "xstate";
import { createModel } from "@xstate/test";
import {
  fireflyStatesAfterRegister,
  fireflyStatesBeforeRegister,
} from "./states";

import { faker } from "@faker-js/faker";
import { loginElements } from "./elements/login/index";
import { menuElements } from "./elements/menu";
import { registerElements } from "./elements/register";
import { accountsElements } from "./elements/accounts";
import { tagsElements } from "./elements/tags";
import { invoicesElements } from "./elements/invoices";
import { budgetsElements } from "./elements/budgets";
import { depositsElements } from "./elements/deposits";
import { profileElements } from "./elements/profile";
import { expensesElements } from "./elements/expenses";
import { billsElements } from "./elements/bills";
import { piggybankElements } from "./elements/piggybank";
import { reportsElements } from "./elements/reports";
import { categoriesElements } from "./elements/categories";

import { addTests, type } from "../helper/index";

describe("Firefly III", () => {
  // Objeto para armazenar estados utilizados durante os testes
  const props = {
    accounts: [],
    products: [],
    budgets: [],
    categories: [],
  };

  // Assertivas dos estados da MEF
  const assertionBeforeRegister = {
    BEGIN: () => {
      const { inputEmail, inputPassword, inputPassword2, buttonRegister } =
        registerElements;

      inputEmail().should("be.visible");
      inputPassword().should("be.visible");
      inputPassword2().should("be.visible");
      buttonRegister().should("be.visible");
    },
    REGISTRED: () => {
      const { title, user } = menuElements;

      title().should("contain.text", "Firefly III");
      title().should("contain.text", "What's playing?");

      user().should("contain.text", "test@test.com");
    },
  };

  const assertionAfterRegister = {
    ACCOUNT_DELETED: () => {
      const { inputEmail, inputPassword, inputPassword2, buttonRegister } =
        registerElements;

      inputEmail().should("be.visible");
      inputPassword().should("be.visible");
      inputPassword2().should("be.visible");
      buttonRegister().should("be.visible");
    },
    LOGIN_ERROR: () => {
      const { message } = loginElements;

      message().should("contain.text", "Error!!");
    },
    LOGIN_PAGE: () => {
      const { inputEmail, inputPassword, buttonLogin } = loginElements;

      inputEmail().should("be.visible");
      inputPassword().should("be.visible");
      buttonLogin().should("be.visible");
    },
    DASHBOARD: () => {
      const { title, user } = menuElements;

      title().should("contain.text", "Firefly III");
      title().should("contain.text", "What's playing?");

      user().should("contain.text", "test@test.com");
    },
    ACTIVE_ACCOUNT_CREATED: () => {
      const { message } = menuElements;

      message().should("contain.text", "Success!");
    },
    TAG_CREATED: () => {
      const { message } = tagsElements;

      message().should("contain.text", "Success!");
    },
    INVOICE_CREATED: () => {
      const { title } = invoicesElements;

      title().should("contain.text", "Success!");
    },
    INVOICE_CREATION_ERROR: () => {
      const { title } = invoicesElements;

      // ! Essa assertiva causará um erro nos testes pois a aplicação está com um bug que aceita que o valor máximo seja menor que o mínimo.
      title().should("contain.text", "Error!");
    },
    BUDGET_CREATED: () => {
      const { message } = menuElements;

      message().should("contain.text", "Success!");
    },
    DEPOSIT_DONE: () => {
      const { message } = menuElements;

      message().should("contain.text", "Success!");
    },
    INCOME: () => {
      cy.url().should("include", "/transactions/deposit");
    },
    BILL: () => {
      cy.title().should("eq", "Bills » Firefly III");
    },
    BILL_CREATED: () => {
      const { successMessage } = billsElements;

      successMessage()
        .invoke("text")
        .then((text) => {
          expect(text).contains("Success!");
          expect(text).contains("Stored");
          expect(text).contains("new");
          expect(text).contains("rule");
          expect(text).contains("with");
          expect(text).contains("title");
          expect(text).contains('"Rule for bill "internet""');
        });

      cy.url().should("include", "bills");
    },
    EXPENSES: () => {
      const { btnNewWithdrawal } = expensesElements;

      btnNewWithdrawal().should("be.visible");
    },
    DEPOSIT_WITH_INCOME_DONE: () => {
      const { successMessage } = depositsElements;

      successMessage()
        .invoke("text")
        .then((text) => {
          expect(text).contains("Success!");
          expect(text).contains("Successfully");
          expect(text).contains("created");
          expect(text).contains("new");
          expect(text).contains("transaction");
          expect(text).contains('"deposit"');
        });
    },
    WITHDRAW_DONE: () => {
      const { successMessage } = expensesElements;

      successMessage()
        .invoke("text")
        .then((text) => {
          expect(text).contains("Success!");
          expect(text).contains("Successfully");
          expect(text).contains("created");
          expect(text).contains("new");
          expect(text).contains("transaction");
          expect(text).contains('"transport"');
        });
    },
    PIGGYBANK: () => {
      cy.title().should("include", "Piggy banks");
    },
    PIGGYBANK_CREATED: () => {
      const { successMessage } = piggybankElements;

      successMessage()
        .invoke("text")
        .then((text) => {
          expect(text).contains("Success!");
          expect(text).contains("Store");
          expect(text).contains("new");
          expect(text).contains("piggy");
          expect(text).contains("bank");
          expect(text).contains(
            `"${props.products[props.products.length - 1]}"`
          );
        });
    },
    SAVED_ON_PIGGYBANK: () => {
      const { leftToSave, successMessage } = piggybankElements;

      leftToSave().should("contain.text", "$100.00");

      successMessage()
        .invoke("text")
        .then((text) => {
          expect(text).contains("Success!");
          expect(text).contains("Added");
          expect(text).contains("$20.00");
          expect(text).contains("to");
          expect(text).contains(
            `"${props.products[props.products.length - 1]}"`
          );
        });
    },
    REPORT_CREATED: () => {
      const { inReport, outReport, differenceReport } = reportsElements;

      cy.wait(20000);

      inReport().should("contain.text", "$");
      outReport().should("contain.text", "$-");
      differenceReport().should("contain.text", "$");
    },
    CATEGORY_CREATED: () => {
      const { successMessage } = categoriesElements;

      successMessage()
        .invoke("text")
        .then((text) => {
          expect(text).contains("Success!");
          expect(text).contains("Stored");
          expect(text).contains("new");
          expect(text).contains("category");
          expect(text).contains(props.categories[props.categories.length - 1]);
        });
    },
    WITHDRAW_WITH_CATEGORY: () => {
      const { successMessage, categoryText } = expensesElements;

      successMessage()
        .invoke("text")
        .then((text) => {
          expect(text).contains("Success!");
          expect(text).contains("Successfully");
          expect(text).contains("created");
          expect(text).contains("new");
          expect(text).contains("transaction");
          expect(text).contains('"games"');
        });

      categoryText().should(
        "contain.text",
        props.categories[props.categories.length - 1]
      );
    },
  };

  console.log(
    `Número de estados: ${
      Object.keys({ ...assertionBeforeRegister, ...assertionAfterRegister })
        .length
    }`
  );

  // Eventos dos estados da MEF
  const eventsBeforeRegister = {
    REGISTER: () => {
      const {
        inputEmail,
        inputPassword,
        inputPassword2,
        buttonRegister,
        inputBankName,
        inputBalance,
        language,
        btnSubmit,
      } = registerElements;

      type(inputEmail, "test@test.com");
      type(inputPassword, "test");
      type(inputPassword2, "test");

      buttonRegister().click();

      cy.wait(2000);

      type(inputBankName, "Bank Name");
      type(inputBalance, "2000");
      language().select("en_US");

      btnSubmit().click();
    },
  };

  const eventsAfterRegister = {
    INVALID_LOGIN: () => {
      const { inputEmail, inputPassword, buttonLogin } = loginElements;

      type(inputEmail, "invalid@email.com");
      type(inputPassword, "invalid");

      buttonLogin().click();
    },
    LOGIN: () => {
      const { inputEmail, inputPassword, buttonLogin } = loginElements;

      type(inputEmail, "test@test.com");
      type(inputPassword, "test");

      buttonLogin().click();
    },
    LOGOUT: () => {
      const { menuDisconnect } = menuElements;

      menuDisconnect().click();
    },
    NEW_ACTIVE_ACCOUNT: () => {
      const { menuCreateNewThings, menuNewActiveAccount } = menuElements;

      menuCreateNewThings().click();
      menuNewActiveAccount().click();

      const { inputName, formNewAccount } = accountsElements;

      const newAccountName = faker.word.noun();

      type(inputName, newAccountName);

      formNewAccount().submit();

      props.accounts.push(newAccountName);
    },
    NEW_TAG: () => {
      const { menuTags } = menuElements;

      menuTags().click();

      const { btnCreateNewTag, inputTag, formNewTag } = tagsElements;

      btnCreateNewTag().click();
      type(inputTag, "tag");

      formNewTag().submit();
    },
    NEW_INVOICE: () => {
      const { menuCreateNewThings, menuNewInvoice } = menuElements;

      menuCreateNewThings().click();
      menuNewInvoice().click();

      const {
        inputName,
        inputMinValue,
        inputMaxValue,
        repetitions,
        formNewInvoice,
      } = invoicesElements;

      type(inputName, "new invoice");
      type(inputMinValue, "500");
      type(inputMaxValue, "1000");
      type(repetitions, "monthly");

      formNewInvoice().submit();
    },
    NEW_INVOICE_ERROR: () => {
      const { menuCreateNewThings, menuNewInvoice } = menuElements;

      menuCreateNewThings().click();
      menuNewInvoice().click();

      const {
        inputName,
        inputMinValue,
        inputMaxValue,
        repetitions,
        formNewInvoice,
      } = invoicesElements;

      type(inputName, "new invoice 2");
      type(inputMinValue, "1500");
      type(inputMaxValue, "1000");
      type(repetitions, "monthly");

      formNewInvoice().submit();
    },
    NEW_BUDGET: () => {
      const { menuCreateNewThings, menuNewBudget } = menuElements;

      menuCreateNewThings().click();
      menuNewBudget().click();

      const { inputName, formNewBudget } = budgetsElements;

      const newBudget =
        faker.commerce.product() + " budget " + faker.random.numeric();
      type(inputName, newBudget);

      formNewBudget().submit();

      props.budgets.push(newBudget);
    },
    NEW_DEPOSIT: () => {
      const { menuCreateNewThings, menuNewDeposit } = menuElements;

      menuCreateNewThings().click();
      menuNewDeposit().click();

      const { inputDepositDescription, inputDepositValue, formDeposit } =
        depositsElements;

      type(inputDepositDescription, "deposit");
      type(inputDepositValue, "1000");

      formDeposit().submit();
    },
    DELETE_ACCOUNT: () => {
      const { menuOptions, menuProfile } = menuElements;

      menuOptions().click();
      menuProfile().click();

      const { linkDeleteAccount, inputPassword, buttonDeleteAccount } =
        profileElements;

      linkDeleteAccount().click();

      type(inputPassword, "test");

      buttonDeleteAccount().click();
    },
    TO_INCOME: () => {
      const { transaction, transactionRevenueIncome } = menuElements;

      transaction().click();
      transactionRevenueIncome().click();
    },
    TO_BILL: () => {
      const { moneyManagement, bills } = menuElements;

      moneyManagement().click();
      bills().click();
    },
    TO_PIGGYBANK: () => {
      const { moneyManagement, piggyBanks } = menuElements;

      moneyManagement().click();
      piggyBanks().click();
    },
    NEW_REPORT: () => {
      const { reports } = menuElements;

      reports().click();

      const { submit } = reportsElements;

      cy.get('button[title="None selected"]').click();
      cy.get('label[class="checkbox"]').eq(0).click();

      submit().last().click();
    },
    NEW_CATEGORY: () => {
      const { categories } = menuElements;

      categories().click();

      const { btnNewCategory, mandatoryField, name } = categoriesElements;

      btnNewCategory().click();

      mandatoryField().should("contain.text", "Mandatory fields");

      const newCategory = faker.color.human();

      type(name, newCategory);
      name().type("{enter}");

      props.categories.push(newCategory);
    },
    TO_EXPENSES: () => {
      const { transaction, expenses } = menuElements;

      transaction().click();
      expenses().click();
    },
    NEW_DEPOSIT_WITH_INCOME: () => {
      const {
        description,
        revenueAccount,
        destinationAccount,
        amount,
        newDepositButton,
        formDeposit,
        mandatoryField,
      } = depositsElements;

      newDepositButton().click();

      mandatoryField().should("contain.text", "Mandatory fields");

      type(description, "deposit");
      type(revenueAccount, "1000");
      destinationAccount().select(0);
      type(amount, "1000");

      formDeposit().submit();
    },
    NEW_BILL: () => {
      const {
        mandatoryFields,
        name,
        currency,
        minimumAmount,
        maximumAmount,
        repeats,
        successMessage,
        newBillOrRule,
      } = billsElements;

      newBillOrRule().click();
      mandatoryFields().should("contain.text", "Mandatory fields");
      type(name, "internet");
      currency().select("US Dollar ($)");
      type(minimumAmount, "120");
      type(maximumAmount, "120");
      repeats().select("monthly");

      maximumAmount().type("{enter}");

      successMessage()
        .invoke("text")
        .then((text) => {
          expect(text).contains("Success!");
          expect(text).contains("Stored");
          expect(text).contains("new");
          expect(text).contains("bill");
          expect(text).contains('"internet"');
        });

      cy.wait(2000);

      cy.url().should("include", "/rules/create");

      newBillOrRule().click();
    },
    NEW_WITHDRAW: () => {
      const {
        btnNewWithdrawal,
        mandatoryFields,
        description,
        expenseAccount,
        amount,
        sourceAccount,
        selectBudget,
      } = expensesElements;

      btnNewWithdrawal().click();

      mandatoryFields().should("contain.text", "Mandatory fields");

      type(description, "transport");
      sourceAccount().select(0);
      type(expenseAccount, "transport");
      type(amount, "420.0");

      if (props.budgets.length > 0)
        selectBudget().select(props.budgets[props.budgets.length - 1]);

      expenseAccount().type("{enter}");
    },
    NEW_PIGGYBANK: () => {
      const {
        mandatoryField,
        name,
        saveOnAccount,
        targetAmmount,
        btnNewPiggyBank,
      } = piggybankElements;

      btnNewPiggyBank().click();

      mandatoryField().should("contain.text", "Mandatory fields");

      const newProductName = faker.commerce.product();

      type(name, newProductName);
      saveOnAccount().select(0);
      type(targetAmmount, "120");

      targetAmmount().type("{enter}");

      props.products.push(newProductName);
    },
    SAVE_ON_PIGGYBANK: () => {
      const { addMoney, amount, defaultModal } = piggybankElements;

      addMoney().last().click();
      cy.wait(2000);
      amount().type("20", { delay: 0 });
      cy.wait(2000);

      defaultModal().find("#amount").type("{selectall}20{enter}");
    },
    NEW_WITHDRAW_WITH_CATEGORY: () => {
      const { transaction, expenses } = menuElements;

      transaction().click();
      expenses().click();

      const {
        btnNewWithdrawal,
        description,
        sourceAccount,
        expenseAccount,
        mandatoryFields,
        amount,
        category,
      } = expensesElements;

      btnNewWithdrawal().click();

      mandatoryFields().should("contain.text", "Mandatory fields");

      type(description, "games");
      sourceAccount().select(0);
      type(expenseAccount, "fun");
      type(amount, "59.0");
      type(category, props.categories[props.categories.length - 1]);

      description().type("{enter}");
    },
  };

  console.log(
    `Número de eventos: ${
      Object.keys({ ...eventsBeforeRegister, ...eventsAfterRegister }).length
    }`
  );

  // Criando o modelo de testes utilizando as máquina de estados, com as assertivas (assertions) e os eventos (events)
  const testModelBeforeRegister = createModel(
    Machine(addTests(fireflyStatesBeforeRegister, assertionBeforeRegister)),
    {
      events: eventsBeforeRegister,
    }
  );

  const testModelAfterRegister = createModel(
    Machine(addTests(fireflyStatesAfterRegister, assertionAfterRegister)),
    {
      events: eventsAfterRegister,
    }
  );

  // Gerando os caminhos simples (equivalentes aos casos de teste)
  const testPlans = [
    ...testModelBeforeRegister.getSimplePathPlans(),
    ...testModelAfterRegister.getSimplePathPlans(),
  ];

  console.log(testPlans);

  // Executando cada caso de teste
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

  // Executando um teste de cobertura do modelo (analisa se cada estado foi alcançado durante os testes)
  describe("coverage", () => {
    it("should pass", () => {
      testModelBeforeRegister.testCoverage();
      testModelAfterRegister.testCoverage();
    });
  });
});
