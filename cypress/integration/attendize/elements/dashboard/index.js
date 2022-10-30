/* eslint-disable no-undef */
/// <reference types="cypress" />

export const dashboardElements = {
  title: () => cy.get("h1[class='title']"),
  chromeTitle: () => cy.get("title"),
  event: () => cy.xpath('//*[@id="nav"]/li[2]/a/span[2]'),
  menuButton: () => cy.xpath('//*[@id="header"]/div[2]/ul[1]/li[1]/a'),
  ticket: () => cy.xpath('//*[@id="nav_event"]/li[2]/a'),
  survey: () => cy.xpath('//*[@id="nav_event"]/li[2]/a'),
  checkin: () => cy.xpath('//*[@id="nav_event"]/li[1]/a'),
  attendees: () => cy.xpath('//*[@id="nav_event"]/li[4]/a'),
  customize: () => cy.xpath('//*[@id="nav"]/li[3]/a'),
  publicEvent: () => cy.xpath('//*[@id="header"]/div[2]/ul[1]/li[2]/a'),
  backToDashboard: () => cy.xpath('//*[@id="nav_main"]/li/a'),
  buttonMenu: () => cy.xpath('//*[@id="header"]/div[2]/ul[2]/li/a'),
  signOut: () => cy.xpath('//*[@id="header"]/div[2]/ul[2]/li/ul/li[10]/a'),
};
