import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 추가
import '../styles/GroupAccess.css';

function GroupAccess() {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const groupId = 1; // 실제 그룹 ID로 교체 필요
      const response = await axios.post(
        `https://codit-teamb-server.onrender.com/api/groups/${groupId}/verify-password`, 
        { password }, 
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) { // 서버가 성공 응답을 보냈을 경우
        alert('비밀번호가 일치합니다. 그룹에 접근합니다.');
        navigate('/group-page'); // 그룹 페이지로 이동
      } else {
        setErrorMessage('비밀번호가 일치하지 않습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('권한 확인 실패:', error);
      setErrorMessage('권한 확인 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div>
      <header className="header">
        <h1>조각집</h1>
      </header>

      <main>
        <div className="access-container">
          <h2>비공개 그룹</h2>
          <p>비공개 그룹에 접근하기 위해 권한 확인이 필요합니다.</p>
          <form id="access-form" onSubmit={handleSubmit}>
            <label htmlFor="password">비밀번호 입력</label>
            <input
              type="password"
              id="password"
              placeholder="그룹 비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">제출하기</button>
          </form>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      </main>
    </div>
  );
}

export default GroupAccess;
