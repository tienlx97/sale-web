import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
	rowFlex: {
		display: 'flex',
		alignItems: 'flex-start',
		gap: '0.75rem',
		flexWrap: 'wrap'
	},
	column: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem'
	},
	headerRow: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '0.5rem',
		marginBottom: '0.25rem'
	},
	full: { width: '100%' }
});
