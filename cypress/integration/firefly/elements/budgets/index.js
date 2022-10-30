/* eslint-disable no-undef */
/// <reference types="cypress" />

export const budgetsElements = {
  inputName: () => cy.xpath('//*[@id="ffInput_name"]'),
  formNewBudget: () => cy.xpath('//*[@id="store"]'),
  alertSkip: () => cy.xpath("/html/body/div[8]/div/div[5]/a[1]"),
  btnDelete: () => cy.xpath('//*[@id="budgetList"]/tbody/tr[2]/td[1]/div/a[2]'),
  btnConfirmDeletion: () =>
    cy.xpath('//*[@id="destroy"]/div/div/div/div[3]/input'),
};
