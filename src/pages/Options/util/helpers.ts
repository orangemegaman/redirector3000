/* eslint-disable no-bitwise */
import { STORAGE_NAME } from './constants';
import { IRule, IData } from '../interfaces';

// const parseJSON = (str: string | null) => {
// 	try {
// 		if (str) {
// 			const parsedData = JSON.parse(str);
// 			return parsedData;
// 		} else {
// 			return null;
// 		}
// 	} catch (error) {
// 		return null;
// 	}
// };

export const getData = (): IData | null => {
	const data = localStorage.getItem(STORAGE_NAME);
	chrome.storage.local.get(['store']).then((result) => {
		console.log('Value currently is ' + result.store);
	});

	return data ? JSON.parse(data) : {};
};

export const getRules = (): IRule[] | [] => {
	return getData()?.rules || [];
};

export const setData = (data: IData): void => {
	// localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
	chrome.storage.local.set({ store: data }).then(() => {
		console.log('store is set');
	});
};

export const uuid = (): string => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;

		return v.toString(16);
	});
};

export const download = (fileName: string, store: IData) => {
	const a = document.createElement('a');
	var file = new Blob([JSON.stringify(store)], { type: 'application/json' });
	a.href = URL.createObjectURL(file);
	a.download = `${fileName}.json`;
	a.click();
};

export const upload = () => {};
