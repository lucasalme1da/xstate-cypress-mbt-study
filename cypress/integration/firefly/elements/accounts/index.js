/* eslint-disable no-undef */
/// <reference types="cypress" />

export const accountsElements = {
  alertSkip: () => cy.xpath("/html/body/div[7]/div/div[5]/a[1]"),
  inputName: () => cy.xpath('//*[@id="ffInput_name"]'),
  formNewAccount: () => cy.xpath('//*[@id="store"]'),
  message: () => cy.xpath('//*[@id="app"]/div[1]/section[2]/div[2]/strong'),
  btnDelete: () =>
    cy.xpath(
      '//*[@id="account-index-asset"]/div[2]/table/tbody/tr[4]/td[1]/div/a[3]/i'
    ),
  btnConfirmDeletion: () =>
    cy.xpath('//*[@id="destroy"]/div/div/div/div[3]/input'),
};
