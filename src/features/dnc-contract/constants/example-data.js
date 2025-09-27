/** @type {import('../types/contract-dto').ContractDTO} */
export const contract = {
	headerImagePath: 'assets/header/1.png',
	signDate: '2025-09-27', // ISO
	quotationDate: '2025-09-22',

	info: {
		no: {
			key: 'No',
			value: '25KCT25'
		},
		project: {
			key: '**Project**',
			value: 'wH 20x25',
			markup: {
				caplockValue: true
			}
		},
		item: {
			key: '**Item**',
			value: 'STEEL STRUCTURE',
			markup: {
				caplockValue: true
			}
		},
		location: {
			key: '**Location**',
			value: 'THAILAND',
			markup: {
				caplockValue: true
			}
		}
	},

	parties: {
		A: {
			title: '(Hereinafter referred to as **Party A**)',
			company: {
				key: '**PARTY A (BUYER)**',
				value: 'BANGSUE ENGINEERING CO., LTD',
				markup: {
					caplockValue: true,
					boldValue: true
				}
			},
			representedBy: {
				key: '**Represented by**',
				value: 'MR. PIYARAT SUWANNAKHA',
				markup: {
					boldValue: true
				}
			},
			position: {
				key: 'Position',
				value: 'Manager'
			},
			address: {
				key: 'Address',
				value: '157 Moo 5, Mahasawat, Bangkruai, Nonthaburi, Thailand 11130'
			},
			optional: []
		},
		B: {
			title: '(Hereinafter referred to as **Party B**)',
			company: {
				key: '**PARTY B (CONTRACTOR)**',
				value: 'DAI NGHIA INDUSTRIAL MECHANICS CO., LTD',
				markup: {
					caplockValue: true,
					boldValue: true
				}
			},
			representedBy: {
				key: '**Represented by**',
				value: '**Mr. Le Xuan Nghia**',
				markup: {
					caplockValue: true,
					boldValue: true
				}
			},
			position: {
				key: 'Position',
				value: 'General Director'
			},
			address: {
				key: 'Address',
				value: 'No 5 Vsip II-A, Street 32, Viet Nam – Singapore II-A IZ, Vinh Tan Ward, Ho Chi Minh City Viet Nam'
			},
			taxCode: {
				key: 'Tax Code',
				value: '3702682454'
			},
			optional: []
		}
	},

	projectWorkScope: {
		item: {
			projectName: {
				key: '*. Project',
				value: 'DIY PROJECT',
				markup: {
					caplockValue: true,
					boldValue: true
				}
			},
			item: {
				key: '*. Item',
				value: 'STEEL STRUCTURE',
				markup: {
					caplockValue: true
				}
			},
			location: {
				key: '*. Location',
				value: 'THAILAND',
				markup: {
					caplockValue: true
				}
			},
			volOfWork: {
				key: '*. Volume of works',
				value:
					'As specified in Party B’s Quotation dated {{quotationDate}}, including the scope of quotation, the list of materials and applicable standards attached to this Contract, Party A’s architectural design drawings, and Party B’s steel structure design drawings as approved by Party A.'
			},
			theProject: '(Herein after called as “**The Project**”)\n'
		}
	},

	periods: {
		preparation: { qty: 1, unit: 'week', format: 'for preparation of approval drawings.' },
		approval: { qty: 1, unit: 'week', format: "allocation for customer's (Party A) approval." },
		shopDrawing: { qty: 1, unit: 'week', format: 'for preparation of shop drawings.' },
		fabrication: { qty: 6, unit: 'weeks', format: 'fabrication period reckoned from the date the approval drawings are approved.' },
		transportation: { qty: 1, unit: 'weeks', format: 'for transportation from factory to {{transportationLocation}}' }
	},

	commercial: {
		incoterm: { rule: 'CIF', year: '2010', location: 'Bangkok Port - Thailand' },
		contractValue: { currencyCode: 'USD', value: 22800 }, // fill actual number when known
		bank: {
			beneficiary: 'DAI NGHIA INDUSTRIAL MECHANICS CO., LTD',
			accountNo: '1032407684',
			bankName: 'Joint Stock Commercial Bank for Foreign Trade of Viet Nam',
			branch: 'Tan Binh',
			address: '108 Tay Thanh Street, Tay Thanh Ward, Ho Chi Minh City, Vietnam',
			swift: 'BFTVVNVX044'
		},
		documents: [
			{
				key: '- Commercial Invoice',
				value: '01 original(s) electronic'
			},
			{
				key: '- Packing list',
				value: '01 original(s) electronic'
			},
			{
				key: '- Bill of Lading',
				value: '01 surrender Bill'
			},
			{
				key: '- Certificate of Origin (Form D)',
				value: '01 original(s) electronic'
			}
		],
		consignee: { company: 'BANGSUE ENGINEERING CO., LTD', address: '157 Moo 5, Mahasawat, Bangkruai, Nonthaburi, Thailand 11130' },
		notifyParty: { company: 'BANGSUE ENGINEERING CO., LTD', address: '157 Moo 5, Mahasawat, Bangkruai, Nonthaburi, Thailand 11130' },
		pol: 'Ho Chi Minh City Port, Viet Nam',
		pod: 'Bangkok Port - Thailand',
		shipmentTerms: 'CIF Bangkok Port - Thailand'
	},

	payments: [
		{ id: 'p1', title: 'FIRST PAYMENT', percent: 30, days: 7, term: 'Telegraphic Transfer (T/T)' },
		{ id: 'p2', title: 'SECOND PAYMENT', percent: 65, days: 7, term: 'Telegraphic Transfer (T/T)' }
	],
	appendPayments: []
};
