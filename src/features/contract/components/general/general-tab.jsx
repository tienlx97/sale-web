import { Card, Field, Input, makeStyles, Text } from '@fluentui/react-components';
import { useState } from 'react';
import { DateComp } from '@/coponents/date-comp';

const useStyles = makeStyles({
	rowFlex: {
		display: 'flex',
		alignItems: 'flex-end',
		gap: '1rem'
	},
	columnGap: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem'
	}
});

export const GeneralTab = () => {
	const _styles = useStyles();

	const [signDate, setSignDate] = useState(null);
	const [signDateText, setSignDateText] = useState('');

	const [headerPath, setHeaderPath] = useState('assets/header/1/png');

	const [quotationDate, setQuotationDate] = useState(null);
	const [quotationDateText, setQuotationDateText] = useState('');

	return (
		<div className={_styles.columnGap}>
			<Card>
				<div className={_styles.rowFlex}>
					<Field style={{ width: '30%' }} label='Header path' size='small'>
						<Input size='small' value={headerPath} onChange={(_, data) => setHeaderPath(data.value)} />
					</Field>
				</div>
			</Card>

			<Card>
				<Text weight='semibold' size={400}>
					SIGNED DATE
				</Text>
				<div className={_styles.rowFlex}>
					<Field style={{ width: '30%' }} label='Date' size='small'>
						<DateComp type='long' value={signDate} onChange={setSignDate} onTextChange={setSignDateText} />
					</Field>
					<Field style={{ width: '70%' }} label='Text' size='small'>
						<Input placeholder='Ex: 18th September 2025' size='small' value={signDateText} disabled />
					</Field>
				</div>
			</Card>

			<Card>
				<Text weight='semibold' size={400}>
					QUOTATION DATE
				</Text>
				<div className={_styles.rowFlex}>
					<Field style={{ width: '30%' }} label='Date' size='small'>
						<DateComp type='dd/mm/yyyy' value={quotationDate} onTextChange={setQuotationDateText} onChange={setQuotationDate} />
					</Field>
					<Field style={{ width: '70%' }} label='Text' size='small'>
						<Input disabled size='small' value={quotationDateText} placeholder='Ex: 18th September 2025' />
					</Field>
				</div>
			</Card>
		</div>
	);
};
