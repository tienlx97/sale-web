import { createBrowserRouter } from 'react-router';
import { Layout } from '@/coponents/layout';
import { ContractV2 } from './contract.v2';
import { HomePage } from './home';
import { PaymentRequestPage } from './payment-request';
export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '',
				element: <HomePage />
			},
			{
				path: 'contract',
				element: <ContractV2 />
			},
			{
				path: 'payment-request',
				element: <PaymentRequestPage />
			}
		]
	}
]);
