import { Card, Checkbox, Combobox, Field, Input, makeStyles, Option, Text, Textarea } from '@fluentui/react-components';
import * as React from 'react';
import { toWords } from '@/utils/toWord';
import { INCOTERMS_RULES } from '../../constants/example-data';
import { CommercialContext } from '../../contexts/commercial-context';
import { usePartiesTab } from '../../hooks/use-parties-tab';
import { RequireDocument } from './require-document';

const useStyles = makeStyles({
	column: { display: 'flex', flexDirection: 'column', gap: '1rem' },
	row: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' },
	grow: { flex: 1, minWidth: 220 }
});

/* ------------ numeric input helpers (nice typing, store as number) ------------ */
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
	intPart = intPart.replace('-', '').replace(/^0+(?=\d)/, '') || '0';

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

/* ------------------------- amount in words (currency-first) ------------------ */
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

export const CommercialTab = () => {
	const _s = useStyles();
	const {
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
		setDocuments
	} = React.useContext(CommercialContext);

	const { A } = usePartiesTab();

	// local UI state for money input (avoid caret jumps)
	const [moneyDisplay, setMoneyDisplay] = React.useState('');
	React.useEffect(() => {
		const n = Number(state.contractValue.value ?? 0);
		const asText = n === 0 ? '' : new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(n);
		setMoneyDisplay(asText);
	}, [state.contractValue.value]);

	const moneyWords = React.useMemo(
		() => amountInWordsCurrencyFirst(Number(state.contractValue.value || 0), state.contractValue.currencyCode || 'USD'),
		[state.contractValue.value, state.contractValue.currencyCode]
	);

	// “same buyer” toggles (copy from elsewhere if you wire a buyer later)
	const [sameBuyerConsignee, setSameBuyerConsignee] = React.useState(false);
	const [sameBuyerNotify, setSameBuyerNotify] = React.useState(false);

	return (
		<div className={_s.column}>
			<Card className={_s.column}>
				<Text size={500} weight='bold'>
					COMMERCIAL
				</Text>

				{/* Incoterm */}
				<div className={_s.row}>
					<Field label='Incoterm Rule' size='small' className={_s.grow}>
						<Combobox
							value={state.incoterm.rule}
							onOptionSelect={(_, d) => {
								if (d.optionValue === 'EXW') {
									setIncotermLocation('Dai Nghia Factory - Vietnam');
								}

								setIncotermRule(d.optionValue ?? '');
							}}
							placeholder='Select Incoterm rule'
						>
							{INCOTERMS_RULES.map(rule => (
								<Option key={rule}>{rule}</Option>
							))}
						</Combobox>
					</Field>

					<Field label='Incoterm Year' size='small' className={_s.grow} style={{ width: 140 }}>
						<Input size='small' value={state.incoterm.year} onChange={(_, d) => setIncotermYear(d.value)} />
					</Field>
				</div>

				<div className={_s.row}>
					<Field label='Location' size='small' style={{ width: '100%' }}>
						<Textarea
							resize='vertical'
							size='small'
							placeholder='e.g., Bangkok Port - Thailand (or detailed location)'
							value={state.incoterm.location}
							onChange={(_, d) => setIncotermLocation(d.value)}
						/>
					</Field>
				</div>

				{/* Contract value */}
				<div className={_s.row}>
					<Field label='Currency' size='small' style={{ width: 160 }}>
						<Input disabled size='small' value={state.contractValue.currencyCode} onChange={(_, d) => setCurrencyCode(d.value)} />
					</Field>

					<Field label='Contract Value (number)' size='small' className={_s.grow}>
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
								setContractNumber(num);
							}}
							placeholder='e.g., 22,800'
						/>
					</Field>
				</div>

				<Field label='Amount in words' size='small'>
					<Input size='small' value={moneyWords} disabled />
				</Field>

				{/* Bank info (read-only per your initial state) */}
				<Card className={_s.column}>
					<Text size={400} weight='semibold'>
						BANK INFORMATION
					</Text>

					<div className={_s.row}>
						<Field label={state.bank.beneficiary.key} size='small' className={_s.grow}>
							<Input disabled size='small' value={state.bank.beneficiary.value} />
						</Field>
						<Field label={state.bank.accountNo.key} size='small' style={{ width: 220 }}>
							<Input disabled size='small' value={state.bank.accountNo.value} />
						</Field>
					</div>

					<div className={_s.row}>
						<Field label={state.bank.bankName.key} size='small' className={_s.grow}>
							<Input disabled size='small' value={state.bank.bankName.value} />
						</Field>
						<Field label={state.bank.branch.key} size='small' style={{ width: 220 }}>
							<Input disabled size='small' value={state.bank.branch.value} />
						</Field>
					</div>

					<Field label={state.bank.address.key} size='small'>
						<Textarea disabled resize='vertical' value={state.bank.address.value} />
					</Field>

					<Field label={state.bank.swift.key} size='small' style={{ width: 260 }}>
						<Input disabled size='small' value={state.bank.swift.value} />
					</Field>
				</Card>

				{/* Required Documents (CRUD via provider) */}
				<RequireDocument title='REQUIRED DOCUMENTS' documents={state.documents} onChange={next => setDocuments(next)} />

				{/* Consignee & Notify Party */}
				<Card className={_s.column}>
					<Text size={400} weight='semibold'>
						CONSIGNEE & NOTIFY PARTY
					</Text>

					{/* Consignee */}
					<div className={_s.row}>
						<Field label='Consignee - Company' size='small' className={_s.grow}>
							<Input
								disabled={sameBuyerConsignee}
								size='small'
								value={state.consignee.company}
								onChange={(_, d) => setConsignee({ company: d.value })}
							/>
						</Field>
						<Checkbox
							checked={sameBuyerConsignee}
							onChange={(_, data) => {
								const checked = !!data.checked;
								setSameBuyerConsignee(checked);
								if (checked) {
									// If you want to copy from Parties.A, wire it here from a Parties context/prop.
									// For now we just keep the toggle behavior.

									setConsignee({ company: A.company.value, address: A.address.value });
								}
							}}
							label='Same buyer'
						/>
					</div>
					<Field label='Consignee - Address' size='small'>
						<Textarea
							disabled={sameBuyerConsignee}
							resize='vertical'
							value={state.consignee.address}
							onChange={(_, d) => setConsignee({ address: d.value })}
						/>
					</Field>

					{/* Notify Party */}
					<div className={_s.row}>
						<Field label='Notify Party - Company' size='small' className={_s.grow}>
							<Input
								disabled={sameBuyerNotify}
								size='small'
								value={state.notifyParty.company}
								onChange={(_, d) => setNotifyParty({ company: d.value })}
							/>
						</Field>
						<Checkbox
							checked={sameBuyerNotify}
							onChange={(_, data) => {
								const checked = !!data.checked;
								setSameBuyerNotify(checked);
								if (checked) {
									// Same note as above re: copying from Parties.A if needed.
									setNotifyParty({ company: A.company.value, address: A.address.value });
								}
							}}
							label='Same buyer'
						/>
					</div>
					<Field label='Notify Party - Address' size='small'>
						<Textarea
							disabled={sameBuyerNotify}
							resize='vertical'
							value={state.notifyParty.address}
							onChange={(_, d) => setNotifyParty({ address: d.value })}
						/>
					</Field>
				</Card>

				{/* Logistics */}
				<Card className={_s.column}>
					<Text size={400} weight='semibold'>
						LOGISTICS
					</Text>

					<div className={_s.row}>
						<Field label='Port of Loading (POL)' size='small' className={_s.grow}>
							<Input size='small' value={state.pol} onChange={(_, d) => setPOL(d.value)} />
						</Field>
						<Field label='Port of Discharge (POD)' size='small' className={_s.grow}>
							<Input
								size='small'
								placeholder='e.g., Bangkok Port - Thailand'
								value={state.pod}
								disabled={state.incoterm.rule === 'DDP'}
								onChange={(_, d) => setPOD(d.value)}
							/>
						</Field>
					</div>

					<Field label='Shipment Terms' size='small'>
						<Input size='small' value={state.shipmentTerms} disabled />
					</Field>
				</Card>
			</Card>
		</div>
	);
};
