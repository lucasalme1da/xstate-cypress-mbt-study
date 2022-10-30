/* eslint-disable no-undef */
/// <reference types="cypress" />

export const type = (el, text, force) =>
  el().type("{selectall}" + text, { delay: 0, force });

export const addTests = (state, tests) => {
  return {
    ...state,
    states: Object.entries(state.states).reduce((s, [stateKey, stateValue]) => {
      return {
        ...s,
        [stateKey]: {
          ...stateValue,
          meta: {
            ...stateValue.meta,
            test: tests[stateKey],
          },
        },
      };
    }, {}),
  };
};
