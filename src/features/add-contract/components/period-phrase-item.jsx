import { Field, Input, makeStyles, Text, Textarea } from '@fluentui/react-components';
import { useEditContext } from '../../../providers/edit-provider';

const useStyles = makeStyles({
	rowFlex: {
		display: 'flex',
		alignItems: 'flex-start',
		gap: '0.5rem',
		flexDirection: 'row'
	},

	colFlex: {
		display: 'flex',
		alignItems: 'flex-start',
		gap: '0.5rem',
		flexDirection: 'column'
	},

	full: {
		width: '100%'
	}
});

export const PeriodPhraseItem = ({ phrase, values, onChange }) => {
	const _styles = useStyles();

	const { editMode } = useEditContext();

	return (
		<div className={_styles.root}>
			<Text size={400} weight='semibold'>
				__{phrase}__
			</Text>
			<div className={_styles.colFlex}>
				<div className={_styles.rowFlex}>
					<Field label='Number' size='small'>
						<Input value={values.num} placeholder='2' size='small' onChange={(_, d) => onChange({ ...values, num: d.value })} />
					</Field>

					<Field label='Type' size='small'>
						<Input value={values.type} placeholder='weeks' size='small' onChange={(_, d) => onChange({ ...values, type: d.value })} />
					</Field>
				</div>
				<Field className={_styles.full} label='Format' size='small'>
					<Textarea disabled={!editMode} onChange={(_, d) => onChange({ ...values, format: d.value })} value={values.format} />
				</Field>
			</div>
		</div>
	);
};
