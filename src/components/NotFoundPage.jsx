import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFoundPage.css';

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 5초 후에 메인 페이지로 리디렉션
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 해제
  }, [navigate]);

  return (
    <div className="container">
      {/* Header section with the title */}
      <header className="header">
        <h1 className="headerh1">조각집</h1>
      </header>

      {/* Main content with the 404 message */}
      <div className="content">
        <h2 className="contenth2">
          <span className="contenth2span">4</span>
          <span className="contenth2span">0</span>
          <span className="contenth2span">4</span>
        </h2>
        <p className="contentp">찾을 수 없는 페이지입니다.</p>
        <p className="contentp">요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
