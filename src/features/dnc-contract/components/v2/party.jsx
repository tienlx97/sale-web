import { usePartiesTab } from '../../hooks/use-parties-tab';

import { Input, Field, Text, Card, Button, makeStyles } from '@fluentui/react-components';

import { SubIcon } from '@/coponents/icons/sub-icon';
import { AddIcon } from '@/coponents/icons/add-icon';

const useStyles = makeStyles({
	sectionHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' },

	fixWrapper: {
		display: 'flex',
		flexDirection: 'column',
		gap: '.5rem'
	},

	optList: { display: 'flex', flexDirection: 'column', gap: '.5rem', marginTop: '0.75rem' },
	optRow: { display: 'flex', gap: '.5rem', alignItems: 'flex-end', flexWrap: 'wrap' },
	optKey: { flex: '0 0 240px' },
	optVal: { flex: '1 1 320px', minWidth: 220 },
	optTools: { display: 'flex', gap: '.25rem' }
});

export const Party = () => {
	const _s = useStyles();

	const { A, B, setField, addOptional, updateOptional, removeOptional } = usePartiesTab();

	const { optional, ...fixedOnly } = A;

	const { optional: optionalB, ...fixedOnlyB } = B;

	return (
		<>
			<Card>
				<div className={_s.sectionHeader}>
					<Text size={400} weight='bold'>
						A
					</Text>
					<Button
						size='small'
						appearance='transparent'
						shape='rounded'
						icon={<AddIcon />}
						aria-label='Add row'
						onClick={() => addOptional('A')}
					/>
				</div>

				<div className={_s.fixWrapper}>
					<Field label={fixedOnly.company.key} size='small'>
						<Input size='small' value={fixedOnly.company.value} onChange={(_, data) => setField('A', 'company', data.value)} />
					</Field>

					<Field label={fixedOnly.representedBy.key} size='small'>
						<Input size='small' value={fixedOnly.representedBy.value} onChange={(_, data) => setField('A', 'representedBy', data.value)} />
					</Field>

					<Field label={fixedOnly.position.key} size='small'>
						<Input size='small' value={fixedOnly.position.value} onChange={(_, data) => setField('A', 'position', data.value)} />
					</Field>

					<Field label={fixedOnly.address.key} size='small'>
						<Input size='small' value={fixedOnly.address.value} onChange={(_, data) => setField('A', 'address', data.value)} />
					</Field>
				</div>

				{optional.length > 0 && (
					<div className={_s.optList}>
						{optional.map(row => (
							<div key={row.id} className={_s.optRow}>
								<Field label='Key' size='small' className={_s.optKey}>
									<Input size='small' value={row.key} onChange={(_, d) => updateOptional('A', row.id, { key: d.value })} />
								</Field>

								<Field label='Value' size='small' className={_s.optVal}>
									<Input size='small' value={row.value} onChange={(_, d) => updateOptional('A', row.id, { value: d.value })} />
								</Field>

								<div className={_s.optTools}>
									<Button
										size='small'
										appearance='transparent'
										icon={<SubIcon />}
										aria-label='Remove row'
										onClick={() => removeOptional('A', row.id)}
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</Card>
			{/*  */}
			<Card>
				<div className={_s.sectionHeader}>
					<Text size={400} weight='bold'>
						B
					</Text>
					<Button
						size='small'
						appearance='transparent'
						shape='rounded'
						icon={<AddIcon />}
						aria-label='Add row'
						onClick={() => addOptional('B')}
					/>
				</div>

				<div className={_s.fixWrapper}>
					<Field label={fixedOnlyB.company.key} size='small'>
						<Input size='small' value={fixedOnlyB.company.value} onChange={(_, data) => setField('B', 'company', data.value)} />
					</Field>

					<Field label={fixedOnlyB.representedBy.key} size='small'>
						<Input size='small' value={fixedOnlyB.representedBy.value} onChange={(_, data) => setField('B', 'representedBy', data.value)} />
					</Field>

					<Field label={fixedOnlyB.position.key} size='small'>
						<Input size='small' value={fixedOnlyB.position.value} onChange={(_, data) => setField('B', 'position', data.value)} />
					</Field>

					<Field label={fixedOnlyB.address.key} size='small'>
						<Input size='small' value={fixedOnlyB.address.value} onChange={(_, data) => setField('B', 'address', data.value)} />
					</Field>

					<Field label={fixedOnlyB.taxCode.key} size='small'>
						<Input size='small' value={fixedOnlyB.taxCode.value} onChange={(_, data) => setField('B', 'taxCode', data.value)} />
					</Field>
				</div>

				{optionalB.length > 0 && (
					<div className={_s.optList}>
						{optionalB.map(row => (
							<div key={row.id} className={_s.optRow}>
								<Field label='Key' size='small' className={_s.optKey}>
									<Input size='small' value={row.key} onChange={(_, d) => updateOptional('B', row.id, { key: d.value })} />
								</Field>

								<Field label='Value' size='small' className={_s.optVal}>
									<Input size='small' value={row.value} onChange={(_, d) => updateOptional('B', row.id, { value: d.value })} />
								</Field>

								<div className={_s.optTools}>
									<Button
										size='small'
										appearance='transparent'
										icon={<SubIcon />}
										aria-label='Remove row'
										onClick={() => removeOptional('B', row.id)}
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</Card>
		</>
	);
};
