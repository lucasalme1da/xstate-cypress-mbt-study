/* eslint-disable no-undef */
/// <reference types="cypress" />

export const itemsElements = {
  name: () => cy.xpath('//*[@id="name"]'),
  sku: () => cy.xpath('//*[@id="sku"]'),
  description: () => cy.xpath('//*[@id="description"]'),
  salePrice: () => cy.xpath('//*[@id="sale_price"]'),
  purchasePrice: () => cy.xpath('//*[@id="purchase_price"]'),
  quantity: () => cy.xpath('//*[@id="quantity"]'),
  spinnerTax: () =>
    cy.xpath(
      "/html/body/div/div/section[2]/div/form/div[1]/div[7]/div/span/span[1]/span/span[2]"
    ),
  taxButton: () => cy.xpath('//*[@id="tax_id"]/option[2]'),
  spinnerCategory: () =>
    cy.xpath(
      "/html/body/div/div/section[2]/div/form/div[1]/div[8]/div/span/span[1]/span/span[2]"
    ),
  general: () => cy.xpath('//*[@id="select2-category_id-results"]'),
  enabled: () => cy.xpath('//*[@id="enabled_1"]'),
  save: () =>
    cy.xpath("/html/body/div/div/section[2]/div/form/div[2]/div/div/button"),
  addItemsButton: () =>
    cy.xpath("/html/body/div/div/section[1]/h1/span[1]/a\n"),
  clickButton: () => cy.xpath('//*[@id="tbl-items"]/tbody/tr/td[8]/div/button'),
  deleteItem: () => cy.xpath('//*[@id="item-1"]/button'),
  confirm: () =>
    cy.xpath('//*[@id="confirm-modal"]/div/div/div[3]/div/button[1]'),
};
