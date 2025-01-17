import { ReduxActionType } from 'helpers/types';
import { BookmarksType } from './types';
import { SET_COLLECTION } from './constants';

export const initStateBookmarks: BookmarksType = {
	owner: null,
	ids: [],
};

export function bookmarksReducer(state: BookmarksType = initStateBookmarks, action: ReduxActionType) {
	switch (action.type) {
		case SET_COLLECTION:
			return Object.assign({}, state, {
				owner: action.payload.owner ?? state.owner,
				ids: action.payload.ids ?? state.ids,
			});
		default:
			return state;
	}
}
