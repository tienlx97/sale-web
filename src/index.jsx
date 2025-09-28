import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { EditProvider } from './providers/edit-provider';
import { router } from './router/router';
import { ContractProvider } from './features/dnc-contract/providers/contract-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));

const qc = new QueryClient();

root.render(
	<React.StrictMode>
		<QueryClientProvider client={qc}>
			<EditProvider>
				<FluentProvider theme={webLightTheme}>
					<ContractProvider>
						<RouterProvider router={router} />
					</ContractProvider>
				</FluentProvider>
			</EditProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
