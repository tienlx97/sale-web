import { Button } from '@fluentui/react-components';
import { useMutation } from '@tanstack/react-query';
import { downloadContract } from '@/api/contract';
import { useCommercial } from '../../hooks/use-commercial';
import { useGeneralTab } from '../../hooks/use-general-tab';
import { useInfoTab } from '../../hooks/use-info-tab';
import { usePartiesTab } from '../../hooks/use-parties-tab';
import { usePaymentTab } from '../../hooks/use-payment-tab';
import { useScopeDurationTab } from '../../hooks/use-scope-duration-tab';

export const DownloadTab = () => {
	const { state: commercial } = useCommercial();
	const { quotationDate, signedDate } = useGeneralTab();
	const { info } = useInfoTab();
	const { A, B } = usePartiesTab();
	const { state: paymentsState } = usePaymentTab();
	const { period } = useScopeDurationTab();

	// Download DOCX/PDF from your server
	const downloadMutation = useMutation({
		mutationFn: async format => {
			const { blob, filename } = await downloadContract(
				{
					headerImagePath: 'assets/header/1.png',
					signDate: signedDate,
					quotationDate,
					info,
					parties: {
						A,
						B
					},
					projectWorkScope: {
						item: {
							volOfWork: {
								key: '*. Volume of works',
								value:
									'As specified in Party B’s Quotation dated {{quotationDate}}, including the scope of quotation, the list of materials and applicable standards attached to this Contract, Party A’s architectural design drawings, and Party B’s steel structure design drawings as approved by Party A.'
							}
						}
					},
					periods: period,
					commercial,
					payments: paymentsState.payments,
					appendPayments: paymentsState.appendPayments
				},
				format
			);

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
