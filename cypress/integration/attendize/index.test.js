/* eslint-disable no-undef */
/// <reference types="cypress" />

import { Machine } from "xstate";
import { createModel } from "@xstate/test";
import { attendizeStates } from "./states";
import { format } from "date-fns";

import { faker } from "@faker-js/faker";
import { loginElements } from "./elements/login/index";
import { dashboardElements } from "./elements/dashboard/index";
import { eventsElements } from "./elements/events/index";
import { ticketsElements } from "./elements/tickets/index";
import { attendeesElements } from "./elements/attendees/index";
import { checkinElements } from "./elements/checkin/index";
import { surveysElements } from "./elements/surveys/index";
import { customizeElements } from "./elements/customize/index";
import { customizeEventElements } from "./elements/customizeEvent/index";

import { type, addTests } from "../helper/index";

describe("Attendize", () => {
  // Objeto para armazenar estados utilizados durante os testes
  const props = {
    events: [],
    tickets: [],
    surveys: [],
    companyName: "Company Name",
  };

  // Log da máquina de estados para utilizar no XState Visualizer
  console.log(JSON.stringify(attendizeStates));

  // Assertivas dos estados da MEF
  const assertions = {
    LOGGED_OFF: () => {
      const { errorMessage, ...rest } = loginElements;

      Object.values(rest).forEach((element) => element().should("be.visible"));
    },
    LOGIN_FAILED: () => {
      const { errorMessage } = loginElements;

      errorMessage().should(
        "contain.text",
        "Your username/password combination was incorrect"
      );
    },
    DASHBOARD: () => {
      const { title } = dashboardElements;

      title().should("contain.text", props.companyName + " Dashboard");
    },
    CUSTOMIZE: () => {
      const { otherCustomizationOptions } = customizeElements;

      otherCustomizationOptions().should("be.visible");
    },
    EVENT_COLOR_CHANGED: () => {
      cy.visit("/o/1");

      const { colorTitle } = customizeElements;

      colorTitle().should("have.css", "background-color", "rgb(44, 102, 206)");
    },
    COMPANY_INFO_CHANGED: () => {
      const { msgSucess } = customizeElements;

      msgSucess().should("contain.text", "Successfully Updated Organiser!");
    },
    EVENTS: () => {
      const { createEventButton } = eventsElements;

      createEventButton().should("be.visible");
    },
    CREATE_EVENT_FAILED: () => {
      const {
        titleError,
        descriptionError,
        startDateError,
        endDateError,
        venueError,
      } = eventsElements;
      titleError().should(
        "contain.text",
        "You must at least give a title for your event."
      );
      descriptionError().should(
        "contain.text",
        "The description field is required."
      );
      startDateError().should(
        "contain.text",
        "The start date field is required."
      );
      endDateError().should("contain.text", "The end date field is required.");
      venueError().should(
        "contain.text",
        "Please enter a venue for your event"
      );
    },
    EVENT_CREATED: () => {
      const { noTicket } = ticketsElements;

      noTicket().should("contain.text", "No Tickets Yet");
    },
    EVENT_MANAGEMENT: () => {
      const { ticket } = dashboardElements;

      ticket().should("be.visible");
    },
    EVENT_IMAGE_CHANGED: () => {
      const { msgSucess } = customizeEventElements;

      msgSucess().should("contain.text", "Event Page Successfully Updated.");
    },
    EVENT_INFO_CHANGED: () => {
      cy.wait(3000);

      cy.visit(
        `/e/${props.events.length}/${props.events[props.events.length - 1].title
          .split(" ")
          .join("-")
          .toLowerCase()}`
      );
      cy.wait(2000);
      cy.title().should("eq", "Test - Attendize.com");
    },
    SEARCH_RESULT: () => {
      const { firstEvent } = eventsElements;

      firstEvent().should("be.visible");
    },
    SEARCH_ERROR: () => {
      const { nothingFound } = eventsElements;

      nothingFound().should("be.visible");
    },
    TICKET_CREATED: () => {
      const { confirmMessage } = ticketsElements;

      confirmMessage().should("contain.text", "Successfully Created Ticket");
    },
    SURVEY_CREATED: () => {
      const { msgSucess } = surveysElements;

      msgSucess().should("contain.text", "Successfully Created Question");
    },
    ATTENDEE_INVITED: () => {
      const { confirmMessage } = attendeesElements;

      confirmMessage().should("contain.text", "Attendee Successfully Invited!");
    },
    ATTENDEE_CHECKED_IN: () => {
      const { attendee } = checkinElements;
      attendee().should("have.css", "background-color", "rgb(230, 255, 231)");
    },
    ATTENDEE_CANCELED: () => {
      const { msgDeletedAttendee } = attendeesElements;

      msgDeletedAttendee().should(
        "contain.text",
        "Successfully Cancelled Attendee!"
      );
    },
  };

  console.log(`Número de estados: ${Object.keys(assertions).length}`);

  // Eventos dos estados da MEF
  const events = {
    WRONG_LOGIN: () => {
      const { email, password, login } = loginElements;

      type(email, "test@test.com");
      type(password, "123");
      login().click();
    },
    LOGIN: () => {
      const { email, password, login } = loginElements;

      type(email, "test@test.com");
      type(password, "testpass");
      login().click();
    },
    LOGOUT: () => {
      const { signOut } = dashboardElements;

      signOut().click();
    },
    TO_CUSTOMIZE: () => {
      const { customize } = dashboardElements;

      customize().click();
    },
    TO_EVENTS: () => {
      const { event } = dashboardElements;

      event().click();
    },
    CHANGE_EVENT_COLOR: () => {
      const {
        otherCustomizationOptions,
        colorEvent,
        saveChangesButton,
        viewOrganizerPage,
      } = customizeElements;

      otherCustomizationOptions().click();
      type(colorEvent, "#2c66ce");
      saveChangesButton().click();
      cy.wait(2500);
      viewOrganizerPage().click();
    },
    CHANGE_COMPANY_INFO: () => {
      const { inputName, inputDescription, saveOrganizerButton } =
        customizeElements;

      type(inputName, "Test");
      type(inputDescription, "Testing");

      props.companyName = "Test";
      saveOrganizerButton().click();
    },
    CREATE_WRONG_EVENT: () => {
      const { createEventButton, saveEventButton } = eventsElements;
      createEventButton().click();
      saveEventButton().click();
    },
    CREATE_EVENT: () => {
      const {
        createEventButton,
        description,
        description1,
        startDate,
        endDate,
        venueName,
        title,
        saveEventButton,
      } = eventsElements;

      createEventButton().click();

      const startDateValue = faker.date.future(1);

      const newEvent = {
        title: faker.music.songName().replace(/[^\w\s]/gi, ""),
        description: faker.company.catchPhrase(),
        startDate: startDateValue,
        endDate: faker.date.future(1, startDate),
        venueName: faker.address.city() + ", " + faker.address.country(),
      };

      type(title, newEvent.title);

      description1().click();
      type(description, newEvent.description, true);
      type(startDate, format(newEvent.startDate, "dd-MM-yyyy kk:mm"), true);
      type(endDate, format(newEvent.endDate, "dd-MM-yyyy kk:mm"), true);
      type(venueName, newEvent.venueName);

      saveEventButton().click();

      props.events.push(newEvent);
    },
    OPEN_MANAGEMENT: () => {
      const { backToDashboard, event } = dashboardElements;
      const { combobox, firstManage } = eventsElements;

      backToDashboard().click();
      event().click();

      combobox().select("Creation Date");
      cy.wait(2000);

      firstManage().first().click();
    },
    CHANGE_IMAGE: () => {
      const { customizeButton } = eventsElements;

      customizeButton().click();

      const { eventDesignTab, imgs, buttonSubmit } = customizeEventElements;

      eventDesignTab().click();

      imgs().first().click();

      buttonSubmit().click();
    },
    CHANGE_INFO: () => {
      const { customizeButton } = eventsElements;

      customizeButton().click();

      const {
        inputTitle,
        inputLocal,
        inputAddressLine1,
        inputAddressLine2,
        inputCity,
        buttonSaveChanges,
        eventePageButton,
      } = customizeEventElements;

      type(inputTitle, "Test");
      type(inputLocal, "I moved");
      type(inputAddressLine1, "");
      type(inputAddressLine2, "");
      type(inputCity, "Paris");

      buttonSaveChanges().click();

      eventePageButton().click();
    },
    CREATE_TICKET: () => {
      const { ticket } = dashboardElements;

      ticket().first().click();

      const {
        buttonCreateTicket,
        titleTicket,
        priceTicket,
        quantityTicket,
        moreOptions,
        maxTicket,
        saveTicketButton,
      } = ticketsElements;

      buttonCreateTicket().click();

      const newTicket = {
        title: "Ticket Title",
        price: "20",
        quantity: "100",
        max: "3",
      };

      type(titleTicket, newTicket.title);
      type(priceTicket, newTicket.price);
      type(quantityTicket, newTicket.quantity);

      moreOptions().click();
      maxTicket().select(newTicket.max);

      props.tickets.push(newTicket);

      saveTicketButton().click();
    },
    SEARCH_CORRECT: () => {
      const { backToDashboard, event } = dashboardElements;
      const { inputSearch, buttonSearch } = eventsElements;
      backToDashboard().click();
      event().click();

      type(inputSearch, props.events[0].title);
      buttonSearch().click();
    },
    SEARCH_WRONG: () => {
      const { backToDashboard, event } = dashboardElements;
      const { inputSearch, buttonSearch } = eventsElements;
      backToDashboard().click();
      event().click();

      type(inputSearch, "You won't find anything");
      buttonSearch().click();
    },
    INVITE_ATTENDEE: () => {
      const { attendees } = dashboardElements;

      attendees().click();

      const {
        first_name,
        last_name,
        email,
        saveAttendeeButton,
        inviteAttendeeButton,
      } = attendeesElements;

      inviteAttendeeButton().click();

      const newAttendee = {
        fname: faker.name.firstName(),
        lname: faker.name.lastName(),
      };

      newAttendee.email = faker.internet.email(
        newAttendee.fname,
        newAttendee.lname
      );

      type(first_name, newAttendee.fname);
      type(last_name, newAttendee.lname);
      type(email, newAttendee.email);

      saveAttendeeButton().click();
    },
    CREATE_CHECK_SURVEY: () => {
      const { survey } = dashboardElements;

      survey().eq(1).click();

      const {
        createQuestionButton,
        questionTitle,
        selectType,
        firstQuestion,
        addAnotherOptionButton,
        secondQuestion,
        requiredCheckbox,
        saveQuestionButton,
      } = surveysElements;

      createQuestionButton().click();

      const newQuestion = {
        title: "Did you like?",
        type: "Radio input",
        first: "Good",
        second: "Bad",
      };

      type(questionTitle, newQuestion.title);
      selectType().select(newQuestion.type);
      type(firstQuestion, newQuestion.first);
      addAnotherOptionButton().click();
      type(secondQuestion, newQuestion.second);

      requiredCheckbox().click();

      saveQuestionButton().click();

      props.surveys.push(newQuestion);
    },
    CREATE_TEXT_SURVEY: () => {
      const { survey } = dashboardElements;

      survey().eq(1).click();

      const {
        createQuestionButton,
        questionTitle,
        selectType,
        saveQuestionButton,
      } = surveysElements;

      createQuestionButton().click();

      const newQuestion = {
        title: "What's your name?",
        type: "Single-line text box",
      };

      type(questionTitle, newQuestion.title);
      selectType().select(newQuestion.type);

      saveQuestionButton().click();

      props.surveys.push(newQuestion);
    },
    CHECK_IN: () => {
      const { backToDashboard, event, checkin } = dashboardElements;
      const { combobox, firstManage } = eventsElements;

      backToDashboard().click();
      event().click();

      combobox().select("Creation Date");
      cy.wait(2000);

      firstManage().first().click();

      checkin().eq(1).click();

      const { button } = checkinElements;

      button().click();
    },
    CANCEL: () => {
      const { buttonCancelAttendee, buttonConfirmCancel } = attendeesElements;

      buttonCancelAttendee().click();
      buttonConfirmCancel().click();
    },
  };

  console.log(`Número de eventos: ${Object.keys(events).length}`);

  // Criando o modelo de testes utilizando a máquina de estados, com as assertivas (assertions) e os eventos (events)
  const testModel = createModel(
    Machine(addTests(attendizeStates, assertions)),
    {
      events,
    }
  );

  // Gerando os caminhos simples (equivalentes aos casos de teste)
  const testPlans = testModel.getSimplePathPlans();

  console.log(testPlans);

  // Executando cada caso de teste
  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        it(path.description, () => {
          return cy.visit("/").then(() => {
            return path.test();
          });
        });
      });
    });
  });

  // Executando um teste de cobertura do modelo (analisa se cada estado foi alcançado durante os testes)
  describe("coverage", () => {
    it("should pass", () => {
      testModel.testCoverage();
    });
  });
});
