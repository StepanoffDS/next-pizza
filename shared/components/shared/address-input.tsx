'use client';

import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
	onChange?: (value?: string) => void;
}

export const AddressInput = ({ onChange }: Props) => {
	return (
		<AddressSuggestions
			token='937d0ad7606ce12e11118535f824a4bdf84ff1a4'
			onChange={(data) => onChange?.(data?.value)}
		/>
	);
};
