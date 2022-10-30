/* eslint-disable no-undef */
/// <reference types="cypress" />

export const customizeEventElements = {
  inputTitle: () => cy.get("#title"),
  inputLocal: () => cy.get("#location_venue_name"),
  inputCity: () => cy.get("#location_state"),
  inputAddressLine1: () => cy.get("#location_address_line_1"),
  inputAddressLine2: () => cy.get("#location_address_line_2"),
  buttonSaveChanges: () =>
    cy.xpath('//*[@id="general"]/form/div/div[2]/div/input[2]'),
  msgSucess: () => cy.get(".humane"),
  eventePageButton: () => cy.xpath('//*[@id="header"]/div[2]/ul[1]/li[2]/a'),
  eventDesignTab: () => cy.xpath('//*[@id="main"]/div/div[3]/div/ul/li[2]/a'),
  imgs: () => cy.xpath('//*[@id="bgImage"]/div/img'),
  buttonSubmit: () =>
    cy.xpath('//*[@id="design"]/div/div[1]/form/div[2]/input'),
};
