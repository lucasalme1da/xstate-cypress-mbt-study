/* eslint-disable no-undef */
/// <reference types="cypress" />

export const transactionElements = {
  select: () =>
    cy.xpath("/html/body/div/div/section[2]/div/div[1]/form/div[1]/select[2]"),
  filter: () =>
    cy.xpath("/html/body/div/div/section[2]/div/div[1]/form/div[1]/button"),
};
