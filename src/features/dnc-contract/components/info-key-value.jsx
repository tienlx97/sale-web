import { Checkbox, Field, Input, makeStyles, Switch, Textarea } from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motion-components-preview';
import * as React from 'react';

const useStyles = makeStyles({
	rowFlex: {
		display: 'flex',
		alignItems: 'flex-start',
		gap: '0.5rem',
		flexWrap: 'wrap',
		'@media (max-width: 600px)': { flexDirection: 'column', alignItems: 'stretch' }
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
	rowToolbar: { display: 'flex', alignItems: 'center', gap: '0.25rem' }
});

export const InfoKeyValue = ({ item, onChangeValue, onChangeMarkup, onToggleMultiline }) => {
	const _styles = useStyles();
	const [isOpen, setIsOpen] = React.useState(false);

	// normalize markup để hỗ trợ caplockValue cũ
	const caps = item.markup?.capsLockValue ?? item.markup?.caplockValue ?? false;
	const boldVal = !!item.markup?.boldValue;
	const boldKey = !!item.markup?.boldKey;

	const valueStyle = {
		fontWeight: boldVal ? 600 : 400,
		textTransform: caps ? 'uppercase' : 'none'
	};

	return (
		<div>
			<div className={_styles.rowFlex}>
				<Field
					className={_styles.fieldValue}
					label={item.key}
					size='small'
					// nếu muốn “Bold key” áp vào label, có thể để style label ngoài Field; ở đây giữ đơn giản
				>
					{item.multiline ? (
						<Textarea
							className={_styles.controlFull}
							resize='vertical'
							placeholder={item?.placeholder}
							rows={3}
							value={item.value}
							onChange={(_, d) => onChangeValue(d.value)}
							style={valueStyle}
						/>
					) : (
						<Input
							className={_styles.controlFull}
							size='small'
							placeholder={item?.placeholder}
							value={item.value}
							onChange={(_, d) => onChangeValue(d.value)}
							style={valueStyle}
						/>
					)}
				</Field>

				<div className={_styles.rowToolbar}>
					<Switch checked={isOpen} onChange={(_, data) => setIsOpen(data.checked)} />
				</div>

				<Collapse visible={isOpen}>
					<div className={_styles.markupRow}>
						<Checkbox label='Bold key' checked={boldKey} onChange={(_, data) => onChangeMarkup('boldKey', !!data.checked)} />
						<Checkbox label='Bold value' checked={boldVal} onChange={(_, data) => onChangeMarkup('boldValue', !!data.checked)} />
						<Checkbox label='CapsLock value' checked={caps} onChange={(_, data) => onChangeMarkup('capsLockValue', !!data.checked)} />
						<Checkbox label='Multiline value' checked={!!item.multiline} onChange={(_, data) => onToggleMultiline(!!data.checked)} />
					</div>
				</Collapse>
			</div>
		</div>
	);
};
