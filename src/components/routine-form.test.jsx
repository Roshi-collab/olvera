
import { render, screen, fireEvent } from '@testing-library/react';
import RoutineForm from './routine-form';
import { BASE_URL } from '../lib/utils';

beforeEach(() => {
	global.fetch = jest.fn()
		.mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve([]),
		})
		.mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ id: '1' }),
		});
});

afterEach(() => {
	delete global.fetch;
});

test('adds a product to a skincare routine', async () => {
	render(
		<RoutineForm
			product={{
				code: '123',
				product_name: 'Cicaplast B5',
				image_front_url: 'product.png',
			}}
		/>
	);

	fireEvent.change(screen.getByRole('combobox'), {
		target: { value: 'Evening' },
	});

	fireEvent.click(
		screen.getByRole('button', { name: 'Add to Routine' })
	);

	expect(
		await screen.findByText('Added to your routine.')
	).toBeInTheDocument();

	expect(global.fetch).toHaveBeenCalledWith(
		`${BASE_URL}/routines`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				productId: '123',
				name: 'Cicaplast B5',
				image: 'product.png',
				routine: 'Evening',
			}),
		}
	);
});
