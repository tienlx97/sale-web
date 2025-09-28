import { makeStyles } from '@fluentui/react-components';
import { useContract } from '../providers/contract-provider';
import { Card } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components';

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

export const FormatTab = () => {
	const _styles = useStyles();
	const { state, patch } = useContract();

	return (
		<Card className={_styles.columnGap}>
			<Text weight='bold' size={500}>
				FORMAT
			</Text>

			<div className={_styles.rowFlex}>
				<Field style={{ width: '100%' }} label='Header path' size='small'>
					{/* <Input
						size='small'
						value={headerPath}
						onChange={(_, d) => {
							patch(draft => {
								draft.headerImagePath = d.value;
							});
						}}
					/> */}
				</Field>
			</div>
		</Card>
	);
};
