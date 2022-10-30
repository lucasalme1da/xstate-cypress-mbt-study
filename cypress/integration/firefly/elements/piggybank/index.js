/* eslint-disable no-undef */
/// <reference types="cypress" />

export const piggybankElements = {
  btnNewPiggyBank: () => cy.get(".btn-success").first(),
  amount: () => cy.get("#amount"),
  addMoney: () => cy.get(".addMoney"),
  defaultModal: () => cy.get("#defaultModal"),
  leftToSave: () => cy.xpath('//*[@id="sortable-piggy"]/tbody/tr/td[11]/span'),
  mandatoryField: () => cy.get(".box-title").first(),
  name: () => cy.get("#ffInput_name"),
  saveOnAccount: () => cy.get("#ffInput_account_id"),
  targetAmmount: () => cy.get("#ffInput_targetamount"),
  successMessage: () =>
    cy.xpath('//*[@id="app"]/div[1]/section[2]/div[1]').first(),
};
