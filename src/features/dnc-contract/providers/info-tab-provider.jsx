import { useState } from 'react';
import { InfoTabContext } from '../contexts/info-tab-context';

export const InfoTabProvider = ({ children }) => {
	const [info, setInfo] = useState({
		no: { key: 'No', value: '' },
		project: { key: 'Project', value: '' },
		item: { key: 'Item', value: 'STEEL STRUCTURE' },
		location: { key: 'Location', value: '' }
	});

	const setField = (field, value) => {
		setInfo(p => ({ ...p, [field]: { ...p[field], value } }));
	};

	return <InfoTabContext.Provider value={{ info, setField }}>{children}</InfoTabContext.Provider>;
};
