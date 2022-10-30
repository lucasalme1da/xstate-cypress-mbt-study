/* eslint-disable no-undef */
/// <reference types="cypress" />

export const profitElements = {
  year: () =>
    cy.xpath("/html/body/div/div/section[2]/div/div[1]/form/div/select"),
  selectYear: () =>
    cy.xpath(
      "/html/body/div/div/section[2]/div/div[1]/form/div/select/option[9]"
    ),
  netProfit: () =>
    cy.xpath(
      "/html/body/div/div/section[2]/div/div[2]/div/table[4]/tbody/tr/th[6]/span"
    ),
};
