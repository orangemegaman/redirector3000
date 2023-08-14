import {
    Button,
    FormItem,
    FormLayout,
    Input,
    ModalPage,
    ModalPageProps,
} from '@vkontakte/vkui';
import { useContext, useState } from 'react';
import { StoreContext } from '../../StoreContext';
import { download } from '../../../util/helpers';
import { ModalsContext } from '../../ModalsContext';
import React from 'react';

export const ExportModal = (props: ModalPageProps) => {
    const [templateName, setTemplateName] = useState<string>('');
    const { store } = useContext(StoreContext);
    const { closeActiveModal } = useContext(ModalsContext);

    return (
        <ModalPage {...props}>
            <FormLayout style={{ margin: 20 }}>
                <FormItem top="📝 Введите имя шаблона">
                    <Input
                        type="text"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                    />
                </FormItem>
                <FormItem>
                    <Button
                        size="l"
                        stretched
                        mode="primary"
                        onClick={() => {
                            download(templateName, store);
                            closeActiveModal();
                        }}
                        disabled={!templateName}
                    >
                        Сохранить
                    </Button>
                </FormItem>
            </FormLayout>
        </ModalPage>
    );
};
