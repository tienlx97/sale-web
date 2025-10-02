import { Button } from '@fluentui/react-components';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { downloadPaymentRequest } from '@/api/contract';
import { PaymentRequestContext } from '../contexts/payment-request-context';

export const DownloadTab = () => {
	const { paymentRequest } = useContext(PaymentRequestContext);

	// Download DOCX/PDF from your server
	const downloadMutation = useMutation({
		mutationFn: async format => {
			const { blob, filename } = await downloadPaymentRequest(paymentRequest, format);

			// trigger browser download
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);
			return true;
		}
	});

	return (
		<div>
			<Button onClick={() => downloadMutation.mutate('docx')} disabled={downloadMutation.isPending}>
				{downloadMutation.isPending ? 'Preparing…' : 'Download DOCX'}
			</Button>
		</div>
	);
};
