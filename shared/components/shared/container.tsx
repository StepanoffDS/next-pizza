import { cn } from '@/shared/lib/utils';

interface Props {
	className?: string;
	children?: React.ReactNode | React.ReactNode[];
}

export const Container = ({ className, children }: Props) => {
	return (
		<div className={cn('mx-auto max-w-[1280px] p-4', className)}>
			{children}
		</div>
	);
};
