'use client';

import {
	CheckboxFiltersGroup,
	Input,
	RangeSlider,
	Title,
} from '@/shared/components';
import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks';

interface Props {
	className?: string;
}

export const Filters = ({ className }: Props) => {
	const { ingredients, loading } = useIngredients();
	const filters = useFilters();

	useQueryFilters(filters);

	const allIngredients = ingredients.map((ingredient) => ({
		value: ingredient.id.toString(),
		text: ingredient.name,
	}));

	const onChangePrice = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0]);
		filters.setPrices('priceTo', prices[1]);
	};

	return (
		<div className={className}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

			<CheckboxFiltersGroup
				title='Тип теста'
				name='pizzaTypes'
				className='mb-5'
				onClickCheckbox={filters.setPizzaTypes}
				selected={filters.pizzaTypes}
				items={[
					{ text: 'Тонкое', value: '1' },
					{ text: 'Традиционное', value: '2' },
				]}
			/>

			<CheckboxFiltersGroup
				title='Размеры'
				name='sizes'
				className='mb-5'
				onClickCheckbox={filters.setSizes}
				selected={filters.sizes}
				items={[
					{ text: '20 см', value: '20' },
					{ text: '30 см', value: '30' },
					{ text: '40 см', value: '40' },
				]}
			/>

			<div className={'mt-5 border-y border-y-neutral-100 py-6 pb-7'}>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={5000}
						value={String(filters.prices.priceFrom)}
						onChange={(e) =>
							filters.setPrices('priceFrom', Number(e.target.value))
						}
					/>
					<Input
						type='number'
						placeholder='1000'
						min={100}
						max={1000}
						value={String(filters.prices.priceTo)}
						onChange={(e) =>
							filters.setPrices('priceTo', Number(e.target.value))
						}
					/>
				</div>

				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[
						filters.prices.priceFrom || 0,
						filters.prices.priceTo || 1000,
					]}
					onValueChange={onChangePrice}
				/>
			</div>

			<CheckboxFiltersGroup
				className={'mt-5'}
				title={'Ингредиенты'}
				limit={5}
				items={allIngredients}
				loading={loading}
				onClickCheckbox={filters.setIngredients}
				selected={filters.selectedIngredients}
				name='ingredients'
			/>
		</div>
	);
};
