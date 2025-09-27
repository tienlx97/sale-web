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

export const ContractPage = () => {
	const _styles = useStyles();

	return (
		<div>
			<div className={_styles.root}>{/* 1 */}</div>
		</div>
	);
};
