import * as React from 'react';
import { Card, Field, Input, makeStyles, Text, Textarea } from '@fluentui/react-components';
import { useContract } from '@/features/dnc-contract/providers/contract-provider';
import { toWords } from '@/utils/toWord';
import { PartyKeyValue } from './party-key-value';

const useStyles = makeStyles({
	column: { display: 'flex', flexDirection: 'column', gap: '1rem' },
	row: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' },
	grow: { flex: 1, minWidth: 220 }
});

/* ---------------- number helpers (format UI, store numeric) ---------------- */
const stripNonNumeric = s =>
	String(s ?? '')
		.replace(/[\s,]/g, '')
		.replace(/[^\d.-]/g, '');

const groupThousands = intPart => intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function formatNumberInput(input) {
	let raw = stripNonNumeric(input);
	if (raw === '' || raw === '-' || raw === '.' || raw === '-.') return { raw, display: raw };
	raw = raw.replace(/(?!^)-/g, '');
	const firstDot = raw.indexOf('.');
	if (firstDot !== -1) raw = raw.slice(0, firstDot + 1) + raw.slice(firstDot + 1).replace(/\./g, '');
	let [intPart, decPart = ''] = raw.split('.');
	const sign = intPart.startsWith('-') ? '-' : '';
	intPart = intPart.replace('-', '');
	intPart = intPart.replace(/^0+(?=\d)/, '') || '0';
	const intGrouped = groupThousands(intPart);
	const display = sign + intGrouped + (firstDot !== -1 ? `.${decPart}` : decPart ? `.${decPart}` : '');
	return { raw: sign + intPart + (firstDot !== -1 ? `.${decPart}` : ''), display };
}
function normalizeOnBlur(display) {
	let raw = stripNonNumeric(display);
	if (!raw || raw === '-' || raw === '.' || raw === '-.') return { raw: '', display: '' };
	if (raw.endsWith('.')) raw = raw.slice(0, -1);
	return formatNumberInput(raw);
}

const buildShipmentTerms = (rule, loc, year) => {
	const r = (rule ?? '').trim();
	const p = (loc ?? '').trim();
	const y = (year ?? '').trim();

	const left = [r, p].filter(Boolean).join(' ');
	return y ? `${left}, Incoterms® ${y}` : left;
};

/* ---------------- amount-in-words (Currency-first) ---------------- */
const currencyMeta = {
	USD: { name: 'United States Dollar', plural: 'United States Dollars', fractionalUnit: { name: 'Cent', plural: 'Cents' } }
};
function amountInWordsCurrencyFirst(amount, unit = 'USD') {
	const meta = currencyMeta[unit] || currencyMeta.USD;
	if (typeof amount !== 'number' || !Number.isFinite(amount)) return '';
	const n = Math.abs(amount);
	const intPart = Math.trunc(n);
	const cents = Math.round((n - intPart) * 100);
	const intWords = intPart === 0 ? 'Zero' : toWords.convert(intPart);
	const currencyName = intPart === 1 ? meta.name : meta.plural;
	let phrase = `${currencyName} ${intWords}`;
	if (cents > 0) {
		const centWords = toWords.convert(cents);
		const centName = cents === 1 ? meta.fractionalUnit.name : meta.fractionalUnit.plural;
		phrase += ` and ${centWords} ${centName}`;
	}
	return `${phrase} Only`;
}

/* ---------------- documents <-> PartyKeyValue adapter ---------------- */
const docsToKV = docs => docs.map((d, i) => ({ id: `doc-${i}`, key: d.key, value: d.value, canDelete: true, multiline: false }));
const kvToDocs = rows => rows.map(r => ({ key: r.key, value: r.value }));

