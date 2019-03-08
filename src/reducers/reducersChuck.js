import { combineReducers } from 'redux';
import { GET_CATEGORIES } from '../actions';
import { SET_CATEGORIES } from '../actions';
import { SHOW_DIALOG } from '../actions';
import { HIDE_DIALOG } from '../actions';

/**
 * #Root reducer
 * #First parameter state variable-set state to empty array by default, second parameteris action
 */
function categories(state = [], action) {
	// #Look at action type, to know what to switch on
	switch(action.type) { // #Switch on the action type
	case GET_CATEGORIES: // #For case of SET_CATEGORIES
		return action.items; // #Return array equivalent to the items from the GET_CATEGORIES action
	default: // #By default
		return state; // #Return state that we already defined, at beginning is empty array
	}
}

/**
 * Reducer
 * #First parameter state variable-set state to empty array by default, second parameter action, which contains type and info in a payload
 */
function usrCategory(state = [], action) {
	// #Switch on action type
	switch(action.type) {
	case SET_CATEGORIES: // #For case of SET_CATEGORIES
		return action.items; // #Return items that exist in action, array equivalent to the items from the SET_CATEGORIES action
	default:
		return state;
	}
}

function openDialog(state = {open: null}, action) {
	switch(action.type) {
	case SHOW_DIALOG:
		return  {
			...state,
			open: true,
		};
	case HIDE_DIALOG:
		return {
			...state,
			open: false,
		};
	default:
		return state;
	}
}



function reducer(state, action) {
	console.log('Action: ', action);

	return 'State';
}

// #Declare reducer variable, set to combineReducers so we can refer to categories reducer as reducer
const rootReducer = combineReducers({ categories, usrCategory, openDialog, reducer });

// #Export as default
export default rootReducer;