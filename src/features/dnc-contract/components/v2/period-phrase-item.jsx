import { Field, Input, makeStyles, Text, Textarea } from '@fluentui/react-components';

const useStyles = makeStyles({
	root: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
	rowFlex: { display: 'flex', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' },
	full: { width: '100%' }
});

export const PeriodPhraseItem = ({ label, value, onChange }) => {
	const _styles = useStyles();

	const onQtyChange = (_, d) => {
		// allow typing, commit as number when possible
		const onlyDigits = d.value.replace(/[^\d]/g, '');
		const nextQty = onlyDigits === '' ? '' : Number(onlyDigits);
		onChange({ ...value, qty: nextQty });
	};

	return (
		<div className={_styles.root}>
			<Text size={400} weight='semibold'>
				{label}
			</Text>

			<Field label='Qty' size='small' style={{ width: 120 }}>
				<Input
					size='small'
					inputMode='numeric'
					value={String(value.qty ?? '')}
					placeholder='1'
					onChange={onQtyChange}
					onBlur={e => {
						const onlyDigits = e.currentTarget.value.replace(/[^\d]/g, '');
						const normalized = onlyDigits === '' ? '' : Number(onlyDigits);
						onChange({ ...value, qty: normalized });
					}}
				/>
			</Field>

			<Field label='Unit' size='small' style={{ width: 160 }}>
				<Input size='small' value={value.unit ?? ''} placeholder='week(s)' onChange={(_, d) => onChange({ ...value, unit: d.value })} />
			</Field>

			<Field className={_styles.full} label='Format' size='small'>
				<Textarea disabled resize='vertical' value={value.format ?? ''} onChange={(_, d) => onChange({ ...value, format: d.value })} />
			</Field>
		</div>
	);
};
