'use client';

import React from 'react';
import { AddressInput, ErrorText, FormTextarea, Input, WhiteBlock } from '../..';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
	className?: string;
}

export const CheckoutAddressForm = ({ className }: Props) => {
	const { control } = useFormContext();

	return (
		<WhiteBlock title='3. Адрес доставки'>
			<div className='grid gap-5'>
				<Controller
					name='address'
					render={({ field, fieldState }) => (
						<div>
							<AddressInput onChange={field.onChange} />
							{fieldState.error?.message && (
								<ErrorText text={fieldState.error.message} className='mt-2' />
							)}
						</div>
					)}
				/>

				<FormTextarea
					name='comment'
					className='text-base'
					placeholder='Комментарий к заказу'
					rows={5}
				/>
			</div>
		</WhiteBlock>
	);
};
