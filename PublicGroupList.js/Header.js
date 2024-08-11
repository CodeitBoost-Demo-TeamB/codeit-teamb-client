import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">조각집</h1>
        <div className="header-controls">
          <button className="btn">공개</button>
          <input
            type="text"
            className="search-input"
            placeholder="그룹명을 검색해보세요."
          />
          <button className="btn create-group">그룹 만들기</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
