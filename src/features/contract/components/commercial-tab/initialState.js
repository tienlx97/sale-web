import { genId } from './helper';

export const initialContract = {
	currency: 'USD',
	amount: null,
	incoterm: { year: '2010', name: '' },
	location: '',
	payments: [
		{
			id: genId(),
			title: 'FIRST PAYMENT',
			percent: 30, // example default
			days: 7,
			term: 'Telegraphic Transfer (T/T)',
			format: {
				paymentPercentText: 'First Payment: Party A shall pay {{percent}} of the Contract Value.',
				paymentValueText: '{{currency}} {{contractValue}} x {{percent}} = {{currency}} {{paymentValue}}',
				termText: 'by {{term}} within {{days}} calendar days from the date of Contract signing',
				endText: 'Receipt of this payment shall be a condition precedent for Party B to commence fabrication, subject to drawing approval.'
			}
		},
		{
			id: genId(),
			title: 'SECOND PAYMENT',
			percent: 65,
			days: 7,
			term: 'Telegraphic Transfer (T/T)',
			format: {
				paymentPercentText: 'Second Payment: Party A shall pay {{percent}} of the Contract Value.',
				paymentValueText: '{{currency}} {{contractValue}} x {{percent}} = {{currency}} {{paymentValue}}',
				termText:
					'by {{term}} within {{days}} calendar days after completion of inspection at Party B’s factory in Vietnam and prior to shipment release.'
			}
		}
	],
	appendPayments: []
};
