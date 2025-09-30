// components/scope-duration-tab.tsx

import { Card, makeStyles, Text } from '@fluentui/react-components';
import { useCallback } from 'react';
import { useScopeDurationTab } from '../../hooks/use-scope-duration-tab';
import { PeriodPhraseItem } from './period-phrase-item';

const useStyles = makeStyles({
	rowFlex: { display: 'flex', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap' },
	columnGap: { display: 'flex', flexDirection: 'column', gap: '1rem' }
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
	const { period, setPeriod } = useScopeDurationTab();

	// replace the old patch() with a local updater
	const setOne = useCallback(
		(key, next) => {
			setPeriod(prev => {
				// normalize qty: keep '' while typing; number when numeric
				const rawQty = next.qty ?? prev[key].qty;
				const qty = typeof rawQty === 'string' ? (rawQty.trim() === '' ? '' : Number(rawQty)) : rawQty;

				return {
					...prev,
					[key]: {
						qty,
						unit: next.unit ?? prev[key].unit,
						format: next.format ?? prev[key].format
					}
				};
			});
		},
		[setPeriod]
	);

	return (
		<Card className={_styles.columnGap}>
			<Text weight='bold' size={500}>
				CONTRACT PERIOD PHRASE
			</Text>

			{PERIOD_ORDER.map(k => (
				<Card key={k}>
					<PeriodPhraseItem label={LABELS[k]} value={period[k]} onChange={v => setOne(k, v)} />
				</Card>
			))}
		</Card>
	);
};
