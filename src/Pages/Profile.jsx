import { useState } from "react";
import { useSelector } from "react-redux";
import { useViewProfileQuery } from "../store/profileApi";
import EditProfile from "../components/EditProfile";
import UserCard from "../components/UserCard";

const Profile = () => {
    const { data: user, isLoading, error } = useViewProfileQuery();
    const [showEdit, setShowEdit] = useState(false);

    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>Error loading profile</h1>;

    // API response wrapper handling (assuming similar to feed)
    const userData = user?.data || user;

    return (
        <div className="flex flex-wrap justify-center gap-10 my-10 p-4">
            {userData && (
                <>
                    {!showEdit && (
                        <div className="flex flex-col items-center">
                            <UserCard user={userData} />
                            <button
                                className="btn btn-secondary mt-4"
                                onClick={() => setShowEdit(true)}
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}
                    {showEdit && (
                        <>
                            <EditProfile user={userData} />
                            <div className="flex flex-col items-center">
                                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                                <UserCard user={userData} />
                                <button
                                    className="btn btn-outline mt-4"
                                    onClick={() => setShowEdit(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Profile;