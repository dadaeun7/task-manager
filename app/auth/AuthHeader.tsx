'use client'

import { useEffect, useState } from "react";
import "../css/auth-header.css";
import { useAuth } from "./AuthProvider";
import { useRouter } from 'next/navigation';

export default function AuthHeader() {

    const { user, logout } = useAuth();
    const [email, setEamil] = useState<string | null | undefined>(user?.email);

    useEffect(() => {
        if (user) {
            setEamil(user.email);
        }
    }, [user])

    const router = useRouter();

    return (
        <div className="auth-header-container">
            <div className="auth-header-etc"
                onClick={() => {
                    logout();
                    router.replace('/');
                }}>
                <img
                    className="auth-header-etc-home"
                    src="./home.svg" />
                <span style={{ marginTop: '2px' }}>로그아웃</span>
            </div>
            <div className="auth-header-info">
                <img className="auth-header-info-img" src="./user.svg" />
                <div className="auth-header-info-email">{email}</div>
            </div>
        </div>
    )
}