'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../auth/AuthProvider';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');


    const { login, signup } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isSignUp) {
                // 회원가입
                await signup(email, password);
                alert('회원가입에 성공했습니다🪄');
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
            } else {
                // 로그인
                await login(email, password);
                router.replace('/task');
            }

        } catch (error: any) {
            console.error('Auth 에러:', error);
            setError(error.message);
        }
    };

    return (
        <div className='main-page'
            style={{
                width: '100%',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <div style={{
                marginLeft: '-10px',
                marginTop: '80px',
                fontSize: '50px',
                fontWeight: 'bold'
            }}>📃My Task</div>
            <div style={{ marginTop: '10px' }}>일정을 효율적으로 관리해보세요!</div>
            <div style={{
                minWidth: '350px',
                margin: '30px auto',
                padding: '30px',
                border: '1px solid #ddd',
                borderRadius: '8px'
            }}>
                <h1 style={{ marginBottom: '10px' }}>{isSignUp ? '회원가입' : '로그인'}</h1>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '14px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호 (6자 이상)"
                            required
                            minLength={6}
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '14px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                            }}
                        />
                    </div>

                    {error && (
                        <p style={{ color: 'red', fontSize: '14px' }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: '#0070f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: 'pointer',
                        }}
                    >
                        {isSignUp ? '회원가입' : '로그인'}
                    </button>
                </form>

                <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    style={{
                        marginTop: '15px',
                        width: '100%',
                        padding: '10px',
                        background: 'transparent',
                        color: '#0070f3',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    {isSignUp ? '이미 계정이 있나요? 로그인' : '계정이 없나요? 회원가입'}
                </button>
            </div>
        </div>

    );
}