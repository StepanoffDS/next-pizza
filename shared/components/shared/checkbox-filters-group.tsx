'use client';

import { useState } from 'react';
import {
	FilterCheckbox,
	FilterCheckboxProps,
} from '@/shared/components/shared/filter-checkbox';
import { Input, Skeleton } from '@/shared/components';

type Item = FilterCheckboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems?: Item[];
	limit?: number;
	loading?: boolean;
	searchInputPlaceholder?: string;
	onClickCheckbox?: (id: string) => void;
	defaultValue?: string[];
	selected?: Set<string>;
	className?: string;
	name?: string;
}

export const CheckboxFiltersGroup = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	className,
	loading,
	onClickCheckbox,
	selected,
	name,
	defaultValue,
}: Props) => {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	if (loading) {
		return (
			<div className={className}>
				<p className={'font-bold mb-3'}>{title}</p>

				{Array.from({ length: limit }).map((_, index) => (
					<Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />
				))}

				<Skeleton className='w-28 h-6 mb-4 rounded-[8px]' />
			</div>
		);
	}

	const list = showAll
		? items.filter((item) =>
				item.text.toLowerCase().includes(searchValue.toLowerCase())
		  )
		: items.slice(0, limit);

	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>

			{showAll && (
				<div className='mb-5'>
					<Input
						className='bg-gray-50 border-none'
						placeholder={searchInputPlaceholder}
						onChange={onChangeSearch}
					/>
				</div>
			)}

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{list.length !== 0 ? (
					list.map((item, index) => (
						<FilterCheckbox
							key={index}
							name={name}
							text={item.text}
							value={item.value}
							endAdornment={item.endAdornment}
							checked={selected?.has(item.value)}
							onCheckedChange={() => onClickCheckbox?.(item.value)}
						/>
					))
				) : (
					<p>Ничего не найдено</p>
				)}
			</div>

			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button
						className='text-primary mt-3'
						onClick={() => setShowAll(!showAll)}
					>
						{showAll ? 'Скрыть' : 'Показать все'}
					</button>
				</div>
			)}
		</div>
	);
};
