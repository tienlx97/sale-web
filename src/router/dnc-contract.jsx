import { PartyKeyValue } from '@/features/dnc-contract/components/party-key-value';
import { useContract } from '@/features/dnc-contract/providers/contract-provider';
import { kvToPartyBlock, partyBlockToKV } from '@/features/dnc-contract/store/party-adapter';
import { Text, Field, makeStyles, Card, Input } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { useMemo } from 'react';

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
	}
});

// ------- small date helpers (ISO <-> Date; parse typed input) -------
const dateToISO = d => (d ? new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10) : '');

const isoToDate = iso => (iso ? new Date(`${iso}T00:00:00`) : null);

// accept `dd/MM/yyyy` or `yyyy-MM-dd`
const parseHumanDate = s => {
	if (!s) return undefined;
	const t = s.trim();
	// yyyy-MM-dd
	if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
		const [y, m, d] = t.split('-').map(Number);
		const dt = new Date(y, m - 1, d);
		return Number.isFinite(dt.getTime()) ? dt : undefined;
	}
	// dd/MM/yyyy
	if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(t)) {
		const [d, m, y] = t.split('/').map(Number);
		const dt = new Date(y, m - 1, d);
		return Number.isFinite(dt.getTime()) ? dt : undefined;
	}
	return undefined;
};

export const DNCContractPage = () => {
	const _styles = useStyles();
	const { state, patch } = useContract();

	// Controlled values from store
	const headerPath = state.headerImagePath ?? '';
	const signedISO = state.signDate; // "YYYY-MM-DD"
	const quoteISO = state.quotationDate; // "YYYY-MM-DD"

	const signedDate = isoToDate(signedISO);
	const quoteDate = isoToDate(quoteISO);

	const rowsA = useMemo(() => partyBlockToKV('A', state.parties.A), [state.parties.A]);
	const rowsB = useMemo(() => partyBlockToKV('B', state.parties.B), [state.parties.B]);

	console.log({ parties: state.parties });

	return (
		<div>
			<div className={_styles.root}>
				<div className={_styles.columnGap}>
					<Card>
						<Text weight='semibold' size={400}>
							GENERAL
						</Text>

						<div className={_styles.rowFlex}>
							<Field style={{ width: '100%' }} label='Header path' size='small'>
								<Input
									size='small'
									value={headerPath}
									onChange={(_, d) => {
										patch(draft => {
											draft.headerImagePath = d.value;
										});
									}}
								/>
							</Field>
						</div>

						<div className={_styles.rowFlex}>
							<Field style={{ width: '50%' }} label='Signed date' size='small'>
								<DatePicker
									// v8 compat accepts `value` (or `selectedDate` in some setups). If TS complains, use `value` → `selectedDate`.
									value={signedDate}
									selectedDate={signedDate}
									allowTextInput
									size='small'
									onSelectDate={d => {
										patch(draft => {
											draft.signDate = dateToISO(d ?? undefined);
										});
									}}
									onChange={(_, data) => {
										const typed = parseHumanDate(data.value);
										if (typed) {
											patch(draft => {
												draft.signDate = dateToISO(typed);
											});
										}
									}}
								/>
							</Field>

							<Field style={{ width: '50%' }} label='Quotation date' size='small'>
								<DatePicker
									value={quoteDate}
									allowTextInput
									size='small'
									onSelectDate={d => {
										patch(draft => {
											draft.quotationDate = dateToISO(d ?? undefined);
										});
									}}
									selectedDate={quoteDate}
									onChange={(_, data) => {
										const typed = parseHumanDate(data.value);
										if (typed) {
											patch(draft => {
												draft.quotationDate = dateToISO(typed);
											});
										}
									}}
								/>
							</Field>
						</div>
					</Card>

					<Card>
						<Text weight='semibold' size={400}>
							PARTIES
						</Text>

						<Card>
							<PartyKeyValue
								title='A'
								value={rowsA}
								onChange={nextRows =>
									patch(d => {
										d.parties.A = kvToPartyBlock('A', nextRows, d.parties.A);
									})
								}
								// prevent deleting fixed rows
								disableAppend={false}
								// optional: set widths
								styles={{ key: 3, value: 7 }}
							/>
						</Card>

						<Card>
							<PartyKeyValue
								title='B'
								value={rowsB}
								onChange={nextRows =>
									patch(d => {
										d.parties.B = kvToPartyBlock('B', nextRows, d.parties.B);
									})
								}
								disableAppend={false}
								styles={{ key: 3, value: 7 }}
							/>
						</Card>
					</Card>
				</div>
			</div>
		</div>
	);
};
