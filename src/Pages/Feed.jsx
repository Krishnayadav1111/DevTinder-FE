import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFeedQuery } from "../store/feedApi";
import { addFeed } from "../store/feedSlice";

import UserCard from "../components/UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const { data } = useGetFeedQuery({ page: 1, limit: 100 });
    const feed = useSelector((store) => store.feed);

    useEffect(() => {
        if (data) {
            dispatch(addFeed(data.data));
        }
    }, [data, dispatch]);

    if (!feed) return null;

    if (feed.length <= 0) return <h1 className="flex justify-center my-10">No new users founds!</h1>;

    return (
        <div className="flex justify-center my-10">
            <UserCard user={feed[0]} />
        </div>
    );
};

export default Feed;