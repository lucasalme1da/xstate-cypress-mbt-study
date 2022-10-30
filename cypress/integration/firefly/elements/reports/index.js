/* eslint-disable no-undef */
/// <reference types="cypress" />

export const reportsElements = {
  includedAccounts: () => cy.get(".inputAccounts"),
  inReport: () =>
    cy.xpath('//*[@id="incomeVsExpenseReport"]/table/tbody/tr[1]/td[2]/span'),
  outReport: () =>
    cy.xpath('//*[@id="incomeVsExpenseReport"]/table/tbody/tr[2]/td[2]/span'),
  differenceReport: () =>
    cy.xpath('//*[@id="incomeVsExpenseReport"]/table/tbody/tr[3]/td[2]/span'),
  submit: () => cy.get('button[type="submit"]'),
};
