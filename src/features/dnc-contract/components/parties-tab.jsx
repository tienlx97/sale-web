import { Card } from '@fluentui/react-components';
import { PartyKeyValue } from './party-key-value';
import { useMemo } from 'react';
import { kvToPartyBlock, partyBlockToKV } from '../store/party-adapter';
import { useContract } from '../providers/contract-provider';
import { Text } from '@fluentui/react-components';
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

export const PartiesTab = () => {
	const _styles = useStyles();
	const { state, patch } = useContract();

	const partyRowsA = useMemo(() => partyBlockToKV('A', state.parties.A), [state.parties.A]);
	const partyRowsB = useMemo(() => partyBlockToKV('B', state.parties.B), [state.parties.B]);

	return (
		<Card className={_styles.columnGap}>
			<Text weight='bold' size={500}>
				PARTIES
			</Text>

			<Card>
				<PartyKeyValue
					title='A'
					value={partyRowsA}
					onChange={nextRows =>
						patch(d => {
							d.parties.A = kvToPartyBlock('A', nextRows, d.parties.A);
						})
					}
					// prevent deleting fixed rows
					disableAppend={false}
					// optional: set widths
					styles={{ key: 3, value: 7 }}
				/>
			</Card>

			<Card>
				<PartyKeyValue
					title='B'
					value={partyRowsB}
					onChange={nextRows =>
						patch(d => {
							d.parties.B = kvToPartyBlock('B', nextRows, d.parties.B);
						})
					}
					disableAppend={false}
					styles={{ key: 3, value: 7 }}
				/>
			</Card>
		</Card>
	);
};
