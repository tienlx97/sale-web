import { Button, Card, Field, Input, makeStyles, Text, Textarea } from '@fluentui/react-components';

const useStyles = makeStyles({
	rowFlex: {
		display: 'flex',
		alignItems: 'flex-start',
		gap: '0.5rem',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	full: { width: '100%' },
	headerRow: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '0.5rem',
		marginBottom: '0.25rem'
	}
});

export const PaymentItem = ({ value, title, onChange, onRemove, index }) => {
	const s = useStyles();
	const { percent, money, date, term, format } = value;

	// helpers to update nested fields
	const set = (path, v) => {
		const next = structuredClone ? structuredClone(value) : JSON.parse(JSON.stringify(value));
		const segs = path.split('.');
		let cur = next;
		while (segs.length > 1) {
			cur = cur[segs.shift()];
		}
		cur[segs[0]] = v;
		onChange(next);
	};

	return (
		<Card>
			<div className={s.headerRow}>
				<Text size={400} weight='semibold'>
					{title?.toUpperCase() || `PAYMENT ${index + 1}`}
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
				<div className={s.rowFlex}>
					<Field style={{ width: '30%' }} label='Num' size='small'>
						<Input size='small' value={percent.num} onChange={(_, d) => set('percent.num', Number(d.value || 0))} />
					</Field>
					<Field style={{ width: '70%' }} label='Text' size='small'>
						<Input size='small' value={percent.text} onChange={(_, d) => set('percent.text', d.value)} />
					</Field>
				</div>
			</Card>

			<Card>
				<Text size={400} weight='semibold'>
					Money
				</Text>
				<div className={s.rowFlex}>
					<Field style={{ width: '100%' }} label='Text' size='small'>
						<Input size='small' value={money.text} onChange={(_, d) => set('money.text', d.value)} />
					</Field>
				</div>
			</Card>

			<Card>
				<Text size={400} weight='semibold'>
					Date
				</Text>
				<div className={s.rowFlex}>
					<Field style={{ width: '30%' }} label='Num' size='small'>
						<Input size='small' value={date.num} onChange={(_, d) => set('date.num', Number(d.value || 0))} />
					</Field>
					<Field style={{ width: '70%' }} label='Text' size='small'>
						<Input size='small' value={date.text} onChange={(_, d) => set('date.text', d.value)} />
					</Field>
				</div>
			</Card>

			<Card>
				<Text size={400} weight='semibold'>
					Term
				</Text>
				<div className={s.rowFlex}>
					<Field style={{ width: '100%' }} label='Text' size='small'>
						<Input size='small' value={term} onChange={(_, d) => set('term', d.value)} />
					</Field>
				</div>
			</Card>

			<Card>
				<Text size={400} weight='semibold'>
					Format
				</Text>

				<div className={s.rowFlex}>
					<Field className={s.full} label='paymentPercentText' size='small'>
						<Textarea value={format.paymentPercentText} onChange={(_, d) => set('format.paymentPercentText', d.value)} />
					</Field>
				</div>

				<div className={s.rowFlex}>
					<Field className={s.full} label='paymentValueText' size='small'>
						<Textarea value={format.paymentValueText} onChange={(_, d) => set('format.paymentValueText', d.value)} />
					</Field>
				</div>

				<div className={s.rowFlex}>
					<Field className={s.full} label='termText' size='small'>
						<Textarea value={format.termText} onChange={(_, d) => set('format.termText', d.value)} />
					</Field>
				</div>

				<div className={s.rowFlex}>
					<Field className={s.full} label='moneyTextInword' size='small'>
						<Textarea value={format.moneyTextInword} onChange={(_, d) => set('format.moneyTextInword', d.value)} />
					</Field>
				</div>

				{format.endText !== undefined && (
					<div className={s.rowFlex}>
						<Field className={s.full} label='endText' size='small'>
							<Textarea value={format.endText} onChange={(_, d) => set('format.endText', d.value)} />
						</Field>
					</div>
				)}
			</Card>
		</Card>
	);
};
