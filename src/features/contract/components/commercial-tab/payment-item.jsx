import { Button, Card, Field, Input, Text, Textarea } from '@fluentui/react-components';
import { useMemo } from 'react';
import { moneyInWords } from '@/utils/toWord';
import { computePaymentValue, daysText, percentText, prettyMoney } from './formatters';
import { useStyles } from './styles';
import { useNumericField } from './useNumericField';

export const PaymentItem = ({ payment, where, currency, contractAmount, onPatch, onRemove }) => {
	const _style = useStyles();

	const percentField = useNumericField(payment.percent, n =>
		onPatch(d => {
			d.percent = n;
		})
	);
	const daysField = useNumericField(
		payment.days,
		n =>
			onPatch(d => {
				d.days = n;
			}),
		{ integer: true }
	);

	const derived = useMemo(() => {
		const payValue = computePaymentValue(contractAmount, payment.percent);
		return {
			percentWords: percentText(payment.percent),
			daysWords: daysText(payment.days),
			paymentValue: prettyMoney(payValue, currency),
			paymentValueWords: moneyInWords(payValue, currency)
		};
	}, [payment.percent, payment.days, contractAmount, currency]);

	return (
		<Card>
			<div className={_style.headerRow}>
				<Text size={400} weight='semibold'>
					{payment.title}
				</Text>
				{onRemove && (
					<Button size='small' appearance='transparent' onClick={onRemove}>
						Remove
					</Button>
				)}
			</div>

			<Card>
				<Text size={400} weight='semibold'>
					Percent
				</Text>
				<div className={_style.rowFlex}>
					<Field style={{ width: 240 }} label='Percent' size='small'>
						<Input
							type='text'
							inputMode='decimal'
							size='small'
							contentAfter={<Text size={300}>%</Text>}
							value={percentField.display}
							onChange={percentField.onChange}
							onBlur={percentField.onBlur}
						/>
					</Field>
					<Field className={_style.full} label='Percent (derived text)' size='small'>
						<Input size='small' value={derived.percentWords} disabled />
					</Field>
				</div>
			</Card>

			<Card>
				<Text size={400} weight='semibold'>
					Payment Date
				</Text>
				<div className={_style.rowFlex}>
					<Field style={{ width: 240 }} label='Days' size='small'>
						<Input
							type='text'
							inputMode='numeric'
							size='small'
							value={daysField.display}
							onChange={daysField.onChange}
							onBlur={daysField.onBlur}
						/>
					</Field>
					<Field className={_style.full} label='Days (derived text)' size='small'>
						<Input size='small' value={derived.daysWords} disabled />
					</Field>
				</div>
			</Card>

			<Card>
				<Text size={400} weight='semibold'>
					Payment Value (derived)
				</Text>
				<div className={_style.rowFlex}>
					<Field className={_style.full} label='Amount' size='small'>
						<Input size='small' value={derived.paymentValue} disabled />
					</Field>
				</div>
				<div className={_style.rowFlex}>
					<Field className={_style.full} label='Amount in words' size='small'>
						<Textarea value={derived.paymentValueWords} disabled />
					</Field>
				</div>
			</Card>

			<Card>
				<Text size={400} weight='semibold'>
					Term
				</Text>
				<div className={_style.rowFlex}>
					<Field className={_style.full} label='Payment term' size='small'>
						<Input
							size='small'
							value={payment.term}
							onChange={(_, d) =>
								onPatch(p => {
									p.term = d.value;
								})
							}
						/>
					</Field>
				</div>
			</Card>

			<Card>
				<Text size={400} weight='semibold'>
					Templates (Optional)
				</Text>
				<div className={_style.rowFlex}>
					<Field className={_style.full} label='paymentPercentText' size='small'>
						<Textarea
							value={payment.format?.paymentPercentText ?? ''}
							onChange={(_, d) =>
								onPatch(p => {
									p.format ??= {};
									p.format.paymentPercentText = d.value;
								})
							}
						/>
					</Field>
				</div>
				<div className={_style.rowFlex}>
					<Field className={_style.full} label='paymentValueText' size='small'>
						<Textarea
							value={payment.format?.paymentValueText ?? ''}
							onChange={(_, d) =>
								onPatch(p => {
									p.format ??= {};
									p.format.paymentValueText = d.value;
								})
							}
						/>
					</Field>
				</div>
				<div className={_style.rowFlex}>
					<Field className={_style.full} label='termText' size='small'>
						<Textarea
							value={payment.format?.termText ?? ''}
							onChange={(_, d) =>
								onPatch(p => {
									p.format ??= {};
									p.format.termText = d.value;
								})
							}
						/>
					</Field>
				</div>
				<div className={_style.rowFlex}>
					<Field className={_style.full} label='endText' size='small'>
						<Textarea
							value={payment.format?.endText ?? ''}
							onChange={(_, d) =>
								onPatch(p => {
									p.format ??= {};
									p.format.endText = d.value;
								})
							}
						/>
					</Field>
				</div>
			</Card>
		</Card>
	);
};
