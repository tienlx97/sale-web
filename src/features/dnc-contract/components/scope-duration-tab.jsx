import { useCallback } from 'react';
import { useContract } from '../providers/contract-provider';
import { Card } from '@fluentui/react-components';
import { PeriodPhraseItem } from './period-phrase-item';
import { makeStyles } from '@fluentui/react-components';
import { Text } from '@fluentui/react-components';

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
	}
});

const PERIOD_ORDER = ['preparation', 'approval', 'shopDrawing', 'fabrication', 'transportation'];
const LABELS = {
	preparation: 'Preparation',
	approval: 'Approval',
	shopDrawing: 'Shop Drawing',
	fabrication: 'Fabrication',
	transportation: 'Transportation'
};

export const ScopeDurationTab = () => {
	const _styles = useStyles();
	const { state, patch } = useContract();
	const setPeriod = useCallback(
		(key, next) => {
			patch(d => {
				const qtyNum = typeof next.qty === 'string' && next.qty.trim() !== '' ? Number(next.qty) : next.qty;
				d.periods[key] = {
					qty: qtyNum ?? d.periods[key].qty,
					unit: next.unit ?? d.periods[key].unit,
					format: next.format ?? d.periods[key].format
				};
			});
		},
		[patch]
	);

	return (
		<Card className={_styles.columnGap}>
			<Text weight='bold' size={500}>
				CONTRACT PERIOD PHRASE
			</Text>

			{PERIOD_ORDER.map(k => (
				<Card key={k}>
					<PeriodPhraseItem label={LABELS[k]} value={state.periods[k]} onChange={v => setPeriod(k, v)} />
				</Card>
			))}
		</Card>
	);
};
