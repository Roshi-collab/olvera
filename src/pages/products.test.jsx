
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Products from './products';

beforeEach(() => {
	global.fetch = jest.fn().mockResolvedValue({
		ok: true,
		json: () =>
			Promise.resolve({
				products: [
					{
						code: '123',
						product_name: 'Cicaplast B5',
						image_front_url: 'cicaplast.png',
					},
					{
						code: '456',
						product_name: 'Effaclar Duo',
						image_front_url: 'effaclar.png',
					},
				],
			}),
	});
});

afterEach(() => {
	delete global.fetch;
});

test('filters products when the user searches', async () => {
	render(
		<MemoryRouter>
			<Products />
		</MemoryRouter>
	);

	await screen.findByText('Cicaplast B5');

	fireEvent.change(
		screen.getByPlaceholderText('Search products'),
		{
			target: { value: 'Cicaplast' },
		}
	);

	expect(screen.getByText('Cicaplast B5')).toBeInTheDocument();
	expect(screen.queryByText('Effaclar Duo')).not.toBeInTheDocument();
});

test('filters products by category', async () => {
	render(
		<MemoryRouter>
			<Products />
		</MemoryRouter>
	);

	await screen.findByText('Effaclar Duo');

	fireEvent.change(screen.getByRole('combobox'), {
		target: { value: 'Effaclar' },
	});

	expect(screen.getByText('Effaclar Duo')).toBeInTheDocument();
	expect(screen.queryByText('Cicaplast B5')).not.toBeInTheDocument();
});
