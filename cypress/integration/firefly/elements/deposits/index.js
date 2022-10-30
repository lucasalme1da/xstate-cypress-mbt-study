/* eslint-disable no-undef */
/// <reference types="cypress" />

export const depositsElements = {
  inputDepositDescription: () => cy.xpath('//*[@id="ffInput_description"]'),
  inputDepositValue: () => cy.xpath('//*[@id="ffInput_amount"]'),
  formDeposit: () => cy.xpath('//*[@id="store"]'),
  alertSkip: () => cy.xpath("/html/body/div[7]/div/div[5]/a[1]"),
  newDepositButton: () => cy.get(".btn-success").first(),
  mandatoryField: () => cy.get(".box-title").first(),
  description: () => cy.get("#ffInput_description"),
  revenueAccount: () => cy.get("#ffInput_source_name"),
  destinationAccount: () => cy.get("#ffInput_destination_id"),
  amount: () => cy.get("#ffInput_amount"),
  successMessage: () =>
    cy.xpath('//*[@id="app"]/div[1]/section[2]/div[1]').first(),
};
