import {useState, useEffect} from 'react';
import { ClipLoader } from 'react-spinners';
import {customersSignal} from "../App";

export function Home() {
    const [totalBalance, setTotalBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [numberOfMembers, setNumberOfMembers] = useState(null);

    useEffect(() => {
        fetchTotalBalance();
    }, []);

    const fetchTotalBalance = async () => {
        try {
            // const response = await fetch('https://us-central1-crudapifirebase.cloudfunctions.net/app/api/read');
            // const data = await response.json();
            const data = await customersSignal.value;
            const totalBalance = data.reduce((acc, customer) => acc + customer.balance, 0);
            const numberOfMembers = data.length;
            setNumberOfMembers(numberOfMembers)
            setTotalBalance(totalBalance);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching total balance:', error);
        }
    }

    return (
        <div>
            <div className="py-24 sm:py-26">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Amero Kundeklub</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Oversigt over din kundeklub og dens medlemmer.
                        </p>
                    </div>
                    <div
                        className="mx-auto mt-10  border-t border-gray-200">

                    </div>
                </div>
            </div>


            <div className="bg-white py-0 sm:py-0">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">Antal medlemmer i kundeklubben</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">            {loading ? (
                                <ClipLoader color="#000" loading={loading} size={35}/>
                            ) : (
                                <p>{numberOfMembers}</p>
                            )}
                            </dd>
                        </div>
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">Total antal point på tværs af kunder</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{loading ? (
                                <ClipLoader color="#000" loading={loading} size={35}/>

                            ) : (
                                <p>{totalBalance}</p>
                            )}
                            </dd>
                        </div>
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">Gennemsnitligt antal point pr medlem</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{loading ? (
                                <ClipLoader color="#000" loading={loading} size={35}/>

                            ) : (
                                <p>{(totalBalance / numberOfMembers).toFixed(1)}</p>
                            )}</dd>
                        </div>
                    </dl>
                </div>
            </div>


        </div>
    );
}