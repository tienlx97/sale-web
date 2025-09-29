export const initialContract = {
	headerImagePath: 'assets/header/1.png',
	signDate: '',
	quotationDate: '',
	info: {
		no: { key: 'No', value: '', placeholder: 'ex: 25KCT21', markup: { boldKey: true, caplockValue: true, boldValue: true } },
		project: { key: 'Project', placeholder: 'ex: WH30x5', value: '', markup: { boldKey: true, caplockValue: true, boldValue: true } },
		item: { key: 'Item', value: 'STEEL STRUCTURE', markup: { boldKey: true, caplockValue: true, boldValue: true } },
		location: { key: 'Location', placeholder: 'ex: THAILAND', value: '', markup: { boldKey: true, caplockValue: true, boldValue: true } }
	},
	parties: {
		A: {
			title: '(Hereinafter referred to as **Party A**)',
			company: { key: '**PARTY A (BUYER)**', value: '', markup: { caplockValue: true, boldValue: true } },
			representedBy: { key: '**Represented by**', value: '', markup: { boldValue: true } },
			position: { key: 'Position', value: '' },
			address: { key: 'Address', value: '' },
			optional: []
		},
		B: {
			title: '(Hereinafter referred to as **Party B**)',
			company: {
				key: '**PARTY B (SUPPLIER)**',
				value: 'DAI NGHIA INDUSTRIAL MECHANICS CO., LTD',
				markup: { caplockValue: true, boldValue: true }
			},
			representedBy: { key: '**Represented by**', value: 'Mr. Le Xuan Nghia', markup: { caplockValue: true, boldValue: true } },
			position: { key: 'Position', value: 'General Director' },
			address: {
				key: 'Address',
				value: 'No 5 Vsip II-A, Street 32, Viet Nam – Singapore II-A IZ, Vinh Tan Ward, Ho Chi Minh City Viet Nam'
			},
			taxCode: { key: 'Tax Code', value: '3702682454' },
			optional: []
		}
	},
	projectWorkScope: {
		item: {
			volOfWork: {
				key: '*. Volume of works',
				value:
					'As specified in Party B’s Quotation dated {{quotationDate}}, including the scope of quotation, the list of materials and applicable standards attached to this Contract, Party A’s architectural design drawings, and Party B’s steel structure design drawings as approved by Party A.'
			}
		}
	},
	periods: {
		preparation: { qty: 1, unit: 'week', format: 'for preparation of approval drawings.' },
		approval: { qty: 1, unit: 'week', format: "allocation for customer's (Party A) approval." },
		shopDrawing: { qty: 1, unit: 'week', format: 'for preparation of shop drawings.' },
		fabrication: { qty: 6, unit: 'weeks', format: 'fabrication period reckoned from the date the approval drawings are approved.' },
		transportation: { qty: 2, unit: 'weeks', format: 'for transportation from factory to {{transportationLocation}}' }
	},
	commercial: {
		incoterm: { rule: 'CIF', year: '2010', location: '' },
		contractValue: { currencyCode: 'USD', value: 0 },
		bank: {
			beneficiary: {
				key: 'Beneficiary',
				value: 'DAI NGHIA INDUSTRIAL MECHANICS CO., LTD',
				markup: { boldValue: true }
			},
			accountNo: {
				key: 'Bank account No.',
				value: '1032407684',
				markup: { boldValue: true }
			},
			bankName: {
				key: 'Bank',
				value: 'Joint Stock Commercial Bank for Foreign Trade of Viet Nam',
				markup: { boldValue: true }
			},
			branch: {
				key: 'Branch',
				value: 'Tan Binh',
				markup: { boldValue: true }
			},
			address: {
				key: 'Address',
				value: '108 Tay Thanh Street, Tay Thanh Ward, Ho Chi Minh City, Vietnam',
				markup: { boldValue: true }
			},
			swift: {
				key: 'SWIFT Code',
				value: 'BFTVVNVX044',
				markup: { boldValue: true }
			}
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
	},
	payments: [
		{
			id: 'p1',
			title: 'FIRST PAYMENT',
			percent: 30,
			days: 7,
			term: 'Telegraphic Transfer (T/T)',
			format: {
				paymentPercentText: 'First Payment: Party A shall pay {{percentInWords}} ({{percent}}%) of the Contract Value.',
				paymentValueText: '{{currency}} {{contractValue}} x {{percent}}% = {{currency}} {{paymentValue}}',
				moneyTextInword: `*(In words: {{paymentInWords}})*`,
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
				moneyTextInword: `*(In words: {{paymentInWords}})*`,
				termText:
					'by {{term}} within {{daysInWords}} ({{days}}) calendar days after completion of inspection at Party B’s factory in Vietnam and prior to shipment release.'
			}
		}
	],
	appendPayments: []
};
