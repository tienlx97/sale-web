import { createBrowserRouter } from 'react-router';
import { DNCContractPage } from './dnc-contract';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <div>Hello World</div>
	},

	{
		path: '/contract',
		element: <DNCContractPage />
	}
]);
