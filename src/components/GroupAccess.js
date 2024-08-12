import React from 'react';
import './GroupAccess.css';

function GroupAccess() {
  return (
    <div className="group-access-container">
      <h1 className="title">조각집</h1>
      <div className="group-access-content">
        <h2>비공개 그룹</h2>
        <p>비공개 그룹에 접근하기 위해 권한 확인이 필요합니다.</p>
        <input type="password" placeholder="그룹 비밀번호를 입력해 주세요" />
        <button>제출하기</button>
      </div>
    </div>
  );
}

export default GroupAccess;
