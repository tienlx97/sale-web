import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { c } from 'react-compiler-runtime';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { ContractProvider } from './features/dnc-contract/providers/contract-provider';
import { EditProvider } from './providers/edit-provider';
import { router } from './router/router';

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
