'use client';

import { createOrder} from '@/app/actions';
import { prisma } from '@/prisma/prisma-client';
import {
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalForm,
	CheckoutSidebar,
	Container,
	Title,
} from '@/shared/components';
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants';

import { useCart } from '@/shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
	const [submitting, setSubmitting] = useState(false);
	const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart();
	const router = useRouter();

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	});

	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			setSubmitting(true);

			await createOrder(data);

			toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
				icon: '✅',
			});

			setTimeout(() => {
				router.push('/');
			}, 3000);

			setSubmitting(false);
		} catch (err) {
			console.log(err);
			setSubmitting(false);
			toast.error('Не удалось создать заказ', {
				icon: '❌',
			});
		}
	};

	const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Container>
			<Title text={'Оформление заказа'} size='lg' className='font-extrabold mb-8 mt-5' />
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-10'>
						{/* Левая часть */}
						<div className='grid gap-10 mb-20 flex-1'>
							{/* Корзина */}
							<CheckoutCart
								items={items}
								loading={loading}
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
							/>

							{/* Персональные данные */}
							<CheckoutPersonalForm
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>

							{/* Адрес доставки */}
							<CheckoutAddressForm
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>
						</div>

						{/* Правая часть */}
						<div className='w-[450px]'>
							<CheckoutSidebar
								totalAmount={totalAmount}
								loading={loading || submitting}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
