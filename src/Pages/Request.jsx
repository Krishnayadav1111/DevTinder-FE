import React, { useEffect } from 'react';
import { useGetRequestsQuery, useReviewRequestMutation } from '../store/connectionApi';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../store/requestSlice';

const Request = () => {
    const { data, isLoading, error } = useGetRequestsQuery(undefined, { refetchOnMountOrArgChange: true });
    const [reviewRequest, { isLoading: isReviewLoading }] = useReviewRequestMutation();
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.request?.requests);

    useEffect(() => {
        if (data && data.data) {
            dispatch(addRequest(data.data));
        }
    }, [data, dispatch]);

    const handleReview = async (status, requestId) => {
        try {
            await reviewRequest({ status, requestId }).unwrap();
            dispatch(removeRequest(requestId));
        } catch (err) {
            console.error("Review failed:", err);
        }
    };

    if (isLoading) return <h1 className="text-center my-10">Loading requests...</h1>;
    if (error) return <h1 className="text-center my-10 text-error">Error loading requests: {error.message}</h1>;

    if (!requests) return null;

    if (requests.length === 0) return <h1 className="text-center my-10">No pending requests found.</h1>;

    return (
        <div className="container mx-auto my-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Connection Requests</h1>
            <ul className="list bg-base-100 rounded-box shadow-md w-full max-w-3xl">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Pending Requests</li>
                {requests.map((request) => {
                    const user = request.fromUserId || request; // Fallback if it's the user obj itself

                    return (
                        <li key={request._id} className="list-row flex items-center gap-4 p-4 border-b border-base-200 last:border-b-0 hover:bg-base-200 transition-colors">
                            <div>
                                <img
                                    className="size-12 rounded-full object-cover"
                                    src={user.photoUrl || "https://img.daisyui.com/images/profile/demo/1@94.webp"}
                                    alt={user.firstName}
                                />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-lg">{user.firstName} {user.lastName}</div>
                                {user.age && user.gender && (
                                    <div className="text-xs uppercase font-semibold opacity-60">
                                        {user.age}, {user.gender}
                                    </div>
                                )}
                            </div>
                            <p className="list-col-wrap text-sm text-gray-500 line-clamp-2 max-w-xs">
                                {user.about || "No bio available."}
                            </p>
                            <div className="flex gap-2">
                                <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => handleReview("accepted", request._id)}
                                    disabled={isReviewLoading}
                                >
                                    Accept
                                </button>
                                <button
                                    className="btn btn-sm btn-error"
                                    onClick={() => handleReview("rejected", request._id)}
                                    disabled={isReviewLoading}
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Request;