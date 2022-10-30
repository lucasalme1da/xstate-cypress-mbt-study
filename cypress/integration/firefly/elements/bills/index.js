/* eslint-disable no-undef */
/// <reference types="cypress" />

export const billsElements = {
  mandatoryFields: () => cy.get(".box-title").first(),
  name: () => cy.get("#ffInput_name"),
  currency: () => cy.get("#ffInput_transaction_currency_id"),
  minimumAmount: () => cy.get("#ffInput_amount_min"),
  maximumAmount: () => cy.get("#ffInput_amount_max"),
  repeats: () => cy.get("#ffInput_repeat_freq"),
  successMessage: () =>
    cy.xpath('//*[@id="app"]/div[1]/section[2]/div[1]').first(),
  newBillOrRule: () => cy.get(".btn-success").first(),
};
