import React from 'react';

const UserCard = ({ user, onAction, isProcessing }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img
                    src={photoUrl}
                    alt="user photo"
                    className="w-full h-80 object-cover"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {firstName} {lastName}
                </h2>
                {age && gender && (
                    <p>
                        {age}, {gender}
                    </p>
                )}
                <p>{about}</p>
                {onAction && (
                    <div className="card-actions justify-center my-4">
                        <button
                            className="btn btn-primary"
                            onClick={() => onAction("ignored", _id)}
                            disabled={isProcessing}
                        >
                            Ignore
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => onAction("interested", _id)}
                            disabled={isProcessing}
                        >
                            Interested
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserCard;
