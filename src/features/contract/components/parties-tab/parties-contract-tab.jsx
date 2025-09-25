import { Card } from '@fluentui/react-components';
import { useState } from 'react';
import { withIds } from '@/utils/withIds';
import { PartyKeyValue } from './party-key-value';

export const PartiesContractTab = () => {
	const [partyA, setPartyA] = useState(
		withIds([
			{ key: '**PARTY A (BUYER)**', value: '', canDelete: false },
			{ key: '**Represented by**', value: '', canDelete: false },
			{ key: 'Position', value: '', canDelete: false },
			{ key: 'Address', value: '', canDelete: false }
		])
	);

	const [partyB, setPartyB] = useState(
		withIds([
			{
				key: '**PARTY A (BUYER)**',
				value: 'DAI NGHIA INDUSTRIAL MECHANICS CO.',
				canDelete: false
			},
			{ key: '**Represented by**', value: 'MR. Le Xuan Nghia', canDelete: false },
			{ key: 'Position', value: 'General Director', canDelete: false },
			{
				key: 'Address',
				value: 'No 5 Vsip II-A, Street 32, Viet Nam – Singapore II-A IZ, Vinh Tan Ward, Ho Chi Minh City Viet Nam',
				canDelete: false
			},
			{
				key: 'Tax Code',
				value: '3702682454',
				canDelete: false
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
				<PartyKeyValue title='A' value={partyA} onChange={setPartyA} />
			</Card>

			<br />

			<Card>
				<PartyKeyValue title='B' value={partyB} onChange={setPartyB} />
			</Card>
		</div>
	);
};
