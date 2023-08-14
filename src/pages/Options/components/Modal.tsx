import { ModalCard, ModalPage, ModalRoot } from '@vkontakte/vkui';
import { useContext } from 'react';
import { MODAL, ModalsContext } from './ModalsContext';
import { ExportModal } from './Modals/ExportModal';
import { ImportModal } from './Modals/ImportModal';
import React from 'react';

export const Modal = () => {
    const { activeModal, closeActiveModal } = useContext(ModalsContext);
    return (
        <ModalRoot activeModal={activeModal} onClose={closeActiveModal}>
            <ExportModal nav={MODAL.EXPORT} />
            <ImportModal nav={MODAL.IMPORT} />
        </ModalRoot>
    );
};
