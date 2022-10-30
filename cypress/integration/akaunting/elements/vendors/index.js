/* eslint-disable no-undef */
/// <reference types="cypress" />

export const vendorsElements = {
  addVendorsButton: () =>
    cy.xpath("/html/body/div/div/section[1]/h1/span[1]/a"),
  name: () => cy.xpath('//*[@id="name"]'),
  email: () => cy.xpath('//*[@id="email"]'),
  tax_number: () => cy.xpath('//*[@id="tax_number"]'),
  currency: () =>
    cy.xpath(
      "/html/body/div/div/section[2]/div/form/div[1]/div[4]/div/span/span[1]/span/span[2]"
    ),
  usDollar: () => cy.xpath('//*[@id="select2-currency_code-container"]'),
  website: () => cy.xpath('//*[@id="website"]'),
  phone: () => cy.xpath('//*[@id="phone"]'),
  address: () => cy.xpath('//*[@id="address"]'),
  enabled: () => cy.xpath('//*[@id="enabled_1"]'),
  save: () =>
    cy.xpath("/html/body/div/div/section[2]/div/form/div[2]/div/div/button"),
};
