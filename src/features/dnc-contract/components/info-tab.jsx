import { Card, makeStyles } from '@fluentui/react-components';
import { useContract } from '../providers/contract-provider';
import { InfoKeyValue } from './info-key-value';

const useStyles = makeStyles({
	columnGap: { display: 'flex', flexDirection: 'column', gap: '1rem' }
});

// --- Small binding helper ----------------------------------------------------
function useInfoBinder() {
	const { state, patch } = useContract();

	const bind = name => {
		const item = state.info[name];

		const onChangeValue = next =>
			patch(d => {
				d.info[name].value = next;
			});

		const onChangeMarkup = (k, checked) =>
			patch(d => {
				// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
				const m = (d.info[name].markup ??= {});
				if (k === 'capsLockValue') {
					// keep backward compatibility with caplockValue
					m.capsLockValue = checked;
					m.caplockValue = checked;
				} else if (k === 'boldValue') {
					m.boldValue = checked;
				} else if (k === 'boldKey') {
					m.boldKey = checked;
				}
			});

		const onToggleMultiline = checked =>
			patch(d => {
				d.info[name].multiline = checked;
			});

		return { item, onChangeValue, onChangeMarkup, onToggleMultiline };
	};

	return { bind };
}

// --- Component ---------------------------------------------------------------
export const InfoTab = () => {
	const _styles = useStyles();
	const { bind } = useInfoBinder();

	// Declare the fields once; add more by name only
	const fields = ['no', 'project', 'item', 'location'];

	return (
		<Card className={_styles.columnGap}>
			{fields.map(name => {
				const props = bind(name);
				return <InfoKeyValue key={String(name)} {...props} />;
			})}
		</Card>
	);
};
