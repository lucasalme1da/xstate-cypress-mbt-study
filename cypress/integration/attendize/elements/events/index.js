/* eslint-disable no-undef */
/// <reference types="cypress" />

export const eventsElements = {
  firstManage: () =>
    cy.xpath(
      "//*[@id='main']/div[@class='container-fluid']/div[@class='row'][2]/div[@class='col-md-6 col-sm-6 col-xs-12']/div[@class='panel panel-success event']/div[@class='panel-footer']/ul[@class='nav nav-section nav-justified']/li[2]/a"
    ),
  combobox: () => cy.xpath('//*[@id="main"]/div/div[3]/div[2]/div/select'),
  createEventButton: () =>
    cy.xpath('//*[@id="main"]/div/div[2]/div/div[1]/div/div/a'),
  manageEvent: () =>
    cy.xpath('//*[@id="main"]/div/div[4]/div[1]/div/div[3]/ul/li[2]/a'),
  description1: () =>
    cy.xpath(
      "(.//*[normalize-space(text()) and normalize-space(.)='|'])[3]/following::div[9]"
    ),
  description: () =>
    cy.xpath(
      "(.//*[normalize-space(text()) and normalize-space(.)='|'])[3]/following::textarea[1]"
    ),
  startDate: () => cy.get("#start_date"),
  endDate: () => cy.get("#end_date"),
  title: () => cy.get('[name="title"]'),
  venueName: () => cy.get('[name="venue_name_full"]'),
  saveEventButton: () =>
    cy.xpath("/html/body/div[2]/form/div/div/div[3]/input"),
  titleError: () =>
    cy.xpath("/html/body/div[2]/form/div/div/div[2]/div/div/div[1]/div"),
  descriptionError: () =>
    cy.xpath("/html/body/div[2]/form/div/div/div[2]/div/div/div[2]/div[1]"),
  startDateError: () =>
    cy.xpath(
      "/html/body/div[2]/form/div/div/div[2]/div/div/div[3]/div[1]/div/div"
    ),
  endDateError: () =>
    cy.xpath(
      "/html/body/div[2]/form/div/div/div[2]/div/div/div[3]/div[2]/div/div"
    ),
  venueError: () =>
    cy.xpath("/html/body/div[2]/form/div/div/div[2]/div/div/div[5]/div[1]"),
  inputSearch: () => cy.get('[name="q"]'),
  buttonSearch: () => cy.get(".ico-search"),
  customizeButton: () => cy.xpath('//*[@id="nav_event"]/li[6]/a'),
  nothingFound: () => cy.get("h5"),
  firstEvent: () =>
    cy.xpath('//*[@id="main"]/div/div[4]/div[1]/div/div[1]/ul/li[1]/a'),
};
