/* eslint-disable no-undef */
/// <reference types="cypress" />

export const revenuesElements = {
  category: () =>
    cy.xpath(
      "/html/body/div/div/section[2]/div/form/div[1]/div[6]/div/span/span[1]/span"
    ),
  btnOk: () =>
    cy.xpath("/html/body/div/div/section[2]/div/form/div[2]/div/div/button"),
  btnAdd: () => cy.xpath("/html/body/div/div/section[1]/h1/span[1]/a"),
};
