/**
 * Tiny controlled-input helper that lets users TYPE numbers with thousand separators
 * (e.g., "1,234.56") while your app/store always receives a clean Number (1234.56)
 * when the field loses focus (onBlur). During typing, we keep a "display" string
 * so the caret feels natural and the user can enter transitional states like "-" or ".".
 */

import { useEffect, useState } from 'react';

/** Remove spaces and grouping commas from a string (keep digits, dot, minus). */
const stripNum = s => String(s ?? '').replace(/[\s,]/g, '');

/** Add thousands separators to the integer part of a numeric string. */
const group = x => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
 * Convert a Number (or null) to a grouped display string.
 * - 1234.5  -> "1,234.5"
 * - 1234    -> "1,234"
 * - null    -> ""
 *
 * Note: This function is intentionally simple; it preserves the existing
 * decimal digits without forcing a fixed precision. Use your own pretty
 * printer at export time if you need "1,234.50".
 */
const fromNumberToDisplay = n => {
	if (n == null) return '';
	const s = String(n);
	const [i, d] = s.split('.');
	return d != null ? `${group(i)}.${d}` : group(i);
};

/**
 * useNumericField
 * ----------------
 * A controlled field hook that:
 *  - Shows a grouped "display" string while typing (e.g., "12,345.67").
 *  - Allows transitional states ("", "-", ".", "-.") so the caret doesn't jump.
 *  - On blur, parses and commits a clean Number (or null) to your store via `onCommit`.
 *
 * @param {number|null} value     Canonical numeric value from your store (null if empty)
 * @param {(n: number|null) => void} onCommit  Called on blur with parsed number or null
 * @param {{ integer?: boolean }} [options]    Set { integer: true } to disallow decimals
 *
 * Return shape:
 *  - display: string  (bind to <Input value>)
 *  - onChange: (e, d) -> void (bind to <Input onChange>)
 *  - onBlur: (e) -> void      (bind to <Input onBlur>)
 *
 * Usage:
 *  const amount = useNumericField(state.amount, n => setState({ amount: n }));
 *  <Input value={amount.display} onChange={amount.onChange} onBlur={amount.onBlur} />
 */
export function useNumericField(value, onCommit, { integer = false } = {}) {
	// Local "display" mirrors the grouped text the user sees while typing.
	const [display, setDisplay] = useState(fromNumberToDisplay(value));

	// Keep the display in sync if the canonical value changes from the outside
	// (e.g., defaults loaded, server patch, undo, etc.).
	useEffect(() => {
		setDisplay(fromNumberToDisplay(value));
	}, [value]);

	/**
	 * onChange: handle keystrokes without committing to the store.
	 * We sanitize the raw keystrokes and rebuild a grouped display string,
	 * but we do NOT call onCommit here. That avoids flicker and preserves caret.
	 */
	const onChange = (_e, d) => {
		let v = d.value;

		/**
		 * Allow transitional states so users can type naturally
		 * Examples: "-", ".", "-." (before they finish the number).
		 */
		if (v === '' || v === '-' || v === '.' || v === '-.') {
			setDisplay(v);
			return;
		}

		// 1) Sanitize: remove spaces/commas. Then,
		//    - integer mode: drop anything that's not digit or leading minus
		//    - decimal mode: allow a single leading minus and only one dot
		v = stripNum(v);
		if (integer) {
			v = v.replace(/[^\d-]/g, '');
		} else {
			// keep only the first leading minus
			v = v.replace(/(?!^)-/g, '');
			// keep only the first dot
			const i = v.indexOf('.');
			if (i !== -1) v = v.slice(0, i + 1) + v.slice(i + 1).replace(/\./g, '');
		}

		// 2) Pretty display: group integer part but keep user's decimal typing intact.
		const [I, D = ''] = v.split('.');
		const sign = I.startsWith('-') ? '-' : '';
		// remove minus for grouping, strip leading zeros (but keep a single 0)
		const ii = I.replace('-', '').replace(/^0+(?=\d)/, '') || '0';

		setDisplay(sign + group(ii) + (integer ? '' : v.includes('.') ? `.${D}` : D ? `.${D}` : ''));
	};

	/**
	 * onBlur: commit time.
	 * Parse the current display into a Number (or null if empty/invalid),
	 * call onCommit so the parent/store updates, and then re-sync display
	 * from the committed value (this normalizes any quirky input).
	 */
	const onBlur = ev => {
		const raw = stripNum(ev.currentTarget.value);

		// Empty / transitional -> clear the field and store null
		if (!raw || raw === '-' || raw === '.' || raw === '-.') {
			setDisplay('');
			onCommit(null);
			return;
		}

		// Parse number (strip grouping). In integer mode, ignore any dots.
		const n = Number(integer ? raw.replace(/\./g, '') : raw);
		const committed = Number.isFinite(n) ? n : null;

		onCommit(committed);
		setDisplay(fromNumberToDisplay(committed)); // normalize display (e.g., remove extra zeros)
	};

	return { display, onChange, onBlur };
}
