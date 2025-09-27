import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { EditProvider } from './providers/edit-provider';
import { router } from './router/router';
import { ContractProvider } from './features/dnc-contract/providers/contract-provider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<EditProvider>
			<FluentProvider theme={webLightTheme}>
				<ContractProvider>
					<RouterProvider router={router} />
				</ContractProvider>
			</FluentProvider>
		</EditProvider>
	</React.StrictMode>
);
