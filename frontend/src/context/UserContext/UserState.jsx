import React, { useState } from 'react'
import UserContext from './userContext'
import toast from 'react-hot-toast';

const UserState = (props) => {
    const {
        children,
        setAuthUser
    } = props;

    const [loading, setLoading] = useState(false);

    const host = import.meta.env.VITE_REACT_APP_HOST || 'http://localhost:8000';

    const signup = async (firstName, lastName, email, password) => {
        try {
            setLoading(true);

            const res = await fetch(`${host}/api/auth/createUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            const data = await res.json();

            if (!data.message) {
                localStorage.setItem("logged-in-user", JSON.stringify(data));
                setAuthUser(data);
                toast.success("User Created");
            };

            if (data.message) {
                toast.error(data.message);
            };

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        };
    };

    const login = async (email, password) => {
        try {
            setLoading(true);

            const res = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message);
            };

            if (!data.message) {
                localStorage.setItem("logged-in-user", JSON.stringify(data));
                setAuthUser(data);
                toast.success("User Logged In");
            };

            if (data.message) {
                toast.error(data.message);
            };

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        };
    };

    const logout = async () => {
        try {
            setLoading(true);

            const res = await fetch(`${host}/api/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.removeItem("logged-in-user");
                setAuthUser(null);
                toast.success(data.message);
            };
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        };
    };

    return (
        <UserContext.Provider value={{
            loading,
            signup,
            login,
            logout
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState;