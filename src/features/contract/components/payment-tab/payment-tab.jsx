/** biome-ignore-all lint/correctness/noUnusedVariables: <explanation> */
import { Button, Card, Field, Input, makeStyles, Text } from '@fluentui/react-components';
import { useCallback, useMemo, useReducer, useState } from 'react';
import { ToWords } from 'to-words';
import { PaymentItem } from './payment-item';

const useStyles = makeStyles({
	rowFlex: {
		display: 'flex',
		alignItems: 'flex-start',
		gap: '0.5rem',
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
});

const ordinal = n =>
	`${['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eight', 'Ninth', 'Tenth'][n]} Payment` || `Payment ${n + 1}`;

const genId = () => self.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

const makeCorePayment = idx => {
	const title = ordinal(idx);
	let termText, paymentPercentText, paymentValueText, endText, moneyTextInword;

	if (idx === 0) {
		termText = `by {{contract.payment.[0].term}} within {{contract.payment.[0].date.num}} ({{contract.payment.[0].date.text}}) calendar days from the date of Contract signing`;
		paymentPercentText = `${title}: Party A shall pay {{contract.payment.[0].percent.text}} ({{contract.payment.[0].percent.num}}%) of the Contract Value`;
		paymentValueText = `{{contract.currencyUnit}} {{contractCurrencyFormat}} x {{contract.payment.[0].percent.num}}% = {{contract.money.unit}} {{firstPaymentValue}}`;
		endText = moneyTextInword = '*(In words: {{contract.payment.[0].money.text}})*';
	} else {
		paymentPercentText =
			'Second Payment: Party A shall pay {{contract.payment.[1].percent.text}} ({{contract.payment.[1].percent.num}}%) of the Contract Value:';
		paymentValueText =
			'{{contract.money.unit}} {{contractCurrencyFormat}} x {{contract.payment.[1].percent.num}}% = {{contract.money.unit}} {{secondPaymentValue}}';
		termText =
			'by {{contract.payment.[1].term}} within {{contract.payment.[1].date.num}} ({{contract.payment.[1].date.text}}) calendar days after completion of inspection at Party B’s factory in Vietnam and prior to shipment release.';
		moneyTextInword = '*(In words: {{contract.payment.[1].money.text}})*';
	}

	return {
		id: genId(),
		title: title.toUpperCase(),
		percent: {
			num: 0,
			text: ''
		},
		money: {
			text: ''
		},
		date: {
			num: 7,
			text: ''
		},
		term: 'Telegraphic Transfer (T/T)',
		format: { termText, paymentPercentText, paymentValueText, endText, moneyTextInword }
	};
};

const makeAppendPayment = idx => {
	const title = ordinal(idx);

	return {
		id: genId(), // ✅ add id
		title: title.toUpperCase(),
		percent: {
			num: 0,
			text: ''
		},
		money: {
			text: ''
		},
		date: {
			num: 7,
			text: ''
		},
		term: 'Telegraphic Transfer (T/T)',
		format: {
			paymentPercentText: `${title}: Party A shall pay {{contract.paymentAppend.[${idx}].percent.text}} ({{contract.paymentAppend.[${idx}].percent.num}}%) of the Contract Value:`,
			paymentValueText: `{{contract.money.unit}} {{contractCurrencyFormat}} x {{contract.paymentAppend.[${idx}].percent.num}}% = {{contract.money.unit}} {{appendPaymentValue}}`,
			moneyTextInword: `*(In words: {{contract.paymentAppend.[${idx}].money.text}})*`,
			termText: `by {{contract.paymentAppend.[${idx}].term}} ...`,
			endText: ''
		}
	};
};

function listReducer(state, action) {
	switch (action.type) {
		case 'add':
			// ✅ pass next index to template factory
			return [...state, makeAppendPayment(state.length)];
		case 'remove':
			return state.length <= 2 ? state : state.filter(p => p.id !== action.id); // keep ≥ 2 if needed
		case 'update':
			return state.map(p => (p.id === action.id ? action.next : p));
		case 'reorder': {
			const next = [...state];
			const [moved] = next.splice(action.from, 1);
			next.splice(action.to, 0, moved);
			return next;
		}
		default:
			return state;
	}
}

const currencyMeta = {
	USD: {
		name: 'United States Dollar',
		plural: 'United States Dollars',
		fractionalUnit: { name: 'Cent', plural: 'Cents' }
	}
};

const toWords = new ToWords({ localeCode: 'en-US' });

function amountInWordsCurrencyFirst(amount, unit = 'USD') {
	const meta = currencyMeta[unit] || currencyMeta.USD;

	const n = Number(amount);
	if (!Number.isFinite(n)) return '';
	const intPart = Math.trunc(Math.abs(n));
	const cents = Math.round((Math.abs(n) - intPart) * 100);

	// amount in words (number only)
	const intWords = intPart === 0 ? 'Zero' : toWords.convert(intPart);

	// choose singular/plural currency name
	const currencyName = intPart === 1 ? meta.name : meta.plural;

	// Build phrase
	let phrase = `${currencyName} ${intWords}`;
	if (cents > 0) {
		const centWords = toWords.convert(cents);
		const centName = cents === 1 ? meta.fractionalUnit.name : meta.fractionalUnit.plural;
		phrase += ` and ${centWords} ${centName}`;
	}
	return `${phrase} Only`;
}

export const PaymentTab = () => {
	const s = useStyles();

	const [payments, dispatchPayments] = useReducer(listReducer, [makeCorePayment(0), makeCorePayment(1)]);
	const [paymentAppend, dispatchAppend] = useReducer(listReducer, []);

	const [contractValue, setContractValue] = useState({
		num: '',
		text: '',
		unit: 'USD'
	});

	const toWords = useMemo(() => new ToWords({ localeCode: 'en-US' }), []);

	const onChangeAmount = (_, d) => {
		const num = d.value;
		setContractValue(prev => ({
			...prev,
			num,
			text: amountInWordsCurrencyFirst(num, prev.unit)
		}));
	};

	const onChangeUnit = (_, d) => {
		const unit = d.value.toUpperCase();
		setContractValue(prev => ({
			...prev,
			unit,
			text: amountInWordsCurrencyFirst(prev.num, unit)
		}));
	};

	const addAppend = useCallback(() => dispatchAppend({ type: 'add' }), []);
	const _updatePayment = (id, next) => dispatchPayments({ type: 'update', id, next });

	return (
		<div>
			<Card>
				<Text size={400} weight='semibold'>
					CONTRACT VALUE
				</Text>

				<div className={s.rowFlex}>
					<Field style={{ width: '30%' }} label='Unit' size='small'>
						<Input size='small' value={contractValue.unit} onChange={onChangeUnit} />
					</Field>
					<Field style={{ width: '70%' }} label='Amount (number)' size='small'>
						<Input size='small' value={contractValue.num} onChange={onChangeAmount} />
					</Field>
				</div>

				<div className={s.rowFlex}>
					<Field style={{ width: '100%' }} label='Amount in words' size='small'>
						<Input size='small' value={contractValue.text} readOnly />
					</Field>
				</div>
			</Card>
			<br />
			{payments.map((p, i) => (
				<>
					<PaymentItem
						key={p.id}
						value={p}
						title={`PAYMENT ${i + 1}`}
						onChange={next => dispatchPayments({ type: 'update', id: p.id, next })}
						onRemove={() => dispatchPayments({ type: 'remove', id: p.id })}
					/>
					<br />
				</>
			))}

			{paymentAppend.map((p, i) => (
				<>
					<PaymentItem
						key={p.id}
						value={p}
						title={`APPEND PAYMENT ${i + 1}`}
						onChange={next => dispatchAppend({ type: 'update', id: p.id, next })}
						onRemove={() => dispatchAppend({ type: 'remove', id: p.id })}
					/>
					<br />
				</>
			))}

			<Button onClick={addAppend}>Add append payment</Button>
		</div>
	);
};
