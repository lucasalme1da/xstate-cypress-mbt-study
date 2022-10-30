/* eslint-disable no-undef */
/// <reference types="cypress" />

export const loginElements = {
  inputEmail: () => cy.xpath("/html/body/div/div[2]/form/div[1]/input"),
  inputPassword: () => cy.xpath("/html/body/div/div[2]/form/div[2]/input"),
  buttonLogin: () =>
    cy.xpath("/html/body/div/div[2]/form/div[3]/div[2]/button"),
  head: () => cy.xpath("/html/body/div/div[2]/p"),
  message: () => cy.xpath("/html/body/div/div[2]/div/div/strong"),
};
