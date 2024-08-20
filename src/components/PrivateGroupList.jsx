import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/styles/PrivateGroupList.css';

const groupData = [
  { title: "달봉이네 가족", date: "D+265", likes: "1.5K", badges: 8, memories: 8, status: "비공개" },
  { title: "달봉이네 가족", date: "D+265", likes: "1.5K", badges: 8, memories: 8, status: "비공개" },
  // Add more sample data here...
];

function PrivateGroupList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const loadGroups = () => {
    setCurrentIndex(currentIndex + 4);
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <h1>조각집</h1>
        </div>
        <div className="group-actions">
          <button className="filter-btn" onClick={() => navigate('/')}>공개</button>
          <button className="filter-btn active">비공개</button>
          <input type="text" className="search-input" placeholder="그룹명을 검색하세요" />
          <select className="sort-select">
            <option value="popular">공감순</option>
            <option value="recent">최신순</option>
          </select>
          <button className="create-group-btn" onClick={() => navigate('/create-group')}>
            그룹 만들기
          </button>
        </div>
      </header>

      <main>
        <div className="groups" id="groups">
          {groupData.slice(0, currentIndex + 4).map((group, index) => (
            <div className="group-block" key={index}>
              <div className="group-info">
                <div className="meta">
                  <span>{group.date}</span> | <span>{group.status}</span>
                </div>
                <div className="title">{group.title}</div>
                <div className="badges">획득 배지: {group.badges}</div>
                <div className="memories">추억: {group.memories}</div>
                <div className="likes">그룹 공감: {group.likes}</div>
              </div>
            </div>
          ))}
        </div>
        {currentIndex + 4 < groupData.length && (
          <button className="load-more-btn" onClick={loadGroups}>더보기</button>
        )}
      </main>
    </div>
  );
}

export default PrivateGroupList;
