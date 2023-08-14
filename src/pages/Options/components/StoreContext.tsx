import React, { useCallback, useReducer, useState } from 'react';
import { IData, IDetail, IRule } from '../interfaces';

const initContext = {
	isActive: false,
	rules: [] as IRule[],
};

type PropTypes<T> = T extends { [key: string]: infer U } ? U : never;
type Action = ReturnType<PropTypes<typeof actions>>;

type StoreContextType = {
	store: IData;
	dispatch: React.Dispatch<Action>;
};

export const actions = {
	addRule: (rule: IRule) => ({ type: 'ADD_RULE', payload: { rule } } as const),
	updateRule: (rule: IRule) => ({ type: 'UPDATE_RULE', payload: { rule } } as const),
	removeRule: (id: string) => ({ type: 'REMOVE_RULE', payload: { id } } as const),
	clearAll: () => ({ type: 'CLEAR_ALL_RULES' } as const),
	loadState: (state: IData | null) =>
		({ type: 'LOAD_STATE_FORM_STORAGE', payload: state } as const),
};

export const reducer = (state: IData, action: Action) => {
	switch (action.type) {
		case 'ADD_RULE':
			return { ...state, rules: [...state.rules, action.payload.rule] };
		case 'UPDATE_RULE':
			const newRules = [...state.rules];
			for (let i in newRules) {
				if (newRules[i].id === action.payload.rule.id) {
					newRules[i] = { ...newRules[i], ...action.payload.rule };
				}
			}
			return {
				...state,
				rules: [...newRules],
			};
		case 'REMOVE_RULE':
			return {
				...state,
				rules: state.rules.filter((rule) => rule.id !== action.payload.id),
			};
		case 'CLEAR_ALL_RULES':
			console.log('reducer', 2);
			return { ...state, rules: [] };
		case 'LOAD_STATE_FORM_STORAGE':
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

export const StoreContext = React.createContext<StoreContextType>({
	store: initContext,
	dispatch: () => null,
});

export const StoreContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [store, dispatch] = useReducer(reducer, initContext);

	return <StoreContext.Provider value={{ store, dispatch }}>{children}</StoreContext.Provider>;
};
