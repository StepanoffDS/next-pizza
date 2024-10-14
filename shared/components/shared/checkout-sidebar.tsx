import React from 'react';
import { CheckoutItemDetails, WhiteBlock } from '.';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '..';

interface Props {
	totalAmount: number;
	loading?: boolean;
}

const VAT = 15;
const DELIVERY_PRICE = 250;

export const CheckoutSidebar = ({ totalAmount, loading }: Props) => {
	const vatPrice = (totalAmount * VAT) / 100;
	const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;
	return (
		<WhiteBlock className='p-6 sticky top-4'>
			<div className='grid gap-1'>
				<span className='text-xl'>Итого:</span>
				{loading ? (
					<Skeleton className='h-11 w-48' />
				) : (
					<span className='h-11 text-3xl font-extrabold'>
						{totalAmount ? totalPrice : 0} ₽
					</span>
				)}
			</div>

			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Package size={18} className='mr-2 text-gray-300' />
						Стоимость корзины:
					</div>
				}
				value={
					loading ? <Skeleton className='h-6 w-16 rounded-[6px]' /> : `${totalAmount} ₽`
				}
			/>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Percent size={18} className='mr-2 text-gray-300' />
						Налоги:
					</div>
				}
				value={
					loading ? <Skeleton className='h-6 w-16 rounded-[6px]' /> : `${vatPrice} ₽`
				}
			/>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Truck size={18} className='mr-2 text-gray-300' />
						Доставка:
					</div>
				}
				value={
					loading ? (
						<Skeleton className='h-6 w-16 rounded-[6px]' />
					) : (
						`${DELIVERY_PRICE} ₽`
					)
				}
			/>

			<Button
				type='submit'
				loading={loading}
				className='w-full h-14 rounded-2xl mt-6 text-base font-bold leading-none'
			>
				Оформить заказ
				<ArrowRight size={20} className='ml-2' />
			</Button>
		</WhiteBlock>
	);
};
