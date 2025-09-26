import { DatePicker } from '@fluentui/react-datepicker-compat';
import { useCallback, useMemo, useRef } from 'react';

export const DateComp = ({
	value, // Date | null
	onChange, // (d: Date | null) => void
	type = 'long',
	placeholder,
	size = 'small',
	onTextChange
}) => {
	const datePickerRef = useRef(null);

	const onParseDateFromString = useCallback(
		newValue => {
			const previousValue = value ?? new Date();
			const parts = (newValue || '').trim().split('/');
			const day = parts.length > 0 ? Math.max(1, Math.min(31, parseInt(parts[0], 10))) : previousValue.getDate();
			const month = parts.length > 1 ? Math.max(1, Math.min(12, parseInt(parts[1], 10))) - 1 : previousValue.getMonth();
			let year = parts.length > 2 ? parseInt(parts[2], 10) : previousValue.getFullYear();
			if (year < 100) year += previousValue.getFullYear() - (previousValue.getFullYear() % 100);
			return new Date(year, month, day);
		},
		[value]
	);

	const getDaySuffix = day => {
		if (day % 10 === 1 && day !== 11) return 'st';
		if (day % 10 === 2 && day !== 12) return 'nd';
		if (day % 10 === 3 && day !== 13) return 'rd';
		return 'th';
	};

	const onFormatDate = date => {
		if (!date) return '';
		if (type === 'dd/mm/yyyy') {
			const d = String(date.getDate()).padStart(2, '0');
			const m = String(date.getMonth() + 1).padStart(2, '0');
			const y = date.getFullYear();
			return `${d}/${m}/${y}`;
		}
		const day = date.getDate();
		const month = date.toLocaleString('en-US', { month: 'long' });
		const year = date.getFullYear();
		return `${day}${getDaySuffix(day)} ${month} ${year}`; // "18th September 2025"
	};

	const makeDateText = date => {
		if (!date) return '';
		const day = date.getDate();
		const month = date.toLocaleString('en-US', { month: 'long' });
		const year = date.getFullYear();
		return `${day}${getDaySuffix(day)} ${month} ${year}`;
	};

	const ph = useMemo(() => placeholder ?? (type === 'dd/mm/yyyy' ? 'Ex: 18/09/2025' : 'Ex: 18th September 2025'), [placeholder, type]);

	return (
		<DatePicker
			size={size}
			placeholder={ph}
			ref={datePickerRef}
			allowTextInput
			value={value ?? null} // ✅ luôn Date | null, KHÔNG dùng undefined
			onSelectDate={d => {
				onChange(d ?? null);
				if (onTextChange) onTextChange(makeDateText(d ?? null));
			}}
			formatDate={onFormatDate}
			parseDateFromString={onParseDateFromString}
		/>
	);
};
