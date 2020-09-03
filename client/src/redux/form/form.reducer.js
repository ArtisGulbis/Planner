import { FormTypes } from './form.types';

const INITIAL_STATE = {
  isCreating: false,
  currentCard: 0,
};

const formReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FormTypes.CREATING:
      return {
        ...state,
        isCreating: !state.isCreating,
        currentCard: action.payload.cardNr,
      };

    default:
      return state;
  }
};

export default formReducer;
