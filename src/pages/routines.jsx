
import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { BASE_URL, authFetch } from '../lib/utils';

export default function Routines() {
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        authFetch(`${BASE_URL}/routines`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Fetching Failed');
                }

                return res.json();
            })
            .then(data => setRoutines(data))
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, []);

    function handleUpdate(id, routine) {
        const selected = routines.find(item => item.id === id);

        if (!selected) {
            return;
        }

        const exists = routines.some(
            item =>
                item.id !== id &&
                item.productId === selected.productId &&
                item.routine === routine
        );

        if (exists) {
            setError('Product already in this routine.');
            return;
        }

        authFetch(`${BASE_URL}/routines/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ routine })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Updating Failed');
                }

                return res.json();
            })
            .then(updatedRoutine => {
                setRoutines(previous =>
                    previous.map(item =>
                        item.id === id ? updatedRoutine : item
                    )
                );

                setError('');
            })
            .catch(error => setError(error.message));
    }

    function handleDelete(id) {
        authFetch(`${BASE_URL}/routines/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Deleting Failed');
                }

                setRoutines(previous =>
                    previous.filter(item => item.id !== id)
                );

                setError('');
            })
            .catch(error => setError(error.message));
    }

    if (loading) {
        return <p className="p-10">Loading routine...</p>;
    }

    return (
        <div className="bg-lavender rounded-2xl p-6 md:p-10 text-deep-purple">

            <h1 className="font-serif text-4xl mb-8">
                My Routine
            </h1>

            {error && (
                <p className="mb-5 text-purple">
                    {error}
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {['Morning', 'Evening'].map(time => (
                    <section
                        key={time}
                        className="bg-cream rounded-2xl p-6"
                    >
                        <h2 className="font-serif text-2xl mb-6">
                            {time}
                        </h2>

                        {routines.filter(
                            item => item.routine === time
                        ).length === 0 && (
                            <p className="text-sm text-purple">
                                No products added yet.
                            </p>
                        )}

                        <div className="flex flex-col gap-5">

                            {routines
                                .filter(item => item.routine === time)
                                .map(item => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 border-b border-lavender pb-5"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-28 object-contain"
                                        />

                                        <div className="flex-1 min-w-0 flex flex-col gap-3">

                                            <h3 className="font-serif text-lg">
                                                {item.name}
                                            </h3>

                                            <select
                                                value={item.routine}
                                                aria-label={`Routine time for ${item.name}`}
                                                onChange={event =>
                                                    handleUpdate(
                                                        item.id,
                                                        event.target.value
                                                    )
                                                }
                                                className="bg-lavender rounded-lg p-2 text-sm w-full"
                                            >
                                                <option value="Morning">
                                                    Morning
                                                </option>

                                                <option value="Evening">
                                                    Evening
                                                </option>
                                            </select>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(item.id)}
                                            aria-label={`Remove ${item.name}`}
                                            className="text-purple hover:text-deep-purple cursor-pointer"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                    </div>
                                ))}

                        </div>
                    </section>
                ))}

            </div>
        </div>
    );
}
