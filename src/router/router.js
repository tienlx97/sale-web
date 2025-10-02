import { createBrowserRouter } from 'react-router';
import { ContractV2 } from './contract.v2';
import { DNCContractPage } from './dnc-contract';
import { HomePage } from './home';
import { PaymentRequestPage } from './payment-request';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />
	},

	{
		path: '/contract',
		element: <DNCContractPage />
	},
	{
		path: '/contract.v2',
		element: <ContractV2 />
	},
	{
		path: '/payment-request',
		element: <PaymentRequestPage />
	}
]);
