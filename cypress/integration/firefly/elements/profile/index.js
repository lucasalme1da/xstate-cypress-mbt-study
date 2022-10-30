/* eslint-disable no-undef */
/// <reference types="cypress" />

export const profileElements = {
  linkDeleteAccount: () =>
    cy.xpath(
      '//*[@id="app"]/div[1]/section[2]/div[1]/div/div/div[2]/ul/li[3]/a'
    ),
  title: () => cy.xpath('//*[@id="app"]/div[1]/section[1]/h1'),
  inputPassword: () => cy.xpath('//*[@id="password"]'),
  buttonDeleteAccount: () =>
    cy.xpath('//*[@id="delete-account"]/div/div/div/div[3]/button'),
};
