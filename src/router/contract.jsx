/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */

import { makeStyles, mergeClasses, Tab, TabList } from '@fluentui/react-components';
import { useState } from 'react';
import { ContractPeriodTab } from '@/features/contract/components/contract-period-tab';
import { DateTab } from '@/features/contract/components/date-tab';
import { PartiesContractTab } from '@/features/contract/components/parties-tab';
import { PaymentTab } from '@/features/contract/components/payment-tab';

const useStyles = makeStyles({
	root: {
		maxWidth: '800px',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
		margin: 'auto'
	},
	panel: { width: '100%' },
	hidden: { display: 'none' }
});

export const ContractPage = () => {
	const _styles = useStyles();

	const [selectedValue, setSelectedValue] = useState('date-tab');

	const onTabSelect = (_, data) => {
		setSelectedValue(data.value);
	};

	return (
		<div>
			<div className={_styles.root}>
				<TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
					<Tab id='date-tab' value='date-tab'>
						Date
					</Tab>
					<Tab id='parties-contract-tab' value='parties-contract-tab'>
						Parties and Contract
					</Tab>

					<Tab id='contract-period-tab' value='contract-period-tab'>
						Contract Period
					</Tab>

					<Tab id='payment-tab' value='payment-tab'>
						Payment
					</Tab>
				</TabList>

				<div className={mergeClasses(_styles.panel, selectedValue !== 'date-tab' && _styles.hidden)}>
					<DateTab />
				</div>

				<div className={mergeClasses(_styles.panel, selectedValue !== 'parties-contract-tab' && _styles.hidden)}>
					<PartiesContractTab />
				</div>

				<div className={mergeClasses(_styles.panel, selectedValue !== 'contract-period-tab' && _styles.hidden)}>
					<ContractPeriodTab />
				</div>

				<div className={mergeClasses(_styles.panel, selectedValue !== 'payment-tab' && _styles.hidden)}>
					<PaymentTab />
				</div>

				{/* <SignedDate />
				<Divider appearance='strong' />
				<QuotationDate />
				<Divider appearance='strong' />
				<ConstractInformation />
				<Divider appearance='strong' />
				<Parties />
				<Divider appearance='strong' />
				<PeriodPhraseList />
				<Divider appearance='strong' />
				<Payments /> */}
			</div>
		</div>
	);
};
