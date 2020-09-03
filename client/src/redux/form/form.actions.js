import { FormTypes } from './form.types';

export const showFormForTask = (cardNr) => (dispatch) => {
  dispatch({ type: FormTypes.CREATING, payload: { cardNr } });
};
