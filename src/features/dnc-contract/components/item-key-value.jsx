import { Button, Checkbox, Divider, Field, Input, makeStyles, Switch, Text, Textarea } from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motion-components-preview';
import { useState } from 'react';
import { AddIcon } from '@/coponents/icons/add-icon';
import { SubIcon } from '@/coponents/icons/sub-icon';

const useStyles = makeStyles({
	sectionHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' },
	rowFlex: {
		display: 'flex',
		alignItems: 'flex-start',
		gap: '0.5rem',
		flexWrap: 'wrap',
		'@media (max-width: 600px)': { flexDirection: 'column', alignItems: 'stretch' }
	},
	fieldKey: {
		flex: '0 1 200px',
		minWidth: 140,
		'@media (max-width: 600px)': { flex: '1 1 100%', minWidth: '100%' }
	},
	fieldValue: {
		flex: '1 1 300px',
		minWidth: 200,
		'@media (max-width: 600px)': { flex: '1 1 100%', minWidth: '100%' }
	},
	controlFull: { width: '100%' },
	markupRow: {
		display: 'flex',
		alignItems: 'center',
		gap: '0.5rem',
		flexWrap: 'wrap',
		marginInlineStart: '0.5rem',
		marginBottom: '0.5rem'
	},
	rowToolbar: {
		display: 'flex',
		alignItems: 'center',
		gap: '0.25rem'
	}
});

const randomId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

export const ItemKeyValue = ({
	title,
	titleSize = 'regular',
	value,
	onChange,
	disableAppend,
	newRowTemplate = {
		key: '',
		value: '',
		canDelete: true,
		multiline: false,
		markup: { boldKey: false, boldValue: false, caplockValue: false }
	},
	styles = { key: 3, value: 7 }
}) => {
	const _styles = useStyles();

	// Mở/đóng Markup theo từng item.id
	const [openMap, setOpenMap] = useState({});

	const withMarkupDefaults = item => ({
		...item,
		multiline: item.multiline ?? false,
		markup: { boldKey: false, boldValue: false, caplockValue: false, ...(item.markup ?? {}) }
	});

	const addField = () => {
		const id = randomId();
		onChange([...value, { id, ...newRowTemplate }]);
		setOpenMap(m => ({ ...m, [id]: true })); // mở luôn phần Markup cho row mới
	};

	const removeField = id => {
		onChange(value.filter(f => f.id !== id));
		setOpenMap(({ [id]: _, ...rest }) => rest);
	};

	const editField = (id, field, newVal) => {
		onChange(value.map(f => (f.id === id ? { ...f, [field]: newVal } : f)));
	};

	const editMarkup = (id, key, checked) => {
		onChange(value.map(f => (f.id === id ? { ...f, markup: { ...(f.markup ?? {}), [key]: !!checked } } : f)));
	};

	const toggleOpen = (id, next) => {
		setOpenMap(m => ({ ...m, [id]: next ?? !m[id] }));
	};

	const editFlag = (id, flagKey, newVal) => {
		onChange(value.map(f => (f.id === id ? { ...f, [flagKey]: newVal } : f)));
	};

	return (
		<div>
			<div className={_styles.sectionHeader}>
				<Text size={titleSize === 'regular' ? 400 : 500} weight={titleSize === 'regular' ? 'semibold' : 'bold'}>
					{title}
				</Text>
				<div className={_styles.rowToolbar}>
					{!disableAppend && (
						<Button size='small' appearance='transparent' shape='rounded' onClick={addField} icon={<AddIcon />} aria-label='Add row' />
					)}
				</div>
			</div>

			{value.map(rawItem => {
				const item = withMarkupDefaults(rawItem);
				const keyStyle = { fontWeight: item.markup.boldKey ? 600 : 400 };
				const _valueStyle = {
					fontWeight: item.markup.boldValue ? 600 : 400,
					textTransform: item.markup.caplockValue ? 'uppercase' : 'none'
				};
				const isOpen = !!openMap[item.id];
				const collapseId = `markup-${item.id}`;

				return (
					<div key={item.id} className={_styles.rowFlex}>
						<Field className={_styles.fieldKey} label='Key' size='small' style={{ flex: styles.key }}>
							<Input
								className={_styles.controlFull}
								size='small'
								value={item.key}
								style={keyStyle}
								onChange={(_, data) => editField(item.id, 'key', data.value)}
							/>
						</Field>

						<Field className={_styles.fieldValue} label='Value' size='small' style={{ flex: styles.value }}>
							{item.multiline ? (
								<Textarea
									className={_styles.controlFull}
									resize='vertical' // cho phép kéo cao
									rows={3} // mặc định 3 dòng
									value={item.value}
									placeholder={rawItem?.placeholder}
									onChange={(_, data) => editField(item.id, 'value', data.value)}
									style={{
										fontWeight: item.markup.boldValue ? 600 : 400,
										textTransform: item.markup.caplock ? 'uppercase' : 'none'
									}}
								/>
							) : (
								<Input
									className={_styles.controlFull}
									size='small'
									placeholder={rawItem?.placeholder}
									value={item.value}
									onChange={(_, data) => editField(item.id, 'value', data.value)}
									style={{
										fontWeight: item.markup.boldValue ? 600 : 400,
										textTransform: item.markup.caplock ? 'uppercase' : 'none'
									}}
								/>
							)}
						</Field>

						<div className={_styles.rowToolbar}>
							<Switch checked={isOpen} onChange={(_, data) => toggleOpen(item.id, data.checked)} aria-controls={collapseId} />
							{!disableAppend && item.canDelete && (
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

						<Collapse visible={isOpen} id={collapseId}>
							<div className={_styles.markupRow}>
								<Checkbox
									label='Bold key'
									checked={!!item.markup.boldKey}
									onChange={(_, data) => editMarkup(item.id, 'boldKey', data.checked)}
								/>
								<Checkbox
									label='Bold value'
									checked={!!item.markup.boldValue}
									onChange={(_, data) => editMarkup(item.id, 'boldValue', data.checked)}
								/>
								<Checkbox
									label='Caplock Value'
									checked={!!item.markup.caplockValue}
									onChange={(_, data) => editMarkup(item.id, 'caplockValue', data.checked)}
								/>
								<Checkbox
									label='Multiline value' // 👈 thêm
									checked={!!item.multiline}
									onChange={(_, data) => editFlag(item.id, 'multiline', !!data.checked)}
								/>
							</div>
						</Collapse>
						<Divider />
					</div>
				);
			})}
		</div>
	);
};
