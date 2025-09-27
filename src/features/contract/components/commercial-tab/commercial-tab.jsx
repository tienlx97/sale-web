import { Button, Card, Field, Input, Text, Textarea } from '@fluentui/react-components';
import { useReducer } from 'react';
import { moneyInWords } from '@/utils/toWord';
import { prettyMoney } from './formatters';
import { initialContract } from './initialState';
import { PaymentItem } from './payment-item';
import { reducer } from './store';
import { useStyles } from './styles';
import { useNumericField } from './useNumericField';

export const CommercialTab = () => {
	const _style = useStyles();
	const [state, dispatch] = useReducer(reducer, initialContract);

	// contract amount field
	const amountField = useNumericField(state.amount, n =>
		dispatch({
			type: 'contract/set',
			patch: d => {
				d.amount = n;
			}
		})
	);

	return (
		<div className={_style.column}>
			<Card>
				<Text size={400} weight='semibold'>
					CONTRACT VALUE
				</Text>

				<div className={_style.rowFlex}>
					<Field style={{ width: 200 }} label='Currency' size='small'>
						<Input
							size='small'
							value={state.currency}
							onChange={(_, d) =>
								dispatch({
									type: 'contract/set',
									patch: c => {
										c.currency = d.value.toUpperCase();
									}
								})
							}
						/>
					</Field>
					<Field style={{ minWidth: 240, flex: 1 }} label='Amount (number)' size='small'>
						<Input
							type='text'
							inputMode='decimal'
							size='small'
							value={amountField.display}
							onChange={amountField.onChange}
							onBlur={amountField.onBlur}
						/>
					</Field>
				</div>

				<div className={_style.rowFlex}>
					<Field className={_style.full} label='Amount (pretty)' size='small'>
						<Input size='small' value={prettyMoney(state.amount, state.currency)} disabled />
					</Field>
				</div>

				<div className={_style.rowFlex}>
					<Field className={_style.full} label='Amount in words' size='small'>
						<Textarea value={moneyInWords(state.amount, state.currency)} disabled />
					</Field>
				</div>

				<div className={_style.rowFlex}>
					<Field style={{ width: 160 }} label='Incoterm Year' size='small'>
						<Input
							size='small'
							value={state.incoterm.year}
							onChange={(_, d) =>
								dispatch({
									type: 'contract/set',
									patch: c => {
										c.incoterm.year = d.value;
									}
								})
							}
						/>
					</Field>
					<Field style={{ minWidth: 240, flex: 1 }} label='Incoterm Name' size='small'>
						<Input
							size='small'
							value={state.incoterm.name}
							onChange={(_, d) =>
								dispatch({
									type: 'contract/set',
									patch: c => {
										c.incoterm.name = d.value;
									}
								})
							}
						/>
					</Field>
				</div>

				<div className={_style.rowFlex}>
					<Field className={_style.full} label='Location' size='small'>
						<Input
							size='small'
							value={state.location}
							onChange={(_, d) =>
								dispatch({
									type: 'contract/set',
									patch: c => {
										c.location = d.value;
									}
								})
							}
						/>
					</Field>
				</div>
			</Card>

			{state.payments.map(p => (
				<PaymentItem
					key={p.id}
					where='core'
					payment={p}
					currency={state.currency}
					contractAmount={state.amount}
					onPatch={patch => dispatch({ type: 'payment/patch', where: 'core', id: p.id, patch })}
					onRemove={state.payments.length > 1 ? () => dispatch({ type: 'payment/remove', where: 'core', id: p.id }) : undefined}
				/>
			))}

			{state.appendPayments.map(p => (
				<PaymentItem
					key={p.id}
					where='append'
					payment={p}
					currency={state.currency}
					contractAmount={state.amount}
					onPatch={patch => dispatch({ type: 'payment/patch', where: 'append', id: p.id, patch })}
					onRemove={() => dispatch({ type: 'payment/remove', where: 'append', id: p.id })}
				/>
			))}

			<div className={_style.rowFlex}>
				<Button appearance='primary' onClick={() => dispatch({ type: 'payment/add', where: 'append' })}>
					Add append payment
				</Button>
			</div>
		</div>
	);
};
