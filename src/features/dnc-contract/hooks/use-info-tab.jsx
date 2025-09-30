import { useContext } from 'react';
import { InfoTabContext } from '../contexts/info-tab-context';

export const useInfoTab = () => {
	const ctx = useContext(InfoTabContext);
	if (!ctx) throw new Error('useInfoTab must be used within InfoTabProvider');
	return ctx;
};
