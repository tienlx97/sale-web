import React from 'react';
import { CommercialContext } from '../contexts/commercial-context';

const _rid = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

const buildShipmentTerms = (rule, loc, year) => {
	const r = (rule ?? '').trim();
	const p = (loc ?? '').trim();
	const y = (year ?? '').trim();
	const left = [r, p].filter(Boolean).join(' ');
	return y ? `${left}, Incoterms® ${y}` : left;
};

const initialCommercial = {
	incoterm: { rule: 'CIF', year: '2010', location: '' },
	contractValue: { currencyCode: 'USD', value: 0 },
	bank: {
		beneficiary: { key: 'Beneficiary', value: 'DAI NGHIA INDUSTRIAL MECHANICS CO., LTD' },
		accountNo: { key: 'Bank account No.', value: '1032407684' },
		bankName: { key: 'Bank', value: 'Joint Stock Commercial Bank for Foreign Trade of Viet Nam' },
		branch: { key: 'Branch', value: 'Tan Binh' },
		address: { key: 'Address', value: '108 Tay Thanh Street, Tay Thanh Ward, Ho Chi Minh City, Vietnam' },
		swift: { key: 'SWIFT Code', value: 'BFTVVNVX044' }
	},
	documents: [
		{ key: '- Commercial Invoice', value: '01 original(s) electronic' },
		{ key: '- Packing list', value: '01 original(s) electronic' },
		{ key: '- Bill of Lading', value: '01 surrender Bill' },
		{ key: '- Certificate of Origin (Form D)', value: '01 original(s) electronic' }
	],
	consignee: { company: '', address: '' },
	notifyParty: { company: '', address: '' },
	pol: 'Ho Chi Minh City Port, Viet Nam',
	pod: '',
	shipmentTerms: ''
};

export const CommercialProvider = ({ children }) => {
	const [state, setState] = React.useState(() => {
		const st = { ...initialCommercial };
		st.shipmentTerms = buildShipmentTerms(st.incoterm.rule, st.incoterm.location, st.incoterm.year);
		return st;
	});

	// recompute shipmentTerms when incoterm changes
	const recomputeTerms = next => ({
		...next,
		shipmentTerms: buildShipmentTerms(next.incoterm.rule, next.incoterm.location, next.incoterm.year)
	});

	// setters
	const setIncotermRule = rule => {
		setState(prev =>
			recomputeTerms({
				...prev,
				incoterm: { ...prev.incoterm, rule },
				// nếu rule là DDP, POD = Location (đồng bộ ngay)
				pod: rule === 'DDP' ? (prev.incoterm.location ?? '') : prev.pod
			})
		);
	};

	const setIncotermYear = year => {
		setState(prev => recomputeTerms({ ...prev, incoterm: { ...prev.incoterm, year } }));
	};

	const setIncotermLocation = loc => {
		setState(prev => {
			const next = { ...prev, incoterm: { ...prev.incoterm, location: loc } };
			// nếu đang là DDP thì pod = location
			if (prev.incoterm.rule === 'DDP') next.pod = loc || '';
			return recomputeTerms(next);
		});
	};

	const setContractNumber = num => {
		setState(prev => ({ ...prev, contractValue: { ...prev.contractValue, value: num ?? 0 } }));
	};

	const setCurrencyCode = code => {
		setState(prev => ({ ...prev, contractValue: { ...prev.contractValue, currencyCode: code.toUpperCase() } }));
	};

	const setPOL = pol => setState(prev => ({ ...prev, pol }));
	const setPOD = pod => setState(prev => ({ ...prev, pod }));

	const setConsignee = next => setState(prev => ({ ...prev, consignee: { ...prev.consignee, ...next } }));

	const setNotifyParty = next => setState(prev => ({ ...prev, notifyParty: { ...prev.notifyParty, ...next } }));

	const setDocuments = docs => setState(prev => ({ ...prev, documents: docs }));

	const addDoc = () => setState(prev => ({ ...prev, documents: [...prev.documents, { key: '', value: '' }] }));

	const updateDocAt = (idx, patch) =>
		setState(prev => ({
			...prev,
			documents: prev.documents.map((d, i) => (i === idx ? { ...d, ...patch } : d))
		}));

	const removeDocAt = idx => setState(prev => ({ ...prev, documents: prev.documents.filter((_, i) => i !== idx) }));

	return (
		<CommercialContext.Provider
			value={{
				state,
				setIncotermRule,
				setIncotermYear,
				setIncotermLocation,
				setContractNumber,
				setCurrencyCode,
				setPOL,
				setPOD,
				setConsignee,
				setNotifyParty,
				addDoc,
				setDocuments,
				updateDocAt,
				removeDocAt
			}}
		>
			{children}
		</CommercialContext.Provider>
	);
};
