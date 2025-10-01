import { useContext } from 'react';
import { PaymentsTabContext } from '../contexts/payments-context';

export const usePaymentTab = () => {
	const ctx = useContext(PaymentsTabContext);
	if (!ctx) throw new Error('usePaymentTab must be used within PaymentsProvider');
	return ctx;
};
