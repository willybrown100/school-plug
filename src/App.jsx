import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignIn from './auth/SignIn';
import ForgotPassword from './auth/ForgotPassword';
import SignUp from './auth/SignUp';
import Logo from './components/Logo';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Logo/>}/>
      <Route path="signin" element={<SignIn/>}/>
      <Route path="signup" element={<SignUp/>}/>
      <Route path="forgotPassword" element={<ForgotPassword/>}/>
     </Routes>
     </BrowserRouter>
     </QueryClientProvider>
  );
}

      