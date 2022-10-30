/* eslint-disable no-undef */
/// <reference types="cypress" />

export const invoicesElements = {
  addInvoicesButton: () =>
    cy.xpath("/html/body/div/div/section[1]/h1/span[1]/a"),
  showButton: () => cy.get("#tbl-invoices tbody tr td a").first(),
  btnAdd: () => cy.xpath("/html/body/div/div/section[1]/h1/span[1]/a"),
  addNewCustomer: () => cy.xpath('//*[@id="button-customer"]'),
  name: () => cy.xpath('//*[@id="name"]'),
  email: () => cy.xpath('//*[@id="email"]'),
  taxNumber: () => cy.xpath('//*[@id="tax_number"]'),
  address: () => cy.xpath('//*[@id="address"]'),
  saveCustomer: () => cy.xpath('//*[@id="button-create-customer"]'),
  selectDayInvoice: () => cy.xpath('//*[@id="invoiced_at"]'),
  selectDayDue: () => cy.xpath('//*[@id="due_at"]'),
  orderNumber: () => cy.xpath('//*[@id="order_number"]'),
  itemsName: () => cy.xpath('//*[@id="item-name-0"]'),
  quantity: () => cy.xpath('//*[@id="item-quantity-0"]'),
  prices: () => cy.xpath('//*[@id="item-price-0"]'),
  sppinerTax: () => cy.xpath('//*[@id="select2-item-tax-0-container"]'),
  tax: () => cy.xpath('//*[@id="select2-item-tax-0-container"]'),
  notes: () =>
    cy.xpath("/html/body/div[1]/div/section[2]/div/form/div[1]/div[8]"),
  sppinerCategory: () => cy.get("#select2-category_id-container"),
  deposit: () => cy.xpath("/html/body/span/span/span[2]/ul/li[1]"),
  save: () =>
    cy.xpath("/html/body/div[1]/div/section[2]/div/form/div[2]/div/div/button"),
  checkSku: () =>
    cy.xpath(
      "/html/body/div/div/section[2]/div[1]/section/div[4]/div/table/tbody/tr[2]/td[1]/small"
    ),
  product: () =>
    cy.xpath(
      "/html/body/div/div/section[2]/div[2]/section/div[4]/div/table/tbody/tr[2]/td[1]"
    ),
  value: () =>
    cy.xpath(
      "/html/body/div/div/section[2]/div[2]/section/div[4]/div/table/tbody/tr[2]/td[4]"
    ),
  customerSelect: () => cy.get("#select2-customer_id-container"),
};
