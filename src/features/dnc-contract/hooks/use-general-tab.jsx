import { useContext } from 'react';
import { GeneralTabContext } from '../contexts/general-tab-context';

export const useGeneralTab = () => {
	const ctx = useContext(GeneralTabContext);
	if (!ctx) throw new Error('useGeneralTab must be used within GeneralTabProvider');
	return ctx;
};
