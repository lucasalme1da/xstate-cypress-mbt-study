export const attendizeStates = {
  id: "attendize",
  initial: "LOGGED_OFF",
  states: {
    LOGGED_OFF: {
      on: {
        WRONG_LOGIN: "LOGIN_FAILED",
        LOGIN: "DASHBOARD",
      },
    },
    LOGIN_FAILED: {},
    DASHBOARD: {
      on: {
        LOGOUT: "LOGGED_OFF",
        TO_CUSTOMIZE: "CUSTOMIZE",
        TO_EVENTS: "EVENTS",
      },
    },
    CUSTOMIZE: {
      on: {
        CHANGE_EVENT_COLOR: "EVENT_COLOR_CHANGED",
        CHANGE_COMPANY_INFO: "COMPANY_INFO_CHANGED",
      },
    },
    EVENT_COLOR_CHANGED: {},
    COMPANY_INFO_CHANGED: {},
    EVENTS: {
      on: {
        CREATE_WRONG_EVENT: "CREATE_EVENT_FAILED",
        CREATE_EVENT: "EVENT_CREATED",
      },
    },
    CREATE_EVENT_FAILED: {},
    EVENT_CREATED: {
      on: {
        OPEN_MANAGEMENT: "EVENT_MANAGEMENT",
        SEARCH_CORRECT: "SEARCH_RESULT",
        SEARCH_WRONG: "SEARCH_ERROR",
      },
    },
    EVENT_MANAGEMENT: {
      on: {
        CHANGE_IMAGE: "EVENT_IMAGE_CHANGED",
        CHANGE_INFO: "EVENT_INFO_CHANGED",
        CREATE_TICKET: "TICKET_CREATED",
      },
    },
    EVENT_IMAGE_CHANGED: {},
    EVENT_INFO_CHANGED: {},
    SEARCH_RESULT: {},
    SEARCH_ERROR: {},
    TICKET_CREATED: {
      on: {
        INVITE_ATTENDEE: "ATTENDEE_INVITED",
        CREATE_CHECK_SURVEY: "SURVEY_CREATED",
        CREATE_TEXT_SURVEY: "SURVEY_CREATED",
      },
    },
    SURVEY_CREATED: {},
    ATTENDEE_INVITED: {
      on: {
        CHECK_IN: "ATTENDEE_CHECKED_IN",
        CANCEL: "ATTENDEE_CANCELED",
      },
    },
    ATTENDEE_CHECKED_IN: {},
    ATTENDEE_CANCELED: {},
  },
};
