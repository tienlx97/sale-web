import { makeStyles } from '@fluentui/react-components';
import { GeneralTab } from '@/features/dnc-contract/components/v2/general-tab';
import { InfoTab } from '@/features/dnc-contract/components/v2/info-tab';
import { PartiesTab } from '@/features/dnc-contract/components/v2/parties-tab';
import { ScopeDurationTab } from '@/features/dnc-contract/components/v2/scope-duration-tab';
import { GeneralTabProvider } from '@/features/dnc-contract/providers/general-tab-provider';
import { InfoTabProvider } from '@/features/dnc-contract/providers/info-tab-provider';
import { PartiesTabProvider } from '@/features/dnc-contract/providers/parties-tab-provider';
import { ScopeDurationTabProvider } from '@/features/dnc-contract/providers/scope-duration-tab-provider';

const useStyles = makeStyles({
	root: {
		maxWidth: '800px',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
		margin: 'auto'
	}
});

export const ContractV2 = () => {
	const _styles = useStyles();

	return (
		<div className={_styles.root}>
			<GeneralTabProvider>
				<InfoTabProvider>
					<PartiesTabProvider>
						<ScopeDurationTabProvider>
							<GeneralTab />
							<InfoTab />
							<PartiesTab />
							<ScopeDurationTab />
						</ScopeDurationTabProvider>
					</PartiesTabProvider>
				</InfoTabProvider>
			</GeneralTabProvider>
		</div>
	);
};
