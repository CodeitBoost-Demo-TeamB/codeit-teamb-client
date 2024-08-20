import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/styles/GroupAccess.css';

function GroupAccess() {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const correctPassword = "12345"; // 실제 환경에서는 서버에서 확인해야 함

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === correctPassword) {
      alert('비밀번호가 일치합니다. 그룹에 접근합니다.');
      // 실제 그룹 페이지로 리다이렉션
      navigate('/group-page'); // 리액트 라우터를 사용하여 그룹 페이지로 이동
    } else {
      setErrorMessage('비밀번호가 일치하지 않습니다. 다시 시도해 주세요.');
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


