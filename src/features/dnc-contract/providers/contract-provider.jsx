import { reducer } from '@/features/dnc-contract/store/store';

import { useContext, useReducer } from 'react';
import { initialContract } from '../store/contract-store';
import { ContractContext } from '../contexts/contract-context';

export const ContractProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialContract);

	const ctx = {
		state,
		dispatch,
		patch: fn => dispatch({ type: 'contract/patch', patch: fn }),
		addPayment: (where = 'appendPayments', template) => dispatch({ type: 'payments/add', where, template }),
		removePayment: (where, id) => dispatch({ type: 'payments/remove', where, id })
	};

	return <ContractContext.Provider value={ctx}>{children}</ContractContext.Provider>;
};

export const useContract = () => {
	const ctx = useContext(ContractContext);
	if (!ctx) throw new Error('useContract must be used within ContractProvider');
	return ctx;
};
