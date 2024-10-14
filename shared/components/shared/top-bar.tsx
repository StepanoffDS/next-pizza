import { Categories, Container, SortPopup } from '@/shared/components';
import { cn } from '@/shared/lib/utils';
import { Category } from '@prisma/client';

interface Props {
	className?: string;
	categories: Category[];
}

export const TopBar = ({ categories, className }: Props) => {
	return (
		<div
			className={cn(
				'sticky top-0 bg-white shadow-lg shadow-black/5 z-10',
				className
			)}
		>
			<Container className='flex items-center justify-between p-3'>
				<Categories items={categories} />
				<SortPopup />
			</Container>
		</div>
	);
};
