'use client';

import React, { useEffect, useRef } from 'react';
import { ProductCard, Title } from '@/shared/components';
import { cn } from '@/shared/lib/utils';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/shared/store/category';
import { ProductWithRelations } from '@/@types';

interface Props {
	title: string;
	items: ProductWithRelations[];
	categoryId: number;
	className?: string;
	listClassName?: string;
}

export const ProductGroupList = ({
	title,
	items,
	listClassName,
	categoryId,
	className,
}: Props) => {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
	const intersectionRef = useRef<HTMLDivElement>(null);
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	});

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [categoryId, title, intersection?.isIntersecting]);

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size={'lg'} className={'font-extrabold mb-5'} />

			<div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{items.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						imageUrl={product.imageUrl}
						price={product.items[0]?.price}
						ingredients={product.ingredients}
					/>
				))}
			</div>
		</div>
	);
};
