import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/styles/PublicGroupList.css';

const groupData = [
  { title: "에델바이스", description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.", likes: "1.5K", badges: 2, memories: 8, date: "D+265", image: "../images/에델바이스.png" },
  { title: "에델바이스", description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.", likes: "1.5K", badges: 2, memories: 8, date: "D+265", image: "../images/에델바이스.png" },
  // Add more data here
];

function PublicGroupList() {
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
          <button className="filter-btn active">공개</button>
          <button className="filter-btn" onClick={() => navigate('/private-groups')}>비공개</button>
          <input type="text" className="search-input" placeholder="그룹명을 검색하세요" />
          <select className="sort-select">
            <option value="popular">공감순</option>
            <option value="recent">최신순</option>
          </select>
          <button className="create-group-btn" onClick={() => navigate('/create-group')}>그룹 만들기</button>
        </div>
      </header>

      <main>
        <div className="groups" id="groups">
          {groupData.slice(0, currentIndex + 4).map((group, index) => (
            <div className="group-block" key={index}>
              <img src={group.image} alt={group.title} />
              <div className="group-info">
                <div className="title">{group.title}</div>
                <div className="description">{group.description}</div>
                <div className="meta">
                  <span>{group.date}</span> | <span>{group.likes} 공감</span>
                </div>
                <div className="badges">획득 배지: {group.badges}</div>
                <div className="memories">추억: {group.memories}</div>
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

export default PublicGroupList;
