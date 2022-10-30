/* eslint-disable no-undef */
/// <reference types="cypress" />

export const profileElements = {
  name: () => cy.get("#name"),
  password: () => cy.get("#password"),
  password_confirmation: () => cy.get("#password_confirmation"),
  viewLanguages: () =>
    cy.xpath(
      "/html/body/div/div/section[2]/div/form/div[1]/div[5]/div/span/span[1]/span/span[2]"
    ),
  language: () => cy.xpath('//*[@id="locale"]/option[20]'),
  language2: () => cy.xpath('//*[@id="locale"]/option[2]'),
  save: () =>
    cy.xpath("/html/body/div/div/section[2]/div/form/div[2]/div/div/button"),
};
