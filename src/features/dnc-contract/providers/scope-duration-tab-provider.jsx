import { useState } from 'react';
import { ScopeDurationTabContext } from '../contexts/scope-duration-tab-context';

export const ScopeDurationTabProvider = ({ children }) => {
	const [period, setPeriod] = useState({
		preparation: { qty: 1, unit: 'week', format: 'for preparation of approval drawings.' },
		approval: { qty: 1, unit: 'week', format: "allocation for customer's (Party A) approval." },
		shopDrawing: { qty: 1, unit: 'week', format: 'for preparation of shop drawings.' },
		fabrication: { qty: 6, unit: 'weeks', format: 'fabrication period reckoned from the date the approval drawings are approved.' },
		transportation: { qty: 2, unit: 'weeks', format: 'for transportation from factory to {{transportationLocation}}' }
	});

	return <ScopeDurationTabContext.Provider value={{ period, setPeriod }}>{children}</ScopeDurationTabContext.Provider>;
};
