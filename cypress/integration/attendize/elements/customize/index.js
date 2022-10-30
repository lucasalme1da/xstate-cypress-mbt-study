/* eslint-disable no-undef */
/// <reference types="cypress" />

export const customizeElements = {
  inviteAttendeeButton: () =>
    cy.xpath('//*[@id="main"]/div/div[2]/div/div[1]/div/div[1]/button'),
  colorTitle: () => cy.xpath('//*[@id="intro"]'),
  taxId: () => cy.xpath('//*[@id="tax_id"]'),
  taxName: () => cy.xpath('//*[@id="tax_name"]'),
  taxValue: () => cy.xpath('//*[@id="tax_value"]'),
  otherCustomizationOptions: () =>
    cy.xpath('//*[@id="main"]/div/div[3]/div/ul/li[2]/a'),
  colorEvent: () => cy.xpath('//*[@id="page_header_bg_color"]'),
  yesRadioButton: () => cy.get("#charge_yes"),
  saveChangesButton: () =>
    cy.xpath('//*[@id="OrganiserPageDesign"]/form/div[2]/input'),
  saveOrganizerButton: () =>
    cy.xpath('//*[@id="organiserSettings"]/form/div[9]/input'),
  viewOrganizerPage: () => cy.xpath('//*[@id="header"]/div[2]/ul[1]/li[2]/a'),
  inputName: () => cy.get("#name"),
  inputDescription: () => cy.get("#about"),
  msgSucess: () => cy.get(".humane"),
};
