'use client';

import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';

export const Providers = ({ children }: React.PropsWithChildren) => {
	return (
		<>
			{children}
			<Toaster />
			<NextTopLoader />
		</>
	);
};
