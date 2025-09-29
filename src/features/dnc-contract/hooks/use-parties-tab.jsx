import { useContext } from 'react';
import { PartiesTabContext } from '../contexts/party-tab-context';

export const usePartiesTab = () => {
	const ctx = useContext(PartiesTabContext);
	if (!ctx) throw new Error('usePartiesTab must be used within PartiesTabProvider');
	return ctx;
};
