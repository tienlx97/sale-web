import { Link, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
	root: {
		margin: '1rem',
		display: 'flex',
		flexDirection: 'column',
		fontSize: '18px',
		gap: '1rem',
		fontWeight: 600
	}
});

export const HomePage = () => {
	const _styles = useStyles();

	return (
		<div className={_styles.root}>
			<Link target='_blank' href='http://dnc-log-2025:4000/contract.v2'>
				/Contract
			</Link>

			<Link target='_blank' href='http://dnc-log-2025:4000/payment-request'>
				/Payment Request
			</Link>
		</div>
	);
};
