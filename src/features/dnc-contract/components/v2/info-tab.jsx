import { Card, makeStyles, Text } from '@fluentui/react-components';
import { Info } from './info';

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

export const InfoTab = () => {
	const _styles = useStyles();

	return (
		<Card className={_styles.columnGap}>
			<Text weight='bold' size={500}>
				INFO
			</Text>

			<Info />
		</Card>
	);
};
