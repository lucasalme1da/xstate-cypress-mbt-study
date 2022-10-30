/* eslint-disable no-undef */
/// <reference types="cypress" />

export const surveysElements = {
  inviteAttendeeButton: () =>
    cy.xpath('//*[@id="main"]/div/div[2]/div/div[1]/div/div[1]/button'),
  centralText: () => cy.xpath('//*[@id="main"]/div/div[3]/div/div/div[2]/h1'),
  createQuestionButton: () =>
    cy.xpath('//*[@id="main"]/div/div[2]/div/div[1]/div/div[1]/button'),
  questionTitle: () => cy.xpath('//*[@id="question-title"]'),
  firstQuestion: () =>
    cy.xpath('//*[@id="question-options"]/table/tbody/tr/td[1]/input'),
  secondQuestion: () =>
    cy.xpath('//*[@id="question-options"]/table/tbody/tr[2]/td[1]/input'),
  addAnotherOptionButton: () => cy.xpath('//*[@id="add-question-option"]'),
  requiredCheckbox: () =>
    cy.xpath('//*[@id="edit-question-form"]/div/div/div[2]/div[4]/div/label'),
  saveQuestionButton: () =>
    cy.xpath('//*[@id="edit-question-form"]/div/div/div[3]/input'),
  msgSucess: () => cy.get(".humane"),
  selectType: () => cy.xpath('//*[@id="question-type"]'),
};
