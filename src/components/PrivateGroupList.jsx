import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // axios 추가
import '../src/styles/PrivateGroupList.css';

function PrivateGroupList() {
  const [groups, setGroups] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // 서버로부터 그룹 목록을 가져오는 함수
    const fetchGroups = async () => {
      try {
        const response = await axios.get('/api/groups');
        setGroups(response.data);  // 서버에서 받은 그룹 목록을 상태에 저장
      } catch (error) {
        console.error('그룹 목록을 가져오는 데 실패했습니다:', error);
      }
    };

    fetchGroups();
  }, []);

  const loadMoreGroups = () => {
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
          <button className="create-group-btn" onClick={() => navigate('/create-group')}>그룹 만들기</button>
        </div>
      </header>

      <main>
        <div className="groups" id="groups">
          {groups.slice(0, currentIndex + 4).map((group, index) => (
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
        {currentIndex + 4 < groups.length && (
          <button className="load-more-btn" onClick={loadMoreGroups}>더보기</button>
        )}
      </main>
    </div>
  );
}

export default PrivateGroupList;
