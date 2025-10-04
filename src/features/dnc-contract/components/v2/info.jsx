import { Card, Field, Input, makeStyles } from '@fluentui/react-components';
import { useInfoTab } from '../../hooks/use-info-tab';

const useStyles = makeStyles({
	sectionHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' },

	fixWrapper: {
		display: 'flex',
		flexDirection: 'column',
		gap: '.5rem'
	}
});

export const Info = () => {
	const _s = useStyles();

	const { info, setField } = useInfoTab();

	return (
		<Card>
			<div className={_s.fixWrapper}>
				<Field label={info.no.key} size='small'>
					<Input placeholder='ex: 25KCT28' size='small' value={info.no.value} onChange={(_, data) => setField('no', data.value)} />
				</Field>

				<Field label={info.project.key} size='small'>
					<Input placeholder='ex: ' size='small' value={info.project.value} onChange={(_, data) => setField('project', data.value)} />
				</Field>

				<Field label={info.item.key} size='small'>
					<Input size='small' value={info.item.value} onChange={(_, data) => setField('item', data.value)} />
				</Field>

				<Field label={info.location.key} size='small'>
					<Input size='small' value={info.location.value} onChange={(_, data) => setField('location', data.value)} />
				</Field>
			</div>
		</Card>
	);
};
