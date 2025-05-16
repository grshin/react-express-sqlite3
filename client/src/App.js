import React, { useState } from 'react';

import AuthForm from './components/AuthForm';
import ChangePassword from './components/ChangePassword';
import { AppProvider, useAppContext } from './context/AppContext';

const MessageDisplay = () => {
  const { message } = useAppContext();

  return (
    <div style={{ marginTop: '2rem', fontWeight: 'bold' }}>
      <hr />
      <p>{message}</p>
    </div>
  );
};

function App() {
  const [mode, setMode] = useState('register'); // 기본은 회원가입 모드
  return (
    <AppProvider>
      <div>
        <button onClick={() => setMode('register')}>회원가입</button>
        <button onClick={() => setMode('login')}>로그인</button>

        <AuthForm mode={mode} />
        <ChangePassword />
        <MessageDisplay />
      </div>
    </AppProvider>
  );
}

export default App;
