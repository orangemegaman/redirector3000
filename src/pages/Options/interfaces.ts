export interface IRule {
	id: string;
	timestamp: number;
	title: string;
	isActive: boolean;
	details: IDetail[];
}

export interface IData {
	isActive: boolean;
	rules: IRule[];
}

export interface IDetail {
	id: string;
	requestURL: string;
	destinationURL: string;
	useWholeWordMatch: boolean;
}

export type URLType = 'requestURL' | 'destinationURL';
