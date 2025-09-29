import { PartiesTab } from '@/features/dnc-contract/components/v2/parties-tab';
import { PartiesTabProvider } from '@/features/dnc-contract/providers/parties-tab-provider';
import { makeStyles } from '@fluentui/react-components';

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
			<PartiesTabProvider>
				<PartiesTab />
			</PartiesTabProvider>
		</div>
	);
};
