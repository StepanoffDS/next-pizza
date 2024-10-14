import { Filters, PriceProps, QueryFilters } from '@/@types';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useSet } from 'react-use';

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceProps, value: number) => void;
	setSizes: (value: string) => void;
	setPizzaTypes: (value: string) => void;
	setIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>;
	// Фильтр ингредиентов
	const [selectedIngredients, { toggle: setIngredients }] = useSet(
		new Set<string>(searchParams.get('ingredients')?.split(','))
	);

	// Фильтр размеров
	const [sizes, { toggle: setSizes }] = useSet(
		new Set<string>(
			searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []
		)
	);

	// Фильтр типов
	const [pizzaTypes, { toggle: setPizzaTypes }] = useSet(
		new Set<string>(
			searchParams.get('pizzaTypes')
				? searchParams.get('pizzaTypes')?.split(',')
				: []
		)
	);

	// Фильтр цен
	const [prices, setPrices] = useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	});

	// Изменение цен
	const onChangePrice = (name: keyof PriceProps, value: number) => {
		setPrices((prev) => ({ ...prev, [name]: value }));
	};

	return useMemo(
		() => ({
			sizes,
			pizzaTypes,
			selectedIngredients,
			prices,
			setPrices: onChangePrice,
			setPizzaTypes,
			setSizes,
			setIngredients,
		}),
		[sizes, pizzaTypes, selectedIngredients, prices]
	);
};
