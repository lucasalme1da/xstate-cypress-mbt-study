/* eslint-disable no-undef */
/// <reference types="cypress" />

export const expensesElements = {
  btnNewWithdrawal: () => cy.get(".btn-success").first(),
  description: () => cy.get("#ffInput_description"),
  category: () => cy.get("#ffInput_category"),
  expenseAccount: () => cy.get("#ffInput_destination_name"),
  sourceAccount: () => cy.get("#ffInput_source_id"),
  amount: () => cy.get("#ffInput_amount"),
  mandatoryFields: () => cy.get(".box-title").first(),
  categoryText: () =>
    cy.xpath(
      '//*[@id="app"]/div[1]/section[2]/div[3]/div[1]/div/div[2]/table/tbody/tr[1]/td[9]/a'
    ),
  selectBudget: () => cy.get("#ffInput_budget_id"),
  successMessage: () =>
    cy.xpath('//*[@id="app"]/div[1]/section[2]/div[1]').first(),
};
