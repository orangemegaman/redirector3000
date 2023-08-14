import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ModalsProvider } from './components/ModalsContext';
import { NavigationProvider } from './components/NavigationContext';
import { StoreContextProvider } from './components/StoreContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ConfigProvider>
			<AdaptivityProvider>
				<StoreContextProvider>
					<NavigationProvider>
						<ModalsProvider>
							<AppRoot>
								<App />
							</AppRoot>
						</ModalsProvider>
					</NavigationProvider>
				</StoreContextProvider>
			</AdaptivityProvider>
		</ConfigProvider>
	</React.StrictMode>
);
