import { useState } from 'react';
import { GeneralTabContext } from '../contexts/general-tab-context';

export const GeneralTabProvider = ({ children }) => {
	const [quotationDate, setQuotationDate] = useState('');
	const [signedDate, setSignedDate] = useState('');

	return (
		<GeneralTabContext.Provider value={{ setSignedDate, setQuotationDate, quotationDate, signedDate }}>
			{children}
		</GeneralTabContext.Provider>
	);
};
