import { useState } from 'react';
import { PartyKeyValue } from './party-key-value';
import { withIds } from '@/utils/withIds';
import { Card } from '@fluentui/react-components';

export const PartiesTab = () => {
	const [partyA, setPartyA] = useState(
		withIds([
			{ key: '**PARTY A (BUYER)**', value: '' },
			{ key: '**Represented by**', value: '' },
			{ key: 'Position', value: '' },
			{ key: 'Address', value: '' }
		])
	);

	const [partyB, setPartyB] = useState(
		withIds([
			{
				key: '**PARTY A (BUYER)**',
				value: 'DAI NGHIA INDUSTRIAL MECHANICS CO.'
			},
			{ key: '**Represented by**', value: 'MR. Le Xuan Nghia' },
			{ key: 'Position', value: 'General Director' },
			{
				key: 'Address',
				value: 'No 5 Vsip II-A, Street 32, Viet Nam – Singapore II-A IZ, Vinh Tan Ward, Ho Chi Minh City Viet Nam'
			},
			{
				key: 'Tax Code',
				value: '3702682454'
			}
		])
	);

	const [contractInfo, setContractInfo] = useState(
		withIds([
			{ key: 'No.', value: '' },
			{ key: '**Project**', value: '' },
			{ key: '**Item**', value: '' },
			{ key: '**Location**', value: '' }
		])
	);

	return (
		<div>
			<Card>
				<PartyKeyValue disableAppend title='CONTRACT INFORMATION' value={contractInfo} onChange={setContractInfo} />
			</Card>

			<br />

			<Card>
				<PartyKeyValue title='__A__' value={partyA} onChange={setPartyA} />
			</Card>

			<br />

			<Card>
				<PartyKeyValue title='__B__' value={partyB} onChange={setPartyB} />
			</Card>
		</div>
	);
};
