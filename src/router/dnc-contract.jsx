/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import { sendContract } from '@/api/contract';
import { CommercialTab } from '@/features/dnc-contract/components/commercial-tab';
import { GeneralTab } from '@/features/dnc-contract/components/general-tab';
import { InfoTab } from '@/features/dnc-contract/components/info-tab';
import { PartiesTab } from '@/features/dnc-contract/components/parties-tab';
import { PaymentsTab } from '@/features/dnc-contract/components/payments-tab';
import { ScopeDurationTab } from '@/features/dnc-contract/components/scope-duration-tab';
import { useContract } from '@/features/dnc-contract/providers/contract-provider';
import { TabList } from '@fluentui/react-components';
import { Tab } from '@fluentui/react-components';
import { Text } from '@fluentui/react-components';
import { mergeClasses } from '@fluentui/react-components';
import { Button } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const useStyles = makeStyles({
	root: {
		maxWidth: '800px',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
		margin: 'auto'
	},
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
	},
	hidden: { display: 'none' }
});

export const DNCContractPage = () => {
	const _styles = useStyles();

	const { state } = useContract();

	const saveMutation = useMutation({
		// biome-ignore lint/suspicious/useAwait: <explanation>
		mutationFn: async () => {
			// If server expects a specific DTO, adapt here
			// e.g. const payload = mapToServerDTO(state);
			const payload = state;
			return sendContract(payload);
		}
	});

	const onSubmit = e => {
		e.preventDefault();
		// simple client-side sanity check (optional)
		// if (!state.info?.project?.value) { ...show warning...; return; }
		saveMutation.mutate();
	};

	const [selectedValue, setSelectedValue] = useState('GeneralTab');

	const onTabSelect = (_, data) => {
		setSelectedValue(data.value);
	};

	return (
		<form onSubmit={onSubmit}>
			<div className={_styles.root}>
				<div className={_styles.columnGap}>
					<TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
						<Tab id='GeneralTab' value='GeneralTab'>
							General
						</Tab>
						<Tab id='PartiesTab' value='PartiesTab'>
							Parties
						</Tab>

						<Tab id='InfoTab' value='InfoTab'>
							Info
						</Tab>

						<Tab id='ScopeDurationTab' value='ScopeDurationTab'>
							Scope
						</Tab>

						<Tab id='CommercialTab' value='CommercialTab'>
							Commercial
						</Tab>

						<Tab id='PaymentsTab' value='PaymentsTab'>
							Payments
						</Tab>
					</TabList>

					{/* Footer actions */}
					<div className={_styles.footerRow}>
						<Button appearance='primary' type='submit' disabled={saveMutation.isPending}>
							{saveMutation.isPending ? 'Sending…' : 'Send to server'}
						</Button>
					</div>

					{/* Status messages (compact) */}
					{saveMutation.isSuccess && (
						<Text role='status' style={{ color: 'green' }}>
							Contract saved successfully.
						</Text>
					)}
					{saveMutation.isError && (
						<Text role='alert' style={{ color: 'crimson' }}>
							{saveMutation.error?.message || 'Failed to save contract.'}
						</Text>
					)}

					<div className={mergeClasses(_styles.columnGap, selectedValue !== 'GeneralTab' && _styles.hidden)}>
						<GeneralTab />
					</div>

					<div className={mergeClasses(_styles.columnGap, selectedValue !== 'InfoTab' && _styles.hidden)}>
						<InfoTab />
					</div>

					<div className={mergeClasses(_styles.columnGap, selectedValue !== 'PartiesTab' && _styles.hidden)}>
						<PartiesTab />
					</div>

					<div className={mergeClasses(_styles.columnGap, selectedValue !== 'ScopeDurationTab' && _styles.hidden)}>
						<ScopeDurationTab />
					</div>
					<div className={mergeClasses(_styles.columnGap, selectedValue !== 'CommercialTab' && _styles.hidden)}>
						<CommercialTab />
					</div>
					<div className={mergeClasses(_styles.columnGap, selectedValue !== 'PaymentsTab' && _styles.hidden)}>
						<PaymentsTab />
					</div>
				</div>
			</div>
		</form>
	);
};
