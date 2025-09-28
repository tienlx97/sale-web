import * as React from 'react';
import { Card, Field, Input, Textarea, Text, Button, makeStyles } from '@fluentui/react-components';
import { useContract } from '@/features/dnc-contract/providers/contract-provider';

const useStyles = makeStyles({
	column: { display: 'flex', flexDirection: 'column', gap: '1rem' },
	row: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' },
	grow: { flex: 1, minWidth: 220 },
	headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' },
	footRow: { display: 'flex', justifyContent: 'flex-end' },
	muted: { opacity: 0.7 }
});

/* -------- helpers -------- */
const stripInteger = s => String(s ?? '').replace(/[^\d]/g, '');
const clampPercent = n => Math.max(0, Math.min(100, n));

const genId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

function makeAppendPaymentFormat(title, idx) {
	return {
		paymentPercentText: `${title}: Party A shall pay {{percentInWords}} ({{appendPayments.[${idx}].percent}}%) of the Contract Value:`,
		paymentValueText: `{{commercial.contractValue.currencyCode}} {{contractValue}} x {{appendPayments.[${idx}].percent}}% = {{commercial.contractValue.currencyCode}} {{paymentValue}}`,
		moneyTextInword: `*(In words: {{paymentInWordsValue}})*`,
		termText: `by {{appendPayments.[${idx}].term}}`,
		endText: ''
	};
}

/* --------- PaymentCard (single payment editor) --------- */
const PaymentCard = ({ where, data, canRemove, onPatch, onRemove, currency, contractValue, indexLabel }) => {
	const s = useStyles();

	return (
		<Card className={s.column}>
			<div className={s.headerRow}>
				<Text size={400} weight='semibold'>
					{indexLabel ?? data.title}
				</Text>
				{canRemove && (
					<Button size='small' appearance='transparent' onClick={onRemove}>
						Remove
					</Button>
				)}
			</div>

			<div className={s.row}>
				<Field label='Percent' size='small' className={s.grow} style={{ width: 160 }}>
					<Input
						size='small'
						inputMode='numeric'
						contentAfter={<Text>%</Text>}
						value={String(data.percent ?? 0)}
						onChange={(_, d) => {
							const v = stripInteger(d.value);
							const n = v === '' ? 0 : clampPercent(Number(v));
							onPatch(p => {
								p.percent = n;
							});
						}}
						onBlur={e => {
							const v = stripInteger(e.currentTarget.value);
							const n = v === '' ? 0 : clampPercent(Number(v));
							onPatch(p => {
								p.percent = n;
							});
						}}
					/>
				</Field>

				<Field label='Days' size='small' className={s.grow} style={{ width: 140 }}>
					<Input
						size='small'
						inputMode='numeric'
						value={String(data.days ?? 0)}
						onChange={(_, d) => {
							const v = stripInteger(d.value);
							const n = v === '' ? 0 : Number(v);
							onPatch(p => {
								p.days = n;
							});
						}}
						onBlur={e => {
							const v = stripInteger(e.currentTarget.value);
							const n = v === '' ? 0 : Number(v);
							onPatch(p => {
								p.days = n;
							});
						}}
					/>
				</Field>

				<Field label='Term' size='small' className={s.grow}>
					<Input
						size='small'
						value={data.term ?? ''}
						onChange={(_, d) =>
							onPatch(p => {
								p.term = d.value;
							})
						}
					/>
				</Field>
			</div>

			<Field label='paymentPercentText' size='small'>
				<Textarea
					disabled
					resize='vertical'
					value={data.format.paymentPercentText ?? ''}
					onChange={(_, d) =>
						onPatch(p => {
							p.format.paymentPercentText = d.value;
						})
					}
				/>
			</Field>

			<Field label='paymentValueText' size='small'>
				<Textarea
					disabled
					resize='vertical'
					value={data.format.paymentValueText ?? ''}
					onChange={(_, d) =>
						onPatch(p => {
							p.format.paymentValueText = d.value;
						})
					}
				/>
			</Field>

			<Field label='termText' size='small'>
				<Textarea
					disabled
					resize='vertical'
					value={data.format.termText ?? ''}
					onChange={(_, d) =>
						onPatch(p => {
							p.format.termText = d.value;
						})
					}
				/>
			</Field>

			{'endText' in (data.format || {}) && (
				<Field label='endText' size='small'>
					<Textarea
						disabled
						resize='vertical'
						value={data.format.endText ?? ''}
						onChange={(_, d) =>
							onPatch(p => {
								p.format.endText = d.value;
							})
						}
					/>
				</Field>
			)}
		</Card>
	);
};

/* -------------------- Main Tab -------------------- */
export const PaymentsTab = () => {
	const _styles = useStyles();
	const { state, patch } = useContract();

	const currency = state.commercial.contractValue.currencyCode || 'USD';
	const contractValue = Number(state.commercial.contractValue.value || 0);

	const addAppendPayment = React.useCallback(() => {
		patch(d => {
			const seq = d.payments.length + d.appendPayments.length; // next overall index
			const title = (['First', 'Second', 'Third', 'Fourth'][seq] ?? `Payment ${seq + 1}`).toUpperCase() + ' PAYMENT';

			d.appendPayments.push({
				id: genId(),
				title, // THIRD PAYMENT, FOURTH PAYMENT, ...
				percent: 0,
				days: 7,
				term: 'Telegraphic Transfer (T/T)',
				format: makeAppendPaymentFormat(title, seq - 2)
			});
		});
	}, [patch, state.payments.length, state.appendPayments.length]);

	const removeAppendPayment = id => {
		patch(d => {
			const i = d.appendPayments.findIndex(x => x.id === id);
			if (i >= 0) d.appendPayments.splice(i, 1);
		});
	};

	const patchCore = (id, recipe) => {
		patch(d => {
			const p = d.payments.find(x => x.id === id);
			if (p) recipe(p);
		});
	};
	const patchAppend = (id, recipe) => {
		patch(d => {
			const p = d.appendPayments.find(x => x.id === id);
			if (p) recipe(p);
		});
	};

	return (
		<Card className={_styles.column}>
			<div className={_styles.headerRow}>
				<Text size={500} weight='bold'>
					PAYMENTS
				</Text>
			</div>

			{/* Core payments */}
			{state.payments.map((p, i) => (
				<PaymentCard
					key={p.id}
					where='core'
					data={p}
					onPatch={fn => patchCore(p.id, fn)}
					currency={currency}
					contractValue={contractValue}
					indexLabel={p.title || `PAYMENT ${i + 1}`}
				/>
			))}

			{/* Append payments */}
			{state.appendPayments.map((p, i) => (
				<PaymentCard
					key={p.id}
					where='append'
					data={p}
					canRemove
					onRemove={() => removeAppendPayment(p.id)}
					onPatch={fn => patchAppend(p.id, fn)}
					currency={currency}
					contractValue={contractValue}
					indexLabel={p.title || `APPEND PAYMENT ${i + 1}`}
				/>
			))}

			<div className={_styles.footRow}>
				<Button appearance='primary' onClick={addAppendPayment}>
					Add append payment
				</Button>
			</div>
		</Card>
	);
};
