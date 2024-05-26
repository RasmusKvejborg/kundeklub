import {useState, useEffect} from 'react';
import {customersSignal} from "../App";

export function Medlemmer() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);


    async function fetchData() {
        try {
            const data = await customersSignal.value;
            setCustomers(data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="mt-10">
                <div className="px-4 sm:px-40">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-base font-semibold leading-6 text-gray-900">Medlemmer</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                En liste af alle medlemmer inklusiv navn, telefon, mail og antal point.
                            </p>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Tilføj medlem
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                    <tr>
                                        <th scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Navn
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Telefon
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Point
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                            <span className="sr-only">Rediger</span>
                                        </th>
                                    </tr>
                                    </thead>


                                    <tbody className="divide-y divide-gray-200">
                                    {loading ? (
                                        <tr className="mt-2 text-sm text-gray-700"><td>Henter medlemmer...</td></tr>
                                    ) : (
                                    customers.map((person) => (
                                        <tr key={person.phone}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                {person.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.phone}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.balance}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <a href="/medlemmer" className="text-indigo-600 hover:text-indigo-900">
                                                    Rediger<span className="sr-only">, {person.name}</span>
                                                </a>
                                            </td>
                                        </tr>
                                    )))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                );
            }