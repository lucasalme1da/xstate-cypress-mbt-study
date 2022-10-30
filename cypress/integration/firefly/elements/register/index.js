/* eslint-disable no-undef */
/// <reference types="cypress" />

export const registerElements = {
  inputEmail: () => cy.xpath('//*[@id="register"]/div[1]/input'),
  inputPassword: () => cy.xpath('//*[@id="register"]/div[2]/input'),
  inputPassword2: () => cy.xpath('//*[@id="register"]/div[3]/input'),
  buttonRegister: () => cy.xpath('//*[@id="register"]/div[4]/div[2]/button'),
  formTitle: () => cy.xpath("/html/body/div/div[2]/p"),
  inputBankName: () => cy.xpath('//*[@id="ffInput_bank_name"]'),
  inputBalance: () => cy.xpath('//*[@id="ffInput_bank_balance"]'),
  language: () => cy.xpath('//*[@id="lang_holder"]'),
  btnSubmit: () => cy.xpath('//*[@id="store"]/div/div/div/div[3]/input'),
};
