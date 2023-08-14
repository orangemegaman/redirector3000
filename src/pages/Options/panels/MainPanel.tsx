import {
	Icon24AddOutline,
	Icon24ArrowDownOutline,
	Icon24ArrowUpOutline,
	Icon24DeleteOutlineAndroid,
} from '@vkontakte/icons';
import {
	CardGrid,
	Group,
	PanelHeader,
	SubnavigationBar,
	SubnavigationButton,
	Tabs,
	TabsItem,
	Title,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MODAL, ModalsContext } from '../components/ModalsContext';
import { NavigationContext, PanelIDs } from '../components/NavigationContext';

import { RuleCard } from '../components/RuleCard';
import { actions, StoreContext } from '../components/StoreContext';
import { IRule } from '../interfaces';
import { setData, upload } from '../util/helpers';

export type IMainPanelProps = {};

const MainPanel = ({}: IMainPanelProps) => {
	const { setActivePanel } = useContext(NavigationContext);
	const { store, dispatch } = useContext(StoreContext);
	const { setActiveModal } = useContext(ModalsContext);
	const { rules } = store;

	const handleRemoveAll = () => {
		dispatch(actions.clearAll());
		setData(store);
	};

	return (
		<>
			<PanelHeader>Rerdirector 3000 </PanelHeader>
			<Group>
				<SubnavigationBar mode='fixed'>
					<SubnavigationButton
						before={<Icon24AddOutline />}
						size='l'
						textLevel='3'
						onClick={() => setActivePanel(PanelIDs.RULE)}
					>
						Новая группа
					</SubnavigationButton>

					<SubnavigationButton
						before={<Icon24ArrowUpOutline />}
						size='l'
						textLevel='3'
						onClick={() => {
							setActiveModal(MODAL.EXPORT);
						}}
					>
						Экспорт
					</SubnavigationButton>
					<SubnavigationButton
						before={<Icon24ArrowDownOutline />}
						size='l'
						textLevel='3'
						onClick={() => {
							setActiveModal(MODAL.IMPORT);
						}}
					>
						Импорт
					</SubnavigationButton>
					<SubnavigationButton
						before={<Icon24DeleteOutlineAndroid fill='var(--destructive)' />}
						size='l'
						textLevel='3'
						onClick={handleRemoveAll}
						style={{ color: 'var(--destructive)' }}
					>
						Удалить все правила
					</SubnavigationButton>
				</SubnavigationBar>
			</Group>

			{!rules.length ? (
				<Title
					level='1'
					weight='2'
					style={{
						textAlign: 'center',
						color: 'var(--vkui--color_text_secondary)',
						marginTop: 24,
					}}
				>
					здесь будут правила
				</Title>
			) : (
				<Group>
					<CardGrid size='s'>
						{rules && rules.map((rule: IRule) => <RuleCard key={rule.id} {...rule} />)}
					</CardGrid>
				</Group>
			)}
		</>
	);
};

export default MainPanel;
