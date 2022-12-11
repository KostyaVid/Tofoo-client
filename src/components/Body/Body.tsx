import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Company from '../../pages/Company/Company';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/SignUp/SignUp';
import { setUser } from '../../store/slices/homeUserSlice';

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.homeUser);
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    try {
      if (!user.username) {
        const JWTToken = localStorage.getItem('JWTToken');
        if (JWTToken) {
          const resAuth = await fetch('/api/login', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${JWTToken}` },
          });
          if (resAuth.status === 200) {
            const userData = await resAuth.json();
            dispatch(setUser(userData.user));
            setIsLoading(false);
            return;
          }
          if (resAuth.status >= 500) throw new Error(`Status: ${resAuth.statusText}`);
        }
        setIsLoading(false);
        navigate('/login');
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log((err as Error).message);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);

  if (!isLoading)
    return (
      <Routes>
        <Route path="/signup" element={user.username ? <Navigate to={'/'} /> : <SignUp />} />
        <Route path="/login" element={user.username ? <Navigate to={'/'} /> : <Login />} />
        <Route path="/company" element={user.username ? <Company /> : <Navigate to={'/'} />} />
        {!user.username ? (
          <Route path="*" element={<Navigate to={'/login'} />} />
        ) : user.company_id ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="*" element={<Navigate to={'/company'} />} />
        )}
      </Routes>
    );
  return <h1>Loading...</h1>;
};

export default Body;
