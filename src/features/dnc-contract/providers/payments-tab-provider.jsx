import { useState } from 'react';
import { PaymentsTabContext } from '../contexts/payments-context';

const rid = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

function ordinalTitle(n) {
	const words = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH'];
	return `${words[n] ?? `PAYMENT ${n + 1}`} PAYMENT`;
}

function makeCoreInitial() {
	return [
		{
			id: 'p1',
			title: 'FIRST PAYMENT',
			percent: 30,
			days: 7,
			term: 'Telegraphic Transfer (T/T)',
			format: {
				paymentPercentText: 'First Payment: Party A shall pay {{percentInWords}} ({{percent}}%) of the Contract Value.',
				paymentValueText: '{{currency}} {{contractValue}} x {{percent}}% = {{currency}} {{paymentValue}}',
				moneyTextInword: '*(In words: {{paymentInWords}})*',
				termText: 'by {{term}} within {{daysInWords}} ({{days}}) calendar days from the date of Contract signing',
				endText: 'Receipt of this payment shall be a condition precedent for Party B to commence fabrication, subject to drawing approval.'
			}
		},
		{
			id: 'p2',
			title: 'SECOND PAYMENT',
			percent: 70,
			days: 7,
			term: 'Telegraphic Transfer (T/T)',
			format: {
				paymentPercentText: 'Second Payment: Party A shall pay {{percentInWords}} ({{percent}}%) of the Contract Value.',
				paymentValueText: '{{currency}} {{contractValue}} x {{percent}}% = {{currency}} {{paymentValue}}',
				moneyTextInword: '*(In words: {{paymentInWords}})*',
				termText: 'by {{term}} within {{daysInWords}} ({{days}}) calendar days prior to shipment release.'
			}
		}
	];
}

function makeAppendPaymentFormat(title, appendIndex) {
	// appendIndex is 0-based within appendPayments[]
	return {
		paymentPercentText: `${title}: Party A shall pay {{percentInWords}} ({{appendPayments.[${appendIndex}].percent}}%) of the Contract Value:`,
		paymentValueText: `{{commercial.contractValue.currencyCode}} {{contractValue}} x {{appendPayments.[${appendIndex}].percent}}% = {{commercial.contractValue.currencyCode}} {{paymentValue}}`,
		moneyTextInword: '*(In words: {{paymentInWordsValue}})*',
		termText: `by {{appendPayments.[${appendIndex}].term}}`,
		endText: ''
	};
}

export const PaymentsTabProvider = ({ children }) => {
	const [state, setState] = useState(() => ({
		payments: makeCoreInitial(),
		appendPayments: []
	}));

	const patchCoreById = (id, recipe) => {
		setState(prev => ({
			...prev,
			payments: prev.payments.map(p => {
				if (p.id !== id) return p;
				const clone = structuredClone ? structuredClone(p) : JSON.parse(JSON.stringify(p));
				recipe(clone);
				return clone;
			})
		}));
	};

	const patchAppendById = (id, recipe) => {
		setState(prev => ({
			...prev,
			appendPayments: prev.appendPayments.map(p => {
				if (p.id !== id) return p;
				const clone = structuredClone ? structuredClone(p) : JSON.parse(JSON.stringify(p));
				recipe(clone);
				return clone;
			})
		}));
	};

	const addAppendPayment = () => {
		setState(prev => {
			const totalSoFar = prev.payments.length + prev.appendPayments.length; // 0-based next index
			const title = ordinalTitle(totalSoFar).toUpperCase();
			const nextIndexInAppend = prev.appendPayments.length; // 0-based within append[]

			const next = {
				id: rid(),
				title,
				percent: 0,
				days: 7,
				term: 'Telegraphic Transfer (T/T)',
				format: makeAppendPaymentFormat(title, nextIndexInAppend)
			};

			return { ...prev, appendPayments: [...prev.appendPayments, next] };
		});
	};

	const removeAppendPayment = id => {
		setState(prev => ({
			...prev,
			appendPayments: prev.appendPayments.filter(p => p.id !== id)
		}));
	};

	return (
		<PaymentsTabContext.Provider value={{ state, patchCoreById, patchAppendById, addAppendPayment, removeAppendPayment }}>
			{children}
		</PaymentsTabContext.Provider>
	);
};
