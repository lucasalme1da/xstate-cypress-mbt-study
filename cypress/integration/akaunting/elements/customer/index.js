/* eslint-disable no-undef */
/// <reference types="cypress" />

export const customerElements = {
  name: () => cy.get("#name"),
  submit: () =>
    cy.xpath("/html/body/div/div/section[2]/div/form/div[2]/div/div/button"),
  filter: () => cy.xpath('//*[@id="tbl-customers"]/tbody/tr/td[1]/a'),
  invoice: () =>
    cy.xpath(
      "/html/body/div/div/section[2]/div/div[2]/div[1]/div[3]/div/div/span[2]"
    ),
  btnActions: () =>
    cy.xpath('//*[@id="tbl-customers"]/tbody/tr/td[5]/div/button'),
  btnAdd: () => cy.xpath("/html/body/div/div/section[1]/h1/span[1]/a"),
};
