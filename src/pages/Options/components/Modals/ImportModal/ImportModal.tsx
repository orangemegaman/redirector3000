import {
    Button,
    FormItem,
    FormLayout,
    Input,
    ModalPage,
    ModalPageProps,
} from '@vkontakte/vkui';
import { useContext, useRef, useState } from 'react';
import { ModalsContext } from '../../ModalsContext';
import { actions, StoreContext } from '../../StoreContext';
import './importModal.css';
import React from 'react';

export const ImportModal = (props: ModalPageProps) => {
    const [uploadData, setUploadData] = useState(null);
    const { dispatch } = useContext(StoreContext);
    const { closeActiveModal } = useContext(ModalsContext);
    const inputFileName = useRef<HTMLSpanElement>(null);

    const handleUplodData = (files: FileList | null) => {
        if (!files || !files.length) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target && event.target.result) {
                setUploadData(JSON.parse(event.target.result as string));
                if (inputFileName.current) {
                    inputFileName.current.innerHTML = files[0].name;
                }
            }
        };
        reader.readAsText(files[0]);
    };

    return (
        <ModalPage {...props}>
            <FormLayout style={{ margin: 20 }}>
                <FormItem>
                    <label className="input-file">
                        <input
                            type="file"
                            accept=".json"
                            onChange={(e) => handleUplodData(e.target.files)}
                        />
                        <span className="input-file-btn">Выберите файл</span>
                        <span className="input-file-text" ref={inputFileName}>
                            Файл не выбран
                        </span>
                    </label>
                </FormItem>
                <FormItem>
                    <Button
                        size="l"
                        stretched
                        mode="primary"
                        onClick={() => {
                            uploadData &&
                                dispatch(actions.loadState(uploadData));
                            closeActiveModal();
                        }}
                        disabled={!uploadData}
                    >
                        Загрузить
                    </Button>
                </FormItem>
            </FormLayout>
        </ModalPage>
    );
};
