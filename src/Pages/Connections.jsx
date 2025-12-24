import React, { useEffect } from 'react';
import { useGetConnectionsQuery } from '../store/connectionApi';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../store/connectionSlice';

const Connections = () => {
    const { data, isLoading, error } = useGetConnectionsQuery(undefined, { refetchOnMountOrArgChange: true });
    const dispatch = useDispatch();
    const connections = useSelector((state) => state.connection?.connections);

    useEffect(() => {
        if (data && data.data) {
            dispatch(addConnection(data.data));
        }
    }, [data, dispatch]);

    if (isLoading) return <h1 className="text-center my-10">Loading connections...</h1>;
    if (error) return <h1 className="text-center my-10 text-error">Error loading connections: {error.message}</h1>;

    if (!connections) return null; // Handle case where connections hasn't been set yet

    if (connections.length === 0) return <h1 className="text-center my-10">No connections found.</h1>;

    return (
        <div className="container mx-auto my-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Connections</h1>
            <ul className="list bg-base-100 rounded-box shadow-md w-full max-w-3xl">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Your Connections</li>
                {connections?.map((connection) => (
                    <li key={connection._id} className="list-row flex items-center gap-4 p-4 border-b border-base-200 last:border-b-0 hover:bg-base-200 transition-colors">
                        <div>
                            <img
                                className="size-12 rounded-full object-cover"
                                src={connection.photoUrl || "https://img.daisyui.com/images/profile/demo/1@94.webp"}
                                alt={connection.firstName}
                            />
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-lg">{connection.firstName} {connection.lastName}</div>
                            {connection.age && connection.gender && (
                                <div className="text-xs uppercase font-semibold opacity-60">
                                    {connection.age}, {connection.gender}
                                </div>
                            )}
                        </div>
                        <p className="list-col-wrap text-sm text-gray-500 line-clamp-2 max-w-xs">
                            {connection.about || "No bio available."}
                        </p>
                        {/* 
                        // Placeholder buttons from the example, redundant for now but kept structure
                        <button className="btn btn-square btn-ghost">
                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                        </button> 
                        */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Connections;
