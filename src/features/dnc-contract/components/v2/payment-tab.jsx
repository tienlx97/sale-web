import { Button, Card, Field, Input, makeStyles, Text, Textarea } from '@fluentui/react-components';

import { usePaymentTab } from '../../hooks/use-payment-tab';

const useStyles = makeStyles({
	column: { display: 'flex', flexDirection: 'column', gap: '1rem' },
	row: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' },
	grow: { flex: 1, minWidth: 220 },
	headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' },
	footRow: { display: 'flex', justifyContent: 'flex-end' },
	muted: { opacity: 0.7 }
});

const stripInteger = s => String(s ?? '').replace(/[^\d]/g, '');
const clampPercent = n => Math.max(0, Math.min(100, n));

const PaymentCard = ({ data, canRemove, onPatch, onRemove, indexLabel }) => {
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

export const PaymentsTab = () => {
	const s = useStyles();
	const { state, patchCoreById, patchAppendById, addAppendPayment, removeAppendPayment } = usePaymentTab();

	return (
		<Card className={s.column}>
			<div className={s.headerRow}>
				<Text size={500} weight='bold'>
					PAYMENTS
				</Text>
			</div>

			{/* Core payments */}
			{state.payments.map((p, i) => (
				<PaymentCard key={p.id} data={p} onPatch={fn => patchCoreById(p.id, fn)} indexLabel={p.title || `PAYMENT ${i + 1}`} />
			))}

			{/* Append payments */}
			{state.appendPayments.map((p, i) => (
				<PaymentCard
					key={p.id}
					data={p}
					canRemove
					onRemove={() => removeAppendPayment(p.id)}
					onPatch={fn => patchAppendById(p.id, fn)}
					indexLabel={p.title || `APPEND PAYMENT ${i + 1}`}
				/>
			))}

			<div className={s.footRow}>
				<Button appearance='primary' onClick={addAppendPayment}>
					Add append payment
				</Button>
			</div>
		</Card>
	);
};
