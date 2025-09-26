import { Card, makeStyles, Text } from '@fluentui/react-components';
import { useState } from 'react';
import { withIds } from '@/utils/withIds';
import { PeriodPhraseItem } from '../contract-period-tab/period-phrase-item';
import { PartyKeyValue } from '../parties-tab/party-key-value';

const useStyles = makeStyles({
	rowFlex: {
		display: 'flex',
		alignItems: 'flex-end',
		gap: '1rem'
	},
	columnGap: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem'
	}
});

export const ScopeDurationTab = () => {
	const _styles = useStyles();

	const [projectWorkDetails, setProjectWorkDetails] = useState(
		withIds([
			{
				key: '*. Project',
				value: '',
				canDelete: false,
				markup: {
					boldValue: true
				}
			},
			{
				key: '*. Item',
				value: 'STEEL STRUCTURE',
				canDelete: false,
				markup: {
					caplockValue: true,
					boldValue: true
				}
			},
			{
				key: '*. Location',
				value: '',
				canDelete: false,
				markup: {
					caplockValue: true
				}
			},
			{
				key: '*. Volume of works',
				multiline: true,
				value:
					'As specified in Party B’s Quotation dated {{quotationDate}}, including the scope of quotation, the list of materials and applicable standards attached to this Contract, Party A’s architectural design drawings, and Party B’s steel structure design drawings as approved by Party A.',
				canDelete: false
			}
		])
	);

	const [contractInfo, setContractInfo] = useState(
		withIds([
			{
				key: 'No.',
				value: '',
				markup: {
					caplockValue: true
				}
			},
			{
				key: '**Project**',
				value: '',
				markup: {
					caplockValue: true
				}
			},
			{
				key: '**Item**',
				value: '',
				markup: {
					caplockValue: true
				}
			},
			{
				key: '**Location**',
				value: '',
				markup: {
					caplockValue: true
				}
			}
		])
	);

	const [preparation, setPreparation] = useState({
		num: '1',
		type: 'week',
		format: '{{contractPeriodPhrase.preparation.num}} {{contractPeriodPhrase.preparation.type}} for preparation of approval drawings.'
	});

	const [approval, setApproval] = useState({
		num: '1',
		type: 'week',
		format: "{{contractPeriodPhrase.approval.num}} {{contractPeriodPhrase.approval.type}} allocation for customer's (Party A) approval."
	});

	const [shopDrawing, setShopDrawing] = useState({
		num: '1',
		type: 'week',
		format: '{{contractPeriodPhrase.shopDrawing.num}} {{contractPeriodPhrase.shopDrawing.type}} for preparation of shop drawings.'
	});

	const [fabrication, setFabrication] = useState({
		num: '4',
		type: 'weeks',
		format:
			'{{contractPeriodPhrase.fabrication.num}} {{contractPeriodPhrase.fabrication.type}} fabrication period reckoned from the date the approval drawings are approved.'
	});

	const [transportation, setTransportation] = useState({
		num: '4',
		type: 'weeks',
		format:
			'{{contractPeriodPhrase.transportation.num}} {{contractPeriodPhrase.transportation.type}} for transportation from factory to {{transportationLocation}}'
	});

	return (
		<div className={_styles.columnGap}>
			<Card>
				<PartyKeyValue title='CONTRACT INFORMATION' value={contractInfo} onChange={setContractInfo} />
			</Card>

			<Card>
				<PartyKeyValue title='PROJECT WORK DETAIL' value={projectWorkDetails} onChange={setProjectWorkDetails} />
			</Card>

			<Card className={_styles.columnGap}>
				<div>
					<Text size={400} weight='semibold'>
						CONTRACT PERIOD PHRASE
					</Text>
				</div>

				<Card>
					<PeriodPhraseItem phrase='Preparation' values={preparation} onChange={setPreparation} />
				</Card>

				<Card>
					<PeriodPhraseItem phrase='Approval' values={approval} onChange={setApproval} />
				</Card>

				<Card>
					<PeriodPhraseItem phrase='Shop Drawing' values={shopDrawing} onChange={setShopDrawing} />
				</Card>

				<Card>
					<PeriodPhraseItem phrase='Fabrication' values={fabrication} onChange={setFabrication} />
				</Card>

				<Card>
					<PeriodPhraseItem phrase='Transportation' values={transportation} onChange={setTransportation} />
				</Card>
			</Card>
		</div>
	);
};
