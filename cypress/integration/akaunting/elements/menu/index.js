/* eslint-disable no-undef */
/// <reference types="cypress" />

export const menuElements = {
  items: () => cy.xpath("/html/body/div[1]/aside/div/section/ul[2]/li[2]/a"),
  akuaunting: () => cy.xpath("/html/body/div/header/a/span[2]/b"),
  incomes: () => cy.xpath("/html/body/div[1]/aside/div/section/ul[2]/li[3]/a"),
  invoices: () =>
    cy.xpath("/html/body/div[1]/aside/div/section/ul[2]/li[3]/ul/li[1]/a/span"),
  customers: () =>
    cy.xpath("/html/body/div[1]/aside/div/section/ul[2]/li[3]/ul/li[3]/a"),
  expenses: () =>
    cy.xpath("/html/body/div[1]/aside/div/section/ul[2]/li[4]/a/span[1]"),
  banking: () =>
    cy.xpath("/html/body/div/aside/div/section/ul[2]/li[5]/a/span[1]"),
  transaction: () =>
    cy.xpath("/html/body/div/aside/div/section/ul[2]/li[5]/ul/li[3]/a/span"),
  vendors: () =>
    cy.xpath("/html/body/div[1]/aside/div/section/ul[2]/li[4]/ul/li[3]/a"),
  reports: () =>
    cy.xpath("/html/body/div/aside/div/section/ul[2]/li[6]/a/span[1]"),
  profitLoss: () =>
    cy.xpath("/html/body/div/aside/div/section/ul[2]/li[6]/ul/li[5]/a/span"),
  settings: () =>
    cy.xpath("/html/body/div/aside/div/section/ul[2]/li[7]/a/span[1]"),
  categories: () =>
    cy.xpath("/html/body/div/aside/div/section/ul[2]/li[7]/ul/li[2]/a/span"),
  profile: () => cy.xpath("/html/body/div[1]/header/nav/div/ul/li[5]/a"),
  profileButton: () =>
    cy.xpath("/html/body/div/header/nav/div/ul/li[5]/ul/li[3]/div[1]/a"),
  btnRevenues: () =>
    cy.xpath("/html/body/div[1]/aside/div/section/ul[2]/li[3]/ul/li[2]/a/span"),
};
