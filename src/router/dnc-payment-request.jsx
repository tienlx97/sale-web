/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */

import { makeStyles } from '@fluentui/react-components';
import { useContract } from '@/features/dnc-contract/providers/contract-provider';

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

	const onSubmit = _e => {};

	return (
		<form onSubmit={onSubmit}>
			<div className={_styles.root}>
				<div className={_styles.columnGap}>{/*  */}</div>
			</div>
		</form>
	);
};
