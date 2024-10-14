'use client';

import toast from 'react-hot-toast';
import { ProductWithRelations } from '@/@types';
import { useCartStore } from '@/shared/store';
import { useShallow } from 'zustand/react/shallow';
import { ChoosePizzaForm, ChooseProductForm } from '.';

interface Props {
	product: ProductWithRelations;
	onSubmit?: VoidFunction;
}

export const ProductForm = ({ product, onSubmit: _onSubmit }: Props) => {
	const [addCartItem, loading] = useCartStore(
		useShallow((state) => [state.addCartItem, state.loading])
	);
	const firstItem = product.items[0];
	const isPizzaForm = Boolean(firstItem.pizzaType);

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			if (isPizzaForm && productItemId && ingredients) {
				await addCartItem({
					productItemId,
					ingredients,
				});
			} else {
				await addCartItem({
					productItemId: firstItem.id,
				});
			}
			toast.success(`${product.name} добавлен(а) в корзину`);

			_onSubmit?.();
		} catch (error) {
			toast.error(`Не удалось добавить ${product.name} в корзину`);
			console.error(error);
		}
	};

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				className='min-h-[500px]'
				imageUrl={product.imageUrl}
				name={product.name}
				items={product.items}
				ingredients={product.ingredients}
				onSubmit={onSubmit}
				loading={loading}
			/>
		);
	}

	return (
		<ChooseProductForm
			imageUrl={product.imageUrl}
			name={product.name}
			className='h-[500px]'
			onSubmit={onSubmit}
			price={firstItem.price}
			loading={loading}
		/>
	);
};
