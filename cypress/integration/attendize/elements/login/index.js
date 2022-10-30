/* eslint-disable no-undef */
/// <reference types="cypress" />

export const loginElements = {
  errorMessage: () => cy.xpath("/html/body/div[2]"),
  email: () => cy.get("#email"),
  password: () => cy.get("#password"),
  login: () => cy.get("button.btn.btn-block.btn-success"),
  forgotPassword: () => cy.get("a.forgotPassword"),
};
