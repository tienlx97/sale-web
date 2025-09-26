// useNumericField.js
import { useEffect, useState } from 'react';

const stripNum = s => String(s ?? '').replace(/[\s,]/g, '');
const group = x => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const fromNumberToDisplay = n => {
	if (n == null) return '';
	const s = String(n);
	const [i, d] = s.split('.');
	return d != null ? `${group(i)}.${d}` : group(i);
};

export function useNumericField(value, onCommit, { integer = false } = {}) {
	const [display, setDisplay] = useState(fromNumberToDisplay(value));

	// Sync local display when prop changes (e.g., defaults)
	useEffect(() => {
		setDisplay(fromNumberToDisplay(value));
	}, [value]);

	const onChange = (_e, d) => {
		let v = d.value;

		// allow transitional states
		if (v === '' || v === '-' || v === '.' || v === '-.') {
			setDisplay(v);
			return;
		}

		// sanitize
		v = stripNum(v);
		if (integer) {
			v = v.replace(/[^\d-]/g, '');
		} else {
			// single minus & single dot
			v = v.replace(/(?!^)-/g, '');
			const i = v.indexOf('.');
			if (i !== -1) v = v.slice(0, i + 1) + v.slice(i + 1).replace(/\./g, '');
		}

		// pretty display
		const [I, D = ''] = v.split('.');
		const sign = I.startsWith('-') ? '-' : '';
		const ii = I.replace('-', '').replace(/^0+(?=\d)/, '') || '0';

		setDisplay(sign + group(ii) + (integer ? '' : v.includes('.') ? `.${D}` : D ? `.${D}` : ''));
	};

	const onBlur = ev => {
		const raw = stripNum(ev.currentTarget.value);

		if (!raw || raw === '-' || raw === '.' || raw === '-.') {
			setDisplay('');
			onCommit(null);
			return;
		}

		const n = Number(integer ? raw.replace(/\./g, '') : raw);
		const committed = Number.isFinite(n) ? n : null;

		onCommit(committed);
		setDisplay(fromNumberToDisplay(committed));
	};

	return { display, onChange, onBlur };
}
