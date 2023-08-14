import React, { useContext } from 'react';
import {
    Icon28DeleteOutline,
    Icon28EditOutline,
    Icon28ShareExternal,
} from '@vkontakte/icons';
import {
    Caption,
    Card,
    Div,
    Headline,
    SimpleCell,
    Switch,
} from '@vkontakte/vkui';
import './style.css';
import { actions, StoreContext } from '../StoreContext';
import { IRule } from '../../interfaces';
import { NavigationContext, PanelIDs } from '../NavigationContext';

export const RuleCard = (rule: IRule) => {
    const { dispatch } = useContext(StoreContext);
    const { setActivePanel } = useContext(NavigationContext);
    const { id, isActive } = rule;

    const handleToggleClick = () => {
        dispatch(actions.updateRule({ ...rule, isActive: !rule.isActive }));
    };

    return (
        <Card mode="outline">
            <Div>
                <div className="card__header">
                    <div className="card__status">
                        <Headline weight="2" className="card__headline">
                            {rule.title || 'unnamed'}
                        </Headline>
                        <Switch
                            checked={isActive}
                            onChange={handleToggleClick}
                        />
                    </div>
                    <Caption level="1" weight="2" className="card__caption">
                        {new Date().toLocaleDateString()}
                    </Caption>
                </div>
                <SimpleCell
                    className="card__action"
                    onClick={() => setActivePanel(PanelIDs.RULE, { rule })}
                    expandable
                    before={<Icon28EditOutline />}
                >
                    Редактировать
                </SimpleCell>

                <SimpleCell
                    className="card__action"
                    onClick={() => {
                        dispatch(actions.removeRule(id));
                    }}
                    expandable
                    before={<Icon28DeleteOutline fill="var(--destructive)" />}
                >
                    Удалить
                </SimpleCell>
            </Div>
        </Card>
    );
};
