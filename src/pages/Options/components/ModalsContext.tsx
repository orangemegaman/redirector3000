import React, { useCallback, useState } from 'react';

export enum MODAL {
	EXPORT = 'EXPORT',
	IMPORT = 'IMPORT',
}

type ModalsContextType = {
	activeModal: MODAL | null;
	setActiveModal: (modal: MODAL) => void;
	closeActiveModal: () => void;
};

export const ModalsContext = React.createContext<ModalsContextType>({
	activeModal: null,
	setActiveModal: () => undefined,
	closeActiveModal: () => undefined,
});

export const ModalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [activeModal, setActiveModal] = useState<MODAL | null>(null);

    const closeActiveModalHandler = useCallback(()=>{
        setActiveModal(null);
    },[])
	return (
		<ModalsContext.Provider
			value={{
				activeModal,
				setActiveModal,
                closeActiveModal: closeActiveModalHandler
			}}
		>
			{children}
		</ModalsContext.Provider>
	);
};
