import { Card } from '@fluentui/react-components';
import { PartyKeyValue } from './party-key-value';
import { useMemo } from 'react';
import { infoToKV, kvToInfo } from '../store/project-info-adapter';
import { useContract } from '../providers/contract-provider';
import { makeStyles } from '@fluentui/react-components';

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

export const InfoTab = () => {
	const _styles = useStyles();

	const { state, patch } = useContract();

	const infoRows = useMemo(() => infoToKV(state.info), [state.info]);

	return (
		<Card className={_styles.columnGap}>
			<PartyKeyValue
				titleSize='large'
				title='PROJECT INFO'
				value={infoRows}
				onChange={nextRows =>
					patch(d => {
						d.info = kvToInfo(nextRows, d.info);
					})
				}
				disableAppend={true}
				styles={{ key: 3, value: 7 }}
			/>
		</Card>
	);
};
