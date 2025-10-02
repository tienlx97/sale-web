import { makeStyles } from '@fluentui/react-components';
import { DownloadTab } from '@/features/payment-request/components/download-tab';
import { PaymentRequestComp } from '@/features/payment-request/components/payment-request-comp';
import { PaymentRequestProvider } from '@/features/payment-request/providers/payment-request-provider';

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

export const PaymentRequestPage = () => {
	const _styles = useStyles();

	return (
		<div className={_styles.root}>
			<PaymentRequestProvider>
				{/*  */}
				<DownloadTab />
				<PaymentRequestComp />
			</PaymentRequestProvider>
		</div>
	);
};
