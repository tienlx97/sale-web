/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */

import { makeStyles, mergeClasses, Tab, TabList } from '@fluentui/react-components';
import { useState } from 'react';
import { CommercialTab } from '@/features/contract/components/commercial-tab';
import { GeneralTab } from '@/features/contract/components/general';
import { PartiesContractTab } from '@/features/contract/components/parties-tab';
import { ScopeDurationTab } from '@/features/contract/components/scope-duration-tab';

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

	const [selectedValue, setSelectedValue] = useState('general-tab');

	const onTabSelect = (_, data) => {
		setSelectedValue(data.value);
	};

	return (
		<div>
			<div className={_styles.root}>
				<TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
					<Tab id='general-tab' value='general-tab'>
						General
					</Tab>
					<Tab id='parties-contract-tab' value='parties-contract-tab'>
						Parties and Contract
					</Tab>

					<Tab id='scope-and-duration-tab' value='scope-and-duration-tab'>
						Scope and Duration
					</Tab>

					<Tab id='commercial-tab' value='commercial-tab'>
						Commercial
					</Tab>

					{/* <Tab id='payment-tab' value='payment-tab'>
						Payment
					</Tab> */}
				</TabList>

				<div className={mergeClasses(_styles.panel, selectedValue !== 'general-tab' && _styles.hidden)}>
					<GeneralTab />
				</div>

				<div className={mergeClasses(_styles.panel, selectedValue !== 'parties-contract-tab' && _styles.hidden)}>
					<PartiesContractTab />
				</div>

				<div className={mergeClasses(_styles.panel, selectedValue !== 'scope-and-duration-tab' && _styles.hidden)}>
					<ScopeDurationTab />
				</div>

				<div className={mergeClasses(_styles.panel, selectedValue !== 'commercial-tab' && _styles.hidden)}>
					<CommercialTab />
				</div>
			</div>
		</div>
	);
};