export const CommercialTab = () => {
	const _styles = useStyles();
	const { state, patch } = useContract();

	const incoterm = state.commercial.incoterm;
	const contractValue = state.commercial.contractValue;
	const bank = state.commercial.bank;
	const docs = state.commercial.documents;
	const consignee = state.commercial.consignee;
	const notifyParty = state.commercial.notifyParty;

	/* --------- local UI state for the money input (avoid caret jumps) --------- */
	const [moneyDisplay, setMoneyDisplay] = React.useState('');
	React.useEffect(() => {
		// initialize from store number
		const n = Number(contractValue.value ?? 0);
		const asText = n === 0 ? '' : new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(n);
		setMoneyDisplay(asText);
	}, [contractValue.value]);

	const moneyWords = React.useMemo(
		() => amountInWordsCurrencyFirst(Number(contractValue.value || 0), contractValue.currencyCode || 'USD'),
		[contractValue.value, contractValue.currencyCode]
	);

	const docRows = React.useMemo(() => docsToKV(docs), [docs]);

	//
	// inside CommercialTab component, after you read state:

	const loc = state.commercial.incoterm.location;

	// derive & keep store in sync (so you can export/print from state)
	const derivedShipmentTerms = React.useMemo(
		() => buildShipmentTerms(incoterm.rule, loc, incoterm.year),
		[incoterm.rule, incoterm.year, loc]
	);

	React.useEffect(() => {
		if ((state.commercial.shipmentTerms || '') !== derivedShipmentTerms) {
			patch(d => {
				d.commercial.shipmentTerms = derivedShipmentTerms;
			});
		}
	}, [derivedShipmentTerms, patch, state.commercial.shipmentTerms]);

	return (
		<div className={_styles.column}>
			{/* Incoterm & Contract Value */}
			<Card className={_styles.column}>
				<Text size={500} weight='bold'>
					COMMERCIAL
				</Text>

				<div className={_styles.row}>
					<Field label='Incoterm Rule' size='small' className={_styles.grow}>
						<Input
							size='small'
							value={incoterm.rule}
							onChange={(_, d) =>
								patch(dr => {
									dr.commercial.incoterm.rule = d.value;
								})
							}
						/>
					</Field>

					<Field label='Incoterm Year' size='small' className={_styles.grow} style={{ width: 140 }}>
						<Input
							size='small'
							value={incoterm.year}
							onChange={(_, d) =>
								patch(dr => {
									dr.commercial.incoterm.year = d.value;
								})
							}
						/>
					</Field>
				</div>

				<div className={_styles.row}>
					<Field label='Location' size='small' style={{ width: '100%' }}>
						<Textarea
							resize='vertical'
							size='small'
							value={incoterm.location}
							onChange={(_, d) =>
								patch(dr => {
									dr.commercial.incoterm.location = d.value;
								})
							}
						/>
					</Field>
				</div>

				<div className={_styles.row}>
					<Field label='Currency' size='small' style={{ width: 160 }}>
						<Input
							disabled
							size='small'
							value={contractValue.currencyCode}
							onChange={(_, d) =>
								patch(dr => {
									dr.commercial.contractValue.currencyCode = d.value.toUpperCase();
								})
							}
						/>
					</Field>

					<Field label='Contract Value (number)' size='small' className={_styles.grow}>
						<Input
							size='small'
							value={moneyDisplay}
							onChange={(_, d) => {
								const { display } = formatNumberInput(d.value);
								setMoneyDisplay(display);
							}}
							onBlur={ev => {
								const { raw, display } = normalizeOnBlur(ev.currentTarget.value);
								const num = raw === '' ? 0 : Number(raw);
								setMoneyDisplay(display);
								patch(dr => {
									dr.commercial.contractValue.value = num;
								});
							}}
							placeholder='e.g., 22,800'
						/>
					</Field>
				</div>

				<Field label='Amount in words' size='small'>
					<Input size='small' value={moneyWords} disabled />
				</Field>

				{/* Bank Info */}
				<Card className={_styles.column}>
					<Text size={400} weight='semibold'>
						BANK INFORMATION
					</Text>

					<div className={_styles.row}>
						<Field label='Beneficiary' size='small' className={_styles.grow}>
							<Input
								disabled
								size='small'
								value={bank.beneficiary}
								onChange={(_, d) =>
									patch(dr => {
										dr.commercial.bank.beneficiary = d.value;
									})
								}
							/>
						</Field>
						<Field label='Account No.' size='small' style={{ width: 220 }}>
							<Input
								disabled
								size='small'
								value={bank.accountNo}
								onChange={(_, d) =>
									patch(dr => {
										dr.commercial.bank.accountNo = d.value;
									})
								}
							/>
						</Field>
					</div>

					<div className={_styles.row}>
						<Field label='Bank' size='small' className={_styles.grow}>
							<Input
								disabled
								size='small'
								value={bank.bankName}
								onChange={(_, d) =>
									patch(dr => {
										dr.commercial.bank.bankName = d.value;
									})
								}
							/>
						</Field>
						<Field label='Branch' size='small' style={{ width: 220 }}>
							<Input
								disabled
								size='small'
								value={bank.branch}
								onChange={(_, d) =>
									patch(dr => {
										dr.commercial.bank.branch = d.value;
									})
								}
							/>
						</Field>
					</div>

					<Field label='Address' size='small'>
						<Textarea
							disabled
							resize='vertical'
							value={bank.address}
							onChange={(_, d) =>
								patch(dr => {
									dr.commercial.bank.address = d.value;
								})
							}
						/>
					</Field>

					<Field label='SWIFT Code' size='small' style={{ width: 260 }}>
						<Input
							disabled
							size='small'
							value={bank.swift}
							onChange={(_, d) =>
								patch(dr => {
									dr.commercial.bank.swift = d.value.toUpperCase();
								})
							}
						/>
					</Field>
				</Card>

				{/* Required Documents (using PartyKeyValue) */}
				<Card className={_styles.column}>
					<Text size={400} weight='semibold'>
						REQUIRED DOCUMENTS
					</Text>
					<PartyKeyValue
						title='Documents'
						value={docRows}
						disableAppend={false}
						onChange={nextRows =>
							patch(dr => {
								dr.commercial.documents = kvToDocs(nextRows);
							})
						}
						styles={{ key: 5, value: 5 }}
					/>
				</Card>

				{/* Consignee & Notify Party */}
				<Card className={_styles.column}>
					<Text size={400} weight='semibold'>
						CONSIGNEE & NOTIFY PARTY
					</Text>

					<div className={_styles.row}>
						<Field label='Consignee - Company' size='small' className={_styles.grow}>
							<Input
								size='small'
								value={consignee.company}
								onChange={(_, d) =>
									patch(dr => {
										dr.commercial.consignee.company = d.value;
									})
								}
							/>
						</Field>
					</div>
					<Field label='Consignee - Address' size='small'>
						<Textarea
							resize='vertical'
							value={consignee.address}
							onChange={(_, d) =>
								patch(dr => {
									dr.commercial.consignee.address = d.value;
								})
							}
						/>
					</Field>

					<div className={_styles.row}>
						<Field label='Notify Party - Company' size='small' className={_styles.grow}>
							<Input
								size='small'
								value={notifyParty.company}
								onChange={(_, d) =>
									patch(dr => {
										dr.commercial.notifyParty.company = d.value;
									})
								}
							/>
						</Field>
					</div>
					<Field label='Notify Party - Address' size='small'>
						<Textarea
							resize='vertical'
							value={notifyParty.address}
							onChange={(_, d) =>
								patch(dr => {
									dr.commercial.notifyParty.address = d.value;
								})
							}
						/>
					</Field>
				</Card>

				{/* Ports & Shipment terms */}
				<Card className={_styles.column}>
					<Text size={400} weight='semibold'>
						LOGISTICS
					</Text>

					<div className={_styles.row}>
						<Field label='Port of Loading (POL)' size='small' className={_styles.grow}>
							<Input
								size='small'
								value={state.commercial.pol}
								onChange={(_, d) =>
									patch(dr => {
										dr.commercial.pol = d.value;
									})
								}
							/>
						</Field>
						<Field label='Port of Discharge (POD)' size='small' className={_styles.grow}>
							<Input
								size='small'
								value={state.commercial.pod}
								onChange={(_, d) =>
									patch(dr => {
										dr.commercial.pod = d.value;
									})
								}
							/>
						</Field>
					</div>

					<Field label='Shipment Terms' size='small'>
						{/* <Input
							size='small'
							value={state.commercial.shipmentTerms}
							onChange={(_, d) =>
								patch(dr => {
									dr.commercial.shipmentTerms = d.value;
								})
							}
							placeholder='e.g., CIF Bangkok Port - Thailand'
						/> */}
						<Input size='small' value={derivedShipmentTerms} disabled />
					</Field>
				</Card>
			</Card>
		</div>
	);
};
