import {
  Group,
  Panel,
  PanelHeader,
  SimpleCell,
  Switch,
  View
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React from 'react';

import './Popup.css';

const Popup = () => {
  return (
  <View activePanel="switch">
    <Panel id="switch">
      <PanelHeader>Switch</PanelHeader>
      <Group>
        <SimpleCell Component="label" after={<Switch />}>
          Комментарии к записям
        </SimpleCell>
        <SimpleCell Component="label" after={<Switch defaultChecked />}>
          Ссылки
        </SimpleCell>
        <SimpleCell Component="label" disabled after={<Switch disabled />}>
          Фотоальбомы
        </SimpleCell>
      </Group>
      <button onClick={()=> chrome.runtime.openOptionsPage()}>OPTIONS</button>
    </Panel>
    
  </View>
  );
};

export default Popup;
