import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useViewProfileQuery } from '../store/profileApi'
import { addUser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();

  const { data: userProfile, isLoading, isError } = useViewProfileQuery(undefined, {
    skip: !!userData,
  });

  useEffect(() => {
    // console.log("Home State:", { userData, isLoading, isError, userProfile });
    if (userData) return;
    if (isLoading) return;

    if (userProfile?.data) {
      dispatch(addUser(userProfile?.data));
    } else if (isError) {
      navigate('/login');
    }
  }, [userProfile, isLoading, isError, dispatch, navigate, userData]);

  return (
    <>
      <NavBar />
      {/* any child routes of Home will be rendered here */}
      <Outlet />
      <Footer />
    </>
  )
}

export default Home
