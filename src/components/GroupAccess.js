import React, { useState } from 'react';
import '../styles/GroupAccess.css';

function GroupAccess() {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Entered Password: ", password);
  };

  return (
    <div className="group-access-container">
      <header className="header">
        <h1 className="logo">조각집</h1>
      </header>
      <form className="group-access-form" onSubmit={handleSubmit}>
        <h2>비공개 그룹</h2>
        <p>비공개 그룹에 접근하기 위해 권한 확인이 필요합니다.</p>
        <label>
          비밀번호 입력
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="그룹 비밀번호를 입력해 주세요"
            required 
          />
        </label>
        <button type="submit" className="submit-button">제출하기</button>
      </form>
    </div>
  );
}

export default GroupAccess;
