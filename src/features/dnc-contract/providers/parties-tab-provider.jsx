import { useState } from 'react';
import { PartiesTabContext } from '../contexts/party-tab-context';

const rid = () => crypto.randomUUID?.() ?? String(Date.now());

const initPartyA = {
	company: { key: 'PARTY A (BUYER)', value: '' },
	representedBy: { key: 'Represented by', value: '' },
	position: { key: 'Position', value: '' },
	address: { key: 'Address', value: '' },
	optional: []
};

const initPartyB = {
	company: { key: 'PARTY B (SUPPLIER)', value: 'DAI NGHIA INDUSTRIAL MECHANICS CO., LTD' },
	representedBy: { key: 'Represented by', value: 'Mr. Le Xuan Nghia' },
	position: { key: 'Position', value: 'General Director' },
	address: { key: 'Address', value: 'No 5 Vsip II-A, Street 32, Viet Nam – Singapore II-A IZ, Vinh Tan Ward, Ho Chi Minh City Viet Nam' },
	taxCode: { key: 'Tax Code', value: '3702682454' },
	optional: []
};

export const PartiesTabProvider = ({ children }) => {
	const [A, setA] = useState(initPartyA);
	const [B, setB] = useState(initPartyB);

	const pickSetter = side => (side === 'A' ? setA : setB);
	// const pickParty = side => (side === 'A' ? A : B);

	const setField = (side, field, value) => {
		pickSetter(side)(p => ({ ...p, [field]: { ...p[field], value } }));
	};

	const addOptional = side => {
		pickSetter(side)(p => ({ ...p, optional: [...p.optional, { id: rid(), key: '', value: '' }] }));
	};

	const updateOptional = (side, id, next) => {
		pickSetter(side)(p => ({
			...p,
			optional: p.optional.map(o => (o.id === id ? { ...o, ...next } : o))
		}));
	};

	const removeOptional = (side, id) => {
		pickSetter(side)(p => ({ ...p, optional: p.optional.filter(o => o.id !== id) }));
	};

	return (
		<PartiesTabContext.Provider value={{ A, B, setField, addOptional, updateOptional, removeOptional }}>
			{children}
		</PartiesTabContext.Provider>
	);
};
