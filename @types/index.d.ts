import { Ingredient, Product, ProductItem } from '@prisma/client';

declare interface Filters {
	sizes: Set<string>;
	pizzaTypes: Set<string>;
	selectedIngredients: Set<string>;
	prices: PriceProps;
}

declare interface PriceProps {
	priceFrom?: number;
	priceTo?: number;
}

declare interface QueryFilters extends PriceProps {
	sizes: string;
	pizzaTypes: string;
	ingredients: string;
}

declare type ProductWithRelations = Product & {
	items: ProductItem[];
	ingredients: Ingredient[];
};

declare type Variant = {
	name: string;
	value: string;
	disabled?: boolean;
};

declare interface CartItemProps {
	id: number;
	imageUrl: string;
	details: string;
	name: string;
	price: number;
	quantity: number;
	disabled?: boolean;
}
