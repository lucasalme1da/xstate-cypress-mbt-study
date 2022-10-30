/* eslint-disable no-undef */
/// <reference types="cypress" />

export const invoicesElements = {
  alertSkip: () => cy.xpath("/html/body/div[8]/div/div[5]/a[1]"),
  inputName: () => cy.xpath('//*[@id="ffInput_name"]'),
  inputMinValue: () => cy.xpath('//*[@id="ffInput_amount_min"]'),
  inputMaxValue: () => cy.xpath('//*[@id="ffInput_amount_max"]'),
  formNewInvoice: () => cy.xpath('//*[@id="store"]'),
  btnDeleteInvoice: () =>
    cy.xpath(
      '//*[@id="app"]/div[1]/section[2]/div/div/div/div[2]/table/tbody/tr[1]/td[1]/div/a[2]'
    ),
  btnConfirmDeletion: () =>
    cy.xpath('//*[@id="destroy"]/div/div/div/div[3]/input'),
  alertDelete: () => cy.xpath("/html/body/div[7]/div/div[5]/a[1]"),
  repetitions: () => cy.xpath('//*[@id="ffInput_repeat_freq"]'),
  title: () => cy.xpath('//*[@id="app"]/div[1]/section[2]/div/strong'),
};
