import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EmptyPublicGroupList.css';

function EmptyPublicGroupList() {
  const navigate = useNavigate();

  const handlePublicClick = () => {
    // 공개 버튼 클릭 시 active 클래스 설정
    document.getElementById('public-btn').classList.add('active');
    document.getElementById('private-btn').classList.remove('active');
  };

  const handlePrivateClick = () => {
    // 비공개 버튼 클릭 시 active 클래스 설정
    document.getElementById('private-btn').classList.add('active');
    document.getElementById('public-btn').classList.remove('active');
    navigate('/private-groups');
  };

  const handleCreateGroupClick = () => {
    // 그룹 만들기 버튼 클릭 시 그룹 생성 페이지로 이동
    navigate('/create-group');
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <h1>조각집</h1>
        </div>
        <div className="group-actions">
          <button className="create-group-btn" onClick={handleCreateGroupClick}>그룹 만들기</button>
        </div>
      </header>

      <main>
        <div className="filter-bar">
          <button className="filter-btn active" id="public-btn" onClick={handlePublicClick}>공개</button>
          <button className="filter-btn" id="private-btn" onClick={handlePrivateClick}>비공개</button>
          <input type="text" className="search-input" placeholder="그룹명을 검색하세요" />
          <select className="sort-select">
            <option value="recent">공감순</option>
            <option value="popular">최신순</option>
          </select>
        </div>

        <div className="empty-message">
          <img src="../images/빈 파일.png" alt="No data" />
          <p>등록된 공개 그룹이 없습니다.</p>
          <p>가장 먼저 그룹을 만들어 보세요!</p>
          <button className="create-group-btn" onClick={handleCreateGroupClick}>그룹 만들기</button>
        </div>
      </main>
    </div>
  );
}

export default EmptyPublicGroupList;


