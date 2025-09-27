// contract-dto.ts
export type ISODate = string; // 'YYYY-MM-DD'

export type PartyKV = {
	id: string;
	key: string;
	value: string;
	canDelete?: boolean;
	multiline?: boolean;
	markup?: BlockItemMarkup;
};

export type BlockItemMarkup = {
	boldKey?: boolean;
	boldValue?: boolean;
	caplockValue?: boolean;
};

export type BlockItem = {
	key: string;
	value: string;
	markup?: BlockItemMarkup;
};

export type PartyBlock = {
	title: string; // e.g., (Hereinafter referred to as **Party A**)
	company: BlockItem;
	representedBy: BlockItem;
	position: BlockItem;
	address: BlockItem;
	optional?: PartyKV[]; // extra, free-form lines
};

export type ContractPeriodUnit = 'day' | 'days' | 'week' | 'weeks';
export type PeriodItem = { qty: number; unit: ContractPeriodUnit; format: string };

export type IncotermRule = 'EXW' | 'FOB' | 'CIF' | 'DDP';
export type Incoterm = { rule: IncotermRule; year: '2010' | '2020' | string; location: string };

export type Money = { currencyCode: string; value: number | null }; // e.g., { USD, 14400.00 }
// Optional FX if you show local currency:
export type Fx = { base: string; quote: string; rate: number } | null; // e.g., USD→VND 1→22800

export type Payment = {
	id: string;
	title: string; // "FIRST PAYMENT" (store text label if you like)
	percent: number; // 0..100
	days: number; // calendar days
	term: string; // 'Telegraphic Transfer (T/T)',
	format: any;
};

export type DocumentRequirement = BlockItem;
export type BankInfo = {
	beneficiary: string;
	accountNo: string;
	bankName: string;
	branch: string;
	address: string;
	swift: string;
};

export type ContactParty = { company: string; address: string };

export type ContractDTO = {
	headerImagePath: string;
	signDate?: ISODate;
	quotationDate?: ISODate;

	info: {
		no: BlockItem;
		project: BlockItem;
		item: BlockItem;
		location: BlockItem;
	};

	parties: {
		A: PartyBlock;
		B: PartyBlock;
	};

	projectWorkScope: {
		volumeOfWork: BlockItem;
	};

	periods: {
		preparation?: PeriodItem;
		approval?: PeriodItem;
		shopDrawing?: PeriodItem;
		fabrication?: PeriodItem;
		transportation?: PeriodItem;
	};

	commercial: {
		incoterm: Incoterm;
		contractValue: Money; // total contract value
		fx?: Fx; // optional exchange info
		bank: BankInfo;
		documents: DocumentRequirement[];
		consignee?: ContactParty;
		notifyParty?: ContactParty;
		pol?: string; // Port of Loading
		pod?: string; // Port of Discharge
		shipmentTerms?: string; // optional free text
	};

	payments: Payment[]; // main
	appendPayments: Payment[]; // extra
};

//

type PatchFn = (draft: Contract) => void;

type Action =
	| { type: 'contract/replace'; next: Contract }
	| { type: 'contract/patch'; patch: PatchFn }
	// payments
	| { type: 'payments/add'; where: 'payments' | 'appendPayments'; template?: Partial<Payment> }
	| { type: 'payments/remove'; where: 'payments' | 'appendPayments'; id: string }
	| { type: 'payments/patch'; where: 'payments' | 'appendPayments'; id: string; patch: (p: Payment) => void }
	// commercial documents (array of {key,value})
	| { type: 'docs/add'; row?: { key: string; value: string } }
	| { type: 'docs/remove'; index: number }
	| { type: 'docs/patch'; index: number; patch: (row: { key: string; value: string }) => void }
	// party optional rows (free-form KV list per side)
	| { type: 'partyOptional/add'; side: PartySide; row?: PartyKV }
	| { type: 'partyOptional/remove'; side: PartySide; id: string }
	| { type: 'partyOptional/patch'; side: PartySide; id: string; patch: (row: PartyKV) => void };

type Ctx = {
	state: Contract;
	dispatch: React.Dispatch<Action>;
	// sugar helpers
	patch: (fn: PatchFn) => void;
	addPayment: (where?: 'payments' | 'appendPayments', template?: Partial<Payment>) => void;
	removePayment: (where: 'payments' | 'appendPayments', id: string) => void;
};
