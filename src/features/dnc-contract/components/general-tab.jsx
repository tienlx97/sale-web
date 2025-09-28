import { makeStyles } from '@fluentui/react-components';
import { Card } from '@fluentui/react-components';
import { useContract } from '../providers/contract-provider';
import { Field } from '@fluentui/react-components';
import { Text } from '@fluentui/react-components';
import { Input } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
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

export const GeneralTab = () => {
	const _styles = useStyles();
	const { state, patch } = useContract();

	// Controlled values from store
	const headerPath = state.headerImagePath ?? '';
	const signedISO = state.signDate; // "YYYY-MM-DD"
	const quoteISO = state.quotationDate; // "YYYY-MM-DD"

	const signedDate = isoToDate(signedISO);
	const quoteDate = isoToDate(quoteISO);

	return (
		<Card className={_styles.columnGap}>
			<Text weight='bold' size={500}>
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
	);
};
