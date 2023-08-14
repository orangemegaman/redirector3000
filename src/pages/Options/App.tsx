import {
    Panel,
    PanelHeader,
    SplitCol,
    SplitLayout,
    View,
} from '@vkontakte/vkui';
import { useContext, useEffect, useState } from 'react';
import { getData } from './util/helpers';
import RulePanel from './panels/RulePanel';
import MainPanel from './panels/MainPanel';
import '@vkontakte/vkui/dist/vkui.css';
import { NavigationContext, PanelIDs } from './components/NavigationContext';
import { Modal } from './components/Modal';
import { actions, StoreContext } from './components/StoreContext';
import { setData } from './util/helpers';
import './app.css';
import React from 'react';

export const App = () => {
    const { activePanel, setActivePanel } = useContext(NavigationContext);
    const [panel, setPanel] = useState('main');
    const [popout, setPopout] = useState(null);
    const { store, dispatch } = useContext(StoreContext);
    const isDesktop = true;

    useEffect(() => {
        const data = getData();
        dispatch(actions.loadState(data));
    }, []);

    useEffect(() => {
        setData(store);
    }, [store]);

    return (
        <SplitLayout
            style={{ justifyContent: 'center' }}
            header={<PanelHeader separator={false} />}
            popout={popout}
            modal={<Modal />}
        >
            <SplitCol animate={false} spaced={isDesktop}>
                <View activePanel={activePanel.panelId}>
                    <Panel id={PanelIDs.MAIN}>
                        <MainPanel />
                    </Panel>
                    <Panel id={PanelIDs.RULE}>
                        <RulePanel {...activePanel.panelProps} />
                    </Panel>
                </View>
            </SplitCol>
        </SplitLayout>
    );
};
