import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Main from "./pages/main/Main"
import Login from 'pages/login/Login';
import SignUp from 'pages/login/SignUp';
import PrivateRoute from 'util/PrivateRoute';
import AuthProvider from 'auth/AuthProvider';
import Invoices from 'pages/invoice_list/Invoices';
import Home from 'pages/home/Home';
import InvoiceCreate from 'pages/invoice_create/InvoiceCreate';
import InvoiceDetails from 'pages/invoice-details/InvoiceDetails';

function App() {
  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <PrivateRoute redirectTo="/login">
              <Main children={<Home />} />
            </PrivateRoute>
          } />
          <Route path='/invoices' element={
            <PrivateRoute redirectTo="/login">
              <Main children={<Invoices />} />
            </PrivateRoute>
          } />
          <Route path='/create-invoice' element={
            <PrivateRoute redirectTo="/login">
              <Main children={<InvoiceCreate />} />
            </PrivateRoute>
          } />
          <Route path='/invoice-details' element={
            <PrivateRoute redirectTo="/login">
              <Main children={<InvoiceDetails />} />
            </PrivateRoute>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
