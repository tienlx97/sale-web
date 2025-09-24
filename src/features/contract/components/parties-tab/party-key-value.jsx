import { AddIcon } from '@/coponents/icons/add-icon';
import { SubIcon } from '@/coponents/icons/sub-icon';
import { Button, Field, Input, makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
	sectionHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '0.5rem',
		marginBottom: '0.5rem'
	},
	rowFlex: {
		display: 'flex',
		alignItems: 'flex-end',
		gap: '0.5rem',
		flexWrap: 'wrap',
		'@media (max-width: 600px)': {
			flexDirection: 'column',
			alignItems: 'stretch'
		}
	},
	fieldKey: {
		flex: '0 1 200px', // prefer 200px, shrink if needed
		minWidth: 140,
		'@media (max-width: 600px)': {
			flex: '1 1 100%',
			minWidth: '100%'
		}
	},
	fieldValue: {
		flex: '1 1 300px', // take remaining space
		minWidth: 200,
		'@media (max-width: 600px)': {
			flex: '1 1 100%',
			minWidth: '100%'
		}
	},
	controlFull: { width: '100%' }
});

export const PartyKeyValue = ({
	title,
	value,
	onChange,
	disableAppend,
	newRowTemplate = { key: '', value: '' },
	styles = {
		key: 3,
		value: 7
	}
}) => {
	const _styles = useStyles();

	const addField = () => {
		const id = self.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
		onChange([...value, { id, ...newRowTemplate }]);
	};

	const removeField = id => {
		onChange(value.filter(f => f.id !== id));
	};

	const editField = (id, field, newVal) => {
		onChange(value.map(f => (f.id === id ? { ...f, [field]: newVal } : f)));
	};

	return (
		<div>
			<div className={_styles.sectionHeader}>
				<Text size={400} weight='semibold'>
					{title}
				</Text>
				{!disableAppend && (
					<Button size='small' appearance='transparent' shape='rounded' onClick={addField} icon={<AddIcon />} aria-label='Add row' />
				)}
			</div>

			{value.map(item => (
				<div key={item.id} className={_styles.rowFlex}>
					<Field className={_styles.fieldKey} label='Key' size='small' style={{ flex: styles.key }}>
						<Input
							className={_styles.controlFull}
							size='small'
							value={item.key}
							onChange={(_, data) => editField(item.id, 'key', data.value)}
						/>
					</Field>

					<Field className={_styles.fieldValue} label='Value' size='small' style={{ flex: styles.value }}>
						<Input
							className={_styles.controlFull}
							size='small'
							value={item.value}
							onChange={(_, data) => editField(item.id, 'value', data.value)}
						/>
					</Field>

					{!disableAppend && (
						<Button
							size='small'
							appearance='transparent'
							shape='rounded'
							onClick={() => removeField(item.id)}
							aria-label='Remove row'
							icon={<SubIcon />}
						/>
					)}
				</div>
			))}
		</div>
	);
};
