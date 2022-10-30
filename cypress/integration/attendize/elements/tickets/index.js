/* eslint-disable no-undef */
/// <reference types="cypress" />

export const ticketsElements = {
  maxTicket: () => cy.xpath('//*[@id="max_per_person"]'),
  title: () => cy.get("title"),
  noTicket: () => cy.xpath('//*[@id="main"]/div/div[3]/div/div/div[2]/h1'),
  createTicketButton: () =>
    cy.xpath('//*[@id="main"]/div/div[2]/div/div[1]/div/div/button'),
  titleTicket: () => cy.xpath('//*[@id="title"]'),
  priceTicket: () => cy.xpath('//*[@id="price"]'),
  quantityTicket: () => cy.xpath('//*[@id="quantity_available"]'),
  moreOptions: () =>
    cy.xpath("/html/body/div[3]/form/div/div/div[2]/div/div[2]/a"),
  saveTicketButton: () =>
    cy.xpath("/html/body/div[3]/form/div/div/div[3]/input"),
  confirmMessage: () => cy.xpath("/html/body/div[2]"),
  buttonCreateTicket: () =>
    cy.xpath('//*[@id="main"]/div/div[2]/div/div[1]/div/div/button'),
  firstTicket: () =>
    cy.xpath("/html/body/section/div/div[4]/div/div/div[1]/h3"),
  firstTicketPrice: () =>
    cy.xpath("/html/body/section/div/div[4]/div/div/div[1]/h3/span"),
};
