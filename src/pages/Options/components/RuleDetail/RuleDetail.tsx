import React, { useEffect, useState } from 'react';
import {
	FormItem,
	Input,
	Group,
	PanelHeader,
	SubnavigationBar,
	SubnavigationButton,
	PanelHeaderBack,
	Div,
	Switch,
	Cell,
	List,
	CellButton,
} from '@vkontakte/vkui';
import {
	Icon24DoneOutline,
	Icon24ArrowDownOutline,
	Icon24ArrowUpOutline,
	Icon24DeleteOutlineAndroid,
} from '@vkontakte/icons';

import { uuid } from '../../util/helpers';
import { IDetail, URLType } from '../../interfaces';
import './RuleDEtail.css';


interface IRuleDetailProps extends Omit<IDetail, 'id'> {
	onChange: (value: string, name: URLType, index: number) => void;
	index: number;
	onDelete: (index: number) => void;
}

export const RuleDetail = ({ requestURL, destinationURL, useWholeWordMatch, index, onChange, onDelete }: IRuleDetailProps) => {
	return (
		<Group>
			<div className="rule__form">
				<div className="rule__inputs">
					<FormItem top="request url">
						<Input type="text" value={requestURL} onChange={(e) => onChange(e.target.value, 'requestURL', index)} />
					</FormItem>
					<FormItem top="destination url">
						<Input
							type="text"
							value={destinationURL}
							onChange={(e) => onChange(e.target.value, 'destinationURL', index)}
						/>
					</FormItem>
				</div>
				<Div className="rule__preferences">
					<List>
						<Cell after={<Switch />}>Use RegExp</Cell>
						<CellButton onClick={()=> onDelete(index)} before={<Icon24DeleteOutlineAndroid />}>Delete</CellButton>
					</List>
				</Div>
			</div>
		</Group>
	);
};
