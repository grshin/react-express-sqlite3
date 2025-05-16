import axios from 'axios';
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext'; // ✅ useAppContext 사용

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const { setMessage } = useAppContext(); // ✅ 여기서 context 사용

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = mode === 'register' ? '/api/register' : '/api/login';
      const res = await axios.post(url, { email, password: pw });
      setMessage(`✅ ${mode === 'register' ? '등록' : '로그인'} 완료: ${res.data.email}`);
    } catch (error) {
      console.error('에러 발생:', error);

      if (error.response) {
        const errorMsg = error.response.data?.error || '요청 처리 중 오류가 발생했습니다.';
        setMessage(`❌ ${errorMsg}`);
      } else if (error.request) {
        setMessage('❌ 서버로부터 응답이 없습니다.');
      } else {
        setMessage(`❌ 요청 에러: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === 'register' ? '회원가입' : '로그인'}</h2>
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={pw} onChange={(e) => setPw(e.target.value)} />
      <button type="submit">{mode === 'register' ? '가입하기' : '로그인'}</button>
    </form>
  );
}
