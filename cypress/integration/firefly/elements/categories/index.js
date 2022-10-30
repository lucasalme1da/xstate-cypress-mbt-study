/* eslint-disable no-undef */
/// <reference types="cypress" />

export const categoriesElements = {
  btnNewCategory: () => cy.get(".btn-success").first(),
  successMessage: () =>
    cy.xpath('//*[@id="app"]/div[1]/section[2]/div[1]').first(),
  mandatoryField: () => cy.get(".box-title").first(),
  name: () => cy.get("#ffInput_name"),
};
