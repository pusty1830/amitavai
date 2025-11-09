import { createContext } from 'react';
import { isLoggedIn } from './axiosClient';


export const AuthContext = createContext<AuthDefaultContext>({
    isAuthenticated: isLoggedIn(),
    dispatch: () => {}
});