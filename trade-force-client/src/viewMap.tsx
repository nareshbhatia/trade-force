import React from 'react';
import { NotFound } from '@react-force/core';
import { HomePage, SignInPage } from './pages';

export const viewMap = {
    home: <HomePage />,
    notFound: <NotFound />,
    signin: <SignInPage />,
};
