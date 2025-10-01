import { useContext } from 'react';
import { CommercialContext } from '../contexts/commercial-context';

export const useCommercial = () => {
	const ctx = useContext(CommercialContext);
	if (!ctx) throw new Error('useCommercial must be used within CommercialProvider');
	return ctx;
};
