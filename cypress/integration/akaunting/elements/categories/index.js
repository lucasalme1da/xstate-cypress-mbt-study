/* eslint-disable no-undef */
/// <reference types="cypress" />

export const categoriesElements = {
  general: () => cy.xpath('//*[@id="tbl-categories"]/tbody/tr[2]/td[1]/a'),
  colour: () => cy.xpath('//*[@id="color"]'),
  save: () =>
    cy.xpath("/html/body/div[1]/div/section[2]/div/form/div[2]/div/div/button"),
};
