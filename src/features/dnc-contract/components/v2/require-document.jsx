import { Button, Card, Field, Input, makeStyles, Text } from '@fluentui/react-components';
import { AddIcon } from '@/coponents/icons/add-icon';
import { SubIcon } from '@/coponents/icons/sub-icon';

const useStyles = makeStyles({
	sectionHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '.5rem',
		marginBottom: '.5rem'
	},
	list: { display: 'flex', flexDirection: 'column', gap: '.5rem' },
	row: { display: 'flex', gap: '.5rem', alignItems: 'flex-end', flexWrap: 'wrap' },
	keyCol: { flex: '0 0 280px' },
	valCol: { flex: '1 1 360px', minWidth: 260 },
	tools: { display: 'flex', gap: '.25rem' }
});

export const RequireDocument = ({ title = 'Required Documents', documents, onChange }) => {
	const _s = useStyles();

	const addRow = () => onChange([...(documents ?? []), { key: '', value: '' }]);

	const removeAt = idx => onChange(documents.filter((_, i) => i !== idx));

	const updateAt = (idx, patch) => onChange(documents.map((r, i) => (i === idx ? { ...r, ...patch } : r)));

	return (
		<Card>
			<div className={_s.sectionHeader}>
				<Text size={400} weight='semibold'>
					{title}
				</Text>
				<Button size='small' appearance='transparent' shape='rounded' icon={<AddIcon />} aria-label='Add document row' onClick={addRow} />
			</div>

			<div className={_s.list}>
				{documents.map((row, idx) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={idx} className={_s.row}>
						<Field label='Key' size='small' className={_s.keyCol}>
							<Input size='small' value={row.key} onChange={(_, d) => updateAt(idx, { key: d.value })} />
						</Field>

						<Field label='Value' size='small' className={_s.valCol}>
							<Input size='small' value={row.value} onChange={(_, d) => updateAt(idx, { value: d.value })} />
						</Field>

						<div className={_s.tools}>
							<Button size='small' appearance='transparent' icon={<SubIcon />} aria-label='Remove row' onClick={() => removeAt(idx)} />
						</div>
					</div>
				))}
			</div>
		</Card>
	);
};
