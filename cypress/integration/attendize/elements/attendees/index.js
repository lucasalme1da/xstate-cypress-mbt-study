/* eslint-disable no-undef */
/// <reference types="cypress" />

export const attendeesElements = {
  inviteAttendeeButton: () =>
    cy.xpath('//*[@id="main"]/div/div[2]/div/div[1]/div/div[1]/button'),
  first_name: () => cy.xpath('//*[@id="first_name"]'),
  last_name: () => cy.xpath('//*[@id="last_name"]'),
  email: () => cy.xpath('//*[@id="email"]'),
  saveAttendeeButton: () =>
    cy.xpath("/html/body/div[3]/form/div/div/div[3]/input"),
  confirmMessage: () => cy.xpath("/html/body/div[2]"),
  selectTickets: () => cy.get("#ticket_id"),
  buttonCancelAttendee: () =>
    cy.xpath(
      '//*[@id="main"]/div/div[3]/div[1]/div/div/table/tbody/tr/td[5]/a[2]'
    ),
  buttonConfirmCancel: () =>
    cy.xpath("/html/body/div[3]/form/div/div/div[3]/input[2]"),
  msgDeletedAttendee: () => cy.get(".humane"),
};
