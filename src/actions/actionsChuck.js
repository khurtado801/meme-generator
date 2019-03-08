// #Action type
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_DIALOG = 'SET_DIALOG';
export const SHOW_DIALOG = 'SHOW_DIALOG';
export const HIDE_DIALOG = 'HIDE_DIALOG';
export const CHANGE_STATE= 'CHANGE_STATE';


// #Action creator
export function receiveCategories(json) {
	const { items } = json.data;
	// #Action
	return {
		type: RECEIVE_CATEGORIES, // #Return action whose type is SET_CATEGORIES
		items // #ES6, set items to items
	};
}

// #Action creator
export function getCategories(items) {
	return {
		type: GET_CATEGORIES,
		items
	};
}

// #Action creator
export function setCategory(items) {
	// #Action-return object whose type is SET_CATEGORIES
	return {
		type: SET_CATEGORIES,
		items // # Pass in items
	};
}

// #Action creator
export function showDialog() {
	return {
		type: SHOW_DIALOG,
	};
}

// #Action creator
export function hideDialog() {
	return {
		type: HIDE_DIALOG,
	};
}

export const action = {
	type: CHANGE_STATE,
	payload: {
		newState: 'New State'
	}
};
