import { useReducer } from 'react';
import { PaymentRequestContext } from '../contexts/payment-request-context';

const initialPaymentRequest = {
	signDate: undefined,
	contractSignedDate: undefined,
	payment: {
		num: 1,
		value: 0
	},
	no: '',
	contractNo: '',
	proformaInvoiceNo: '',
	company: '',
	address: '',
	bank: {
		beneficiary: {
			key: 'Beneficiary',
			value: 'DAI NGHIA INDUSTRIAL MECHANICS CO., LTD'
		},
		accountNo: {
			key: 'Bank account No.',
			value: '1032407684'
		},
		bankName: {
			key: 'Bank',
			value: 'Joint Stock Commercial Bank for Foreign Trade of Viet Nam'
		},
		branch: {
			key: 'Branch',
			value: 'Tan Binh'
		},
		address: {
			key: 'Address',
			value: '108 Tay Thanh Street, Tay Thanh Ward, Ho Chi Minh City, Vietnam'
		},
		swift: {
			key: 'SWIFT Code',
			value: 'BFTVVNVX044'
		}
	}
};

function paymentRequestReducer(state, action) {
	switch (action.type) {
		case 'SET_COMPANY':
			return { ...state, company: action.payload };

		case 'SET_ADDRESS':
			return { ...state, address: action.payload };

		case 'SET_SIGN_DATE':
			return { ...state, signDate: action.payload };

		case 'SET_CONTRACT_SIGNED_DATE':
			return { ...state, contractSignedDate: action.payload };

		case 'SET_CONTRACT_NO':
			return { ...state, contractNo: action.payload };

		case 'SET_PAYMENT_REQUEST_NO':
			return { ...state, no: action.payload };

		case 'SET_PROFORMA_INVOICE_NO':
			return { ...state, proformaInvoiceNo: action.payload };

		case 'SET_PAYMENT_NUM':
			return { ...state, payment: { ...state.payment, num: action.payload } };

		case 'SET_PAYMENT_VALUE':
			return { ...state, payment: { ...state.payment, value: action.payload } };

		case 'UPDATE_BANK_FIELD':
			// expects { field: 'branch' | 'swift' | 'accountNo' ... , value: string }
			return {
				...state,
				bank: {
					...state.bank,
					[action.payload.field]: {
						...state.bank[action.payload.field],
						value: action.payload.value
					}
				}
			};

		case 'RESET':
			return action.payload || state; // reset to given state

		default:
			return state;
	}
}

export const PaymentRequestProvider = ({ children }) => {
	const [state, dispatch] = useReducer(paymentRequestReducer, initialPaymentRequest);

	return <PaymentRequestContext.Provider value={{ paymentRequest: state, dispatch }}>{children}</PaymentRequestContext.Provider>;
};
