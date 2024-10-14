import React from 'react';
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from '..';
import { PizzaSize, PizzaType } from '@/shared/constants';
import { getCartItemDetails } from '@/shared/lib';
import { CartStateItem } from '@/shared/lib/get-cart-details';

interface Props {
	items: CartStateItem[];
	onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
	removeCartItem: (id: number) => void;
	loading?: boolean;
	className?: string;
}

export const CheckoutCart = ({
	items,
	onClickCountButton,
	removeCartItem,
	loading,
	className,
}: Props) => {
	return (
		<WhiteBlock title='1. Корзина'>
			<div className='grid gap-5 w-full'>
				{loading
					? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
					: items.map((item) => (
							<CheckoutItem
								key={item.id}
								id={item.id}
								imageUrl={item.imageUrl}
								details={getCartItemDetails(
									item.ingredients,
									item.pizzaType as PizzaType,
									item.pizzaSize as PizzaSize
								)}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								disabled={item.disabled}
								onClickCountButton={(type) =>
									onClickCountButton(item.id, item.quantity, type)
								}
								onClickRemove={() => removeCartItem(item.id)}
							/>
					  ))}
			</div>
		</WhiteBlock>
	);
};
