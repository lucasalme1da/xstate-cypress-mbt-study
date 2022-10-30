/* eslint-disable no-undef */
/// <reference types="cypress" />

export const menuElements = {
  title: () => cy.xpath('//*[@id="app"]/div[1]/section[1]/h1'),
  skipAlert: () => cy.xpath("/html/body/div[8]/div/div[5]/a[1]"),
  menuOptions: () => cy.xpath('//*[@id="option-menu"]/a'),
  menuProfile: () => cy.xpath('//*[@id="option-menu"]/ul/li[1]/a'),
  menuCreateNewThings: () => cy.xpath('//*[@id="sidebar-toggle"]/a'),
  menuNewDeposit: () =>
    cy.xpath('//*[@id="control-sidebar-home-tab"]/ul/li[2]/a'),
  menuNewActiveAccount: () =>
    cy.xpath('//*[@id="control-sidebar-home-tab"]/ul/li[4]/a'),
  menuNewInvoice: () =>
    cy.xpath('//*[@id="control-sidebar-home-tab"]/ul/li[10]/a'),
  menuNewBudget: () =>
    cy.xpath('//*[@id="control-sidebar-home-tab"]/ul/li[7]/a'),
  menuTags: () => cy.xpath('//*[@id="app"]/aside[1]/section/ul/li[5]/a'),
  menuDisconnect: () => cy.xpath('//*[@id="app"]/aside[1]/section/ul/li[11]/a'),
  menuBudgets: () => cy.xpath('//*[@id="budget-menu"]/a'),
  menuAccounts: () => cy.xpath('//*[@id="account-menu"]'),
  menuActiveAccounts: () => cy.xpath('//*[@id="account-menu"]/ul/li[1]/a'),
  message: () => cy.xpath('//*[@id="app"]/div[1]/section[2]/div[1]/strong'),
  user: () => cy.xpath('//*[@id="app"]/header/nav/div/ul/li[3]/span/span'),
  transaction: () => cy.get("#transaction-menu"),
  transactionRevenueIncome: () =>
    cy.xpath('//*[@id="transaction-menu"]/ul/li[2]/a'),
  moneyManagement: () => cy.xpath('//*[@id="app"]/aside[1]/section/ul/li[8]/a'),
  piggyBanks: () =>
    cy.xpath('//*[@id="app"]/aside[1]/section/ul/li[8]/ul/li[1]/a'),
  bills: () => cy.xpath('//*[@id="app"]/aside[1]/section/ul/li[8]/ul/li[2]/a'),
  categories: () => cy.xpath('//*[@id="app"]/aside[1]/section/ul/li[4]/a'),
  reports: () => cy.xpath('//*[@id="report-menu"]/a'),
  expenses: () => cy.xpath('//*[@id="transaction-menu"]/ul/li[1]/a'),
};
