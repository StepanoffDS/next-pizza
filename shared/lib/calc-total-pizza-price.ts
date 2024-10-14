import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants';

/**
 * Функция для вычисления общей стоимости пиццы
 * @param type - тип теста
 * @param size - размер пиццы
 * @param items - список вариаций пицц
 * @param ingredients - список доступных ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * @returns number - общая стоимость
 */
export const calcTotalPizzaPrice = (
	type: PizzaType,
	size: PizzaSize,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const pizzaPrice =
		items.find((item) => item.pizzaType === type && item.size === size)
			?.price || 0;

	const allIngredients = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0);

	const totalPrice = pizzaPrice + allIngredients;

	return totalPrice;
};
