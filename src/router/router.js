import { createBrowserRouter } from 'react-router';
import { DNCContractPage } from './dnc-contract';
import { ContractV2 } from './contract.v2';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <div>Hello World</div>
	},

	{
		path: '/contract',
		element: <DNCContractPage />
	},
	{
		path: '/contract.v2',
		element: <ContractV2 />
	}
]);
