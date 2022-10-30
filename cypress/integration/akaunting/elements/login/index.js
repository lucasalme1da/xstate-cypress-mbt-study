/* eslint-disable no-undef */
/// <reference types="cypress" />

export const loginElements = {
  loginEmail: () => cy.get('[name="email"]'),
  loginPassword: () => cy.get('[name="password"]'),
  loginButton: () =>
    cy.xpath("/html/body/div/div[2]/form/div[3]/div[2]/button"),
};
