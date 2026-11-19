
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Routines from './routines';
import { BASE_URL } from '../lib/utils';

const routine = {
	id: '1',
	productId: '123',
	name: 'Cicaplast B5',
	image: 'product.png',
	routine: 'Morning',
};

beforeEach(() => {
	global.fetch = jest.fn().mockResolvedValueOnce({
		ok: true,
		json: () => Promise.resolve([routine]),
	});
});

afterEach(() => {
	delete global.fetch;
});

test('updates a skincare routine', async () => {
	global.fetch.mockResolvedValueOnce({
		ok: true,
		json: () =>
			Promise.resolve({
				...routine,
				routine: 'Evening',
			}),
	});

	render(<Routines />);

	await screen.findByText('Cicaplast B5');

	fireEvent.change(screen.getByRole('combobox'), {
		target: { value: 'Evening' },
	});

	expect(
		await screen.findByDisplayValue('Evening')
	).toBeInTheDocument();

	expect(global.fetch).toHaveBeenCalledWith(
		`${BASE_URL}/routines/1`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ routine: 'Evening' }),
		}
	);
});

test('removes a product from the routine', async () => {
	global.fetch.mockResolvedValueOnce({
		ok: true,
	});

	render(<Routines />);

	await screen.findByText('Cicaplast B5');

	fireEvent.click(
		screen.getByRole('button', {
			name: 'Remove Cicaplast B5',
		})
	);

	await waitFor(() => {
		expect(screen.queryByText('Cicaplast B5'))
			.not.toBeInTheDocument();
	});

	expect(global.fetch).toHaveBeenCalledWith(
		`${BASE_URL}/routines/1`,
		{
			method: 'DELETE',
		}
	);
});
