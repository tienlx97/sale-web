// hooks/use-scope-duration-tab.ts
import { useContext } from 'react';
import { ScopeDurationTabContext } from '../contexts/scope-duration-tab-context';

export const useScopeDurationTab = () => {
	const ctx = useContext(ScopeDurationTabContext);
	if (!ctx) throw new Error('useScopeDurationTab must be used within ScopeDurationTabProvider');
	return ctx;
};
