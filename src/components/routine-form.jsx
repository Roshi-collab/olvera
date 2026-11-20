
import { useState } from 'react';
import { BASE_URL, authFetch } from '../lib/utils';

export default function RoutineForm({ product }) {
    const [routine, setRoutine] = useState('Morning');
    const [message, setMessage] = useState('');
    const [saving, setSaving] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setSaving(true);
        setMessage('');

        authFetch(`${BASE_URL}/routines`)
            .then(res => {
                if (!res.ok) {
                    if (res.status === 401) {
                        throw new Error('Please log in to save your routine.');
                    }

                    throw new Error('Fetching Failed');
                }

                return res.json();
            })
            .then(data => {
                const exists = data.some(
                    item =>
                        item.productId === product.code &&
                        item.routine === routine
                );

                if (exists) {
                    throw new Error('Product already in this routine.');
                }

                return authFetch(`${BASE_URL}/routines`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        productId: product.code,
                        name: product.product_name,
                        image: product.image_front_url,
                        routine: routine
                    })
                });
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Saving Failed');
                }

                return res.json();
            })
            .then(() => setMessage('Added to your routine.'))
            .catch(error => setMessage(error.message))
            .finally(() => setSaving(false));
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

            <select
                value={routine}
                onChange={event => {
                    setRoutine(event.target.value);
                    setMessage('');
                }}
                className="bg-cream rounded-lg p-3 text-deep-purple"
                aria-label="Routine time"
            >
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
            </select>

            <button
                type="submit"
                disabled={saving}
                className="bg-deep-purple text-cream rounded-lg p-3 cursor-pointer hover:bg-purple disabled:opacity-50"
            >
                {saving ? 'Saving...' : 'Add to Routine'}
            </button>

            {message && (
                <p className="text-sm text-purple">
                    {message}
                </p>
            )}
        </form>
    );
}
