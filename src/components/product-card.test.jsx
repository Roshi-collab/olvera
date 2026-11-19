import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './product-card';

test('displays the product name', () => {
	render(
		<MemoryRouter>
			<ProductCard
				code="123"
				product_name="Cicaplast B5"
				image_front_url="product.png"
			/>
		</MemoryRouter>
	);

	expect(screen.getByText('Cicaplast B5')).toBeInTheDocument();
});