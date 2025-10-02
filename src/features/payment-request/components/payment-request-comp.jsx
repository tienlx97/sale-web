import { Card, Combobox, Field, Input, makeStyles, Option } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { useContext, useEffect, useMemo, useState } from 'react';
import { toWords } from '@/utils/toWord';
import { PaymentRequestContext } from '../contexts/payment-request-context';

const useStyles = makeStyles({
	rowFlex: {
		display: 'flex',
		alignItems: 'flex-end',
		gap: '1rem',
		flexWrap: 'wrap'
	},
	columnGap: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem'
	},

	column: { display: 'flex', flexDirection: 'column', gap: '1rem' },
	row: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' },
	grow: { flex: 1, minWidth: 220 }
});

const dateToISO = d => (d ? new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10) : '');

const isoToDate = iso => (iso ? new Date(`${iso}T00:00:00`) : null);

// accept `dd/MM/yyyy` or `yyyy-MM-dd`
const parseHumanDate = s => {
	if (!s) return undefined;
	const t = s.trim();
	// yyyy-MM-dd
	if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
		const [y, m, d] = t.split('-').map(Number);
		const dt = new Date(y, m - 1, d);
		return Number.isFinite(dt.getTime()) ? dt : undefined;
	}
	// dd/MM/yyyy
	if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(t)) {
		const [d, m, y] = t.split('/').map(Number);
		const dt = new Date(y, m - 1, d);
		return Number.isFinite(dt.getTime()) ? dt : undefined;
	}
	return undefined;
};

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

export const PaymentRequestComp = () => {
	const _styles = useStyles();

	const { paymentRequest, dispatch } = useContext(PaymentRequestContext);
	const [_moneyDisplay, setMoneyDisplay] = useState('');

	const signedDate = isoToDate(paymentRequest.signDate);
	const contractSignedDate = isoToDate(paymentRequest.contractSignedDate);

	const moneyWords = useMemo(
		() => amountInWordsCurrencyFirst(Number(paymentRequest.payment.value || 0), 'USD'),
		[paymentRequest.payments.value, paymentRequest.payment.value]
	);

	useEffect(() => {
		const n = Number(paymentRequest.payment.value ?? 0);
		const asText = n === 0 ? '' : new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(n);
		setMoneyDisplay(asText);
	}, [paymentRequest.payment.value]);

	return (
		<Card>
			<div className={_styles.rowFlex}>
				<Field style={{ width: '50%', minWidth: '300px' }} label='Payment signed date' size='small'>
					<DatePicker
						value={signedDate}
						selectedDate={signedDate}
						allowTextInput
						size='small'
						onSelectDate={d => {
							dispatch({ type: 'SET_SIGN_DATE', payload: dateToISO(d ?? undefined) });
						}}
						onChange={(_, data) => {
							const typed = parseHumanDate(data.value);
							if (typed) {
								dispatch({ type: 'SET_SIGN_DATE', payload: dateToISO(typed) });
							}
						}}
					/>
				</Field>

				<Field style={{ width: '50%' }} label='Contract signed date' size='small'>
					<DatePicker
						value={contractSignedDate}
						selectedDate={contractSignedDate}
						allowTextInput
						size='small'
						onSelectDate={d => {
							dispatch({ type: 'SET_CONTRACT_SIGNED_DATE', payload: dateToISO(d ?? undefined) });
						}}
						onChange={(_, data) => {
							const typed = parseHumanDate(data.value);
							dispatch({ type: 'SET_CONTRACT_SIGNED_DATE', payload: dateToISO(typed) });
						}}
					/>
				</Field>
			</div>

			<div className={_styles.rowFlex}>
				<Field label='Payment request No.' size='small' style={{ maxWidth: 300, width: '100%' }}>
					<Input
						placeholder='ex: 25KCT28/PR-01'
						size='small'
						value={paymentRequest.no}
						onChange={(_, d) => dispatch({ type: 'SET_PAYMENT_REQUEST_NO', payload: d.value })}
					/>
				</Field>
			</div>

			<div className={_styles.rowFlex}>
				<Field label='Contract No.' size='small' style={{ maxWidth: 300, width: '100%' }}>
					<Input
						placeholder='ex: 25KCT28'
						size='small'
						value={paymentRequest.contractNo}
						onChange={(_, d) => dispatch({ type: 'SET_CONTRACT_NO', payload: d.value })}
					/>
				</Field>
			</div>

			<div className={_styles.rowFlex}>
				<Field label='Proforma Invoice No.' size='small' style={{ maxWidth: 300, width: '100%' }}>
					<Input
						placeholder='ex: 25KCT28/PI-01'
						size='small'
						value={paymentRequest.proformaInvoiceNo}
						onChange={(_, d) => dispatch({ type: 'SET_PROFORMA_INVOICE_NO', payload: d.value })}
					/>
				</Field>
			</div>

			<div className={_styles.row}>
				<Field label='Payment number' size='small'>
					<Combobox
						value={paymentRequest.payment.num.toString()}
						defaultChecked='1'
						onOptionSelect={(_, d) => dispatch({ type: 'SET_PAYMENT_NUM', payload: Number(d.optionValue) })}
					>
						{['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(rule => (
							<Option key={rule}>{rule}</Option>
						))}
					</Combobox>
				</Field>
			</div>

			<div className={_styles.row}>
				<Field label='Payment request value (number)' size='small' className={_styles.grow}>
					<Input
						size='small'
						value={paymentRequest.payment.value}
						onChange={(_, d) => {
							const { display } = formatNumberInput(d.value);
							setMoneyDisplay(display);
							dispatch({ type: 'SET_PAYMENT_VALUE', payload: display });
						}}
						onBlur={ev => {
							const { raw, display } = normalizeOnBlur(ev.currentTarget.value);
							const num = raw === '' ? 0 : Number(raw);
							setMoneyDisplay(display);
							dispatch({ type: 'SET_PAYMENT_VALUE', payload: num });
						}}
						placeholder='e.g., 22,800'
					/>
				</Field>
			</div>

			<Field label='Amount in words' size='small'>
				<Input size='small' value={moneyWords} disabled />
			</Field>

			<div className={_styles.rowFlex}>
				<Field label='Company' size='small' style={{ width: '100%' }}>
					<Input
						size='small'
						placeholder='ex: NEWPLAN'
						value={paymentRequest.company}
						onChange={(_, d) => dispatch({ type: 'SET_COMPANY', payload: d.value })}
					/>
				</Field>
			</div>

			<div className={_styles.rowFlex}>
				<Field label='Address' size='small' style={{ width: '100%' }}>
					<Input
						size='small'
						placeholder='ex: 112 chonburi, ThaiLand'
						value={paymentRequest.address}
						onChange={(_, d) => dispatch({ type: 'SET_ADDRESS', payload: d.value })}
					/>
				</Field>
			</div>
		</Card>
	);
};
