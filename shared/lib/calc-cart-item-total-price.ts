import { CartItemDTO } from '../services/dto/cart.dto';

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
	const ingredientPrice = item.ingredients.reduce(
		(acc, ingredient) => acc + ingredient.price,
		0
	);
	const totalPrice = (item.productItem.price + ingredientPrice) * item.quantity;

	return totalPrice;
};
