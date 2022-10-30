/* eslint-disable no-undef */
/// <reference types="cypress" />

export const checkinElements = {
  attendee: () => cy.xpath('//*[@id="attendee_list"]/li'),
  button: () => cy.xpath('//*[@id="attendee_list"]/li/a'),
};
