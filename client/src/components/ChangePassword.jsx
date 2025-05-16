import { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

const ChangePassword = () => {
  const { setMessage } = useAppContext();
  const [email, setEmail] = useState('');
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');

  const handleChangePassword = async () => {
    try {
      const res = await axios.post('/api/change-password', {
        email,
        oldPassword: oldPw,
        newPassword: newPw,
      });
      setMessage(`🔐 ${res.data.message}`);
    } catch (e) {
      setMessage(`❌ ${e.response?.data?.error || '비밀번호 변경 실패'}`);
    }
  };

  return (
    <div>
      <h2>비밀번호 변경</h2>
      <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="기존 비밀번호" type="password" value={oldPw} onChange={(e) => setOldPw(e.target.value)} />
      <input placeholder="새 비밀번호" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
      <div>
        <button onClick={handleChangePassword}>비밀번호 변경</button>
      </div>
    </div>
  );
};

export default ChangePassword;
