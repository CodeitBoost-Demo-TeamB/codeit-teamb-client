import React from 'react';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <header className="header">
        <h1 className="logo">조각집</h1>
      </header>
      <div className="not-found-content">
        <h2 className="error-code">404</h2>
        <p className="error-message">찾을 수 없는 페이지입니다.</p>
        <p className="error-description">요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
