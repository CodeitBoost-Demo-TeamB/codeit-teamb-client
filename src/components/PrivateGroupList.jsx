import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PrivateGroupList.css';

function PrivateGroupList() {
  // groups를 빈 배열로 초기화
  const [groups, setGroups] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('https://codit-teamb-server.onrender.com/api/groups');

        // 응답이 배열인지 확인
        if (Array.isArray(response.data)) {
          setGroups(response.data);
        } else {
          console.error("그룹 데이터가 배열이 아닙니다:", response.data);
          setGroups([]); // 응답이 배열이 아닐 경우 빈 배열로 설정
        }
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
          {/* groups가 배열이면 map 함수 호출 */}
          {groups.length > 0 ? (
            groups.slice(0, currentIndex + 4).map((group, index) => (
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
            ))
          ) : (
            <p>그룹이 없습니다.</p>
          )}
        </div>
        {currentIndex + 4 < groups.length && (
          <button className="load-more-btn" onClick={loadMoreGroups}>더보기</button>
        )}
      </main>
    </div>
  );
}

export default PrivateGroupList;
