import { DateComp } from '@/coponents/date-comp';
import { Input, Card, makeStyles, Field, Text } from '@fluentui/react-components';
import { useState } from 'react';

const useStyles = makeStyles({
	rowFlex: {
		display: 'flex',
		alignItems: 'flex-end',
		gap: '1rem'
	}
});

export const DateTab = () => {
	const _styles = useStyles();

	const [signDate, setSignDate] = useState(new Date());
	const [signDateText, setSignDateText] = useState('');

	const [quotationDate, setQuotationDate] = useState(new Date());
	const [quotationDateText, setQuotationDateText] = useState('');

	return (
		<div>
			<Card>
				<Text weight='semibold' size={400}>
					SIGNED DATE
				</Text>
				<div className={_styles.rowFlex}>
					<Field style={{ width: '30%' }} label='Date' size='small'>
						<DateComp type='long' value={signDate} onChange={setSignDate} />
					</Field>
					<Field style={{ width: '70%' }} label='Text' size='small'>
						<Input
							placeholder='Ex: 18th September 2025'
							size='small'
							value={signDateText}
							onChange={(_, data) => setSignDateText(data.value)}
						/>
					</Field>
				</div>
			</Card>

			<br />

			<Card>
				<Text weight='semibold' size={400}>
					QUOTATION DATE
				</Text>
				<div className={_styles.rowFlex}>
					<Field style={{ width: '30%' }} label='Date' size='small'>
						<DateComp type='dd/mm/yyyy' value={quotationDate} onChange={setQuotationDate} />
					</Field>
					<Field style={{ width: '70%' }} label='Text' size='small'>
						<Input
							placeholder='Ex: 18th September 2025'
							size='small'
							value={quotationDateText}
							onChange={(_, data) => setQuotationDateText(data.value)}
						/>
					</Field>
				</div>
			</Card>

			{/* For debug */}
			{/* <pre>{JSON.stringify({ signDate, signDateText }, null, 2)}</pre> */}
		</div>
	);
};
