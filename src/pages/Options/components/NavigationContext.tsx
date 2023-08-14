import React, { useCallback, useState } from 'react';
import { IMainPanelProps } from '../panels/MainPanel';
import { IRulePanelProps } from '../panels/RulePanel';

export enum PanelIDs {
    MAIN = 'main',
    RULE = 'RULE',
}

type NavigationContextType = {
    activePanel: ActivePanel;
    panelHistory: ActivePanel[];
    setActivePanel: (
        panel: PanelIDs,
        panelProps?: ActivePanel['panelProps']
    ) => void;
    goBack: () => void;
};

export const NavigationContext = React.createContext<NavigationContextType>({
    activePanel: { panelId: PanelIDs.MAIN },
    panelHistory: [],
    setActivePanel: () => undefined,
    goBack: () => undefined,
});

export type ActivePanel = {
    panelId: PanelIDs;
    panelProps?: IRulePanelProps | IMainPanelProps;
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [history, setHistory] = useState([{ panelId: PanelIDs.MAIN }]);
    const [activePanel, setActivePanel] = useState<ActivePanel>({
        panelId: PanelIDs.MAIN,
    });

    const setActivePanelHandler = useCallback(
        (panelId: PanelIDs, panelProps?: ActivePanel['panelProps']) => {
            setActivePanel({ panelId, panelProps });
            setHistory((prev) => [...prev, {panelId, panelProps}]);
        },
        []
    );

    const goBackHandler = useCallback(() => {
        const prevPanel = history[history.length -2];
        if (prevPanel) {
            setActivePanel(prevPanel);
            setHistory((prev) => prev.slice(0, prev.length - 1));
        }
    }, [history]);

    return (
        <NavigationContext.Provider
            value={{
                activePanel: activePanel,
                panelHistory: [],
                setActivePanel: setActivePanelHandler,
                goBack: goBackHandler,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};
