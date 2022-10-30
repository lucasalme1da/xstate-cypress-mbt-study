/* eslint-disable no-undef */
/// <reference types="cypress" />

export const tagsElements = {
  btnCreateNewTag: () =>
    cy.xpath('//*[@id="app"]/div[1]/section[2]/div/div/div/div[2]/p[3]/a'),
  inputTag: () => cy.xpath('//*[@id="ffInput_tag"]'),
  formNewTag: () => cy.xpath('//*[@id="store"]'),
  message: () => cy.xpath('//*[@id="app"]/div[1]/section[2]/div[1]/strong'),
  tag: () =>
    cy.xpath('//*[@id="app"]/div[1]/section[2]/div[3]/div/div/div[2]/p/a/i'),
  btnDelete: () =>
    cy.xpath(
      '//*[@id="app"]/div[1]/section[2]/div[1]/div[1]/div/div[3]/div/a[2]'
    ),
  btnConfirmDeletion: () =>
    cy.xpath('//*[@id="destroy"]/div/div/div/div[3]/input'),
};
