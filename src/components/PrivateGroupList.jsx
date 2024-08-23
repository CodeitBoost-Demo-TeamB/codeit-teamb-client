import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PrivateGroupList.css';

function PrivateGroupList() {
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [sortBy, setSortBy] = useState('latest');
  const [keyword, setKeyword] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('https://codit-teamb-server.onrender.com/api/groups', {
          params: {
            page: page,
            pageSize: pageSize,
            sortBy: sortBy,
            keyword: keyword,
            isPublic: false
          }
        });

        const responseData = response.data;
        if (Array.isArray(responseData.data)) {
          setGroups((prevGroups) => [...prevGroups, ...responseData.data]);
          setTotalPages(responseData.totalPages);
          setTotalItemCount(responseData.totalItemCount);
        } else {
          console.error("그룹 데이터가 배열이 아닙니다:", responseData);
          setGroups([]);
        }
      } catch (error) {
        console.error('그룹 목록을 가져오는 데 실패했습니다:', error);
      }
    };

    fetchGroups();
  }, [page, pageSize, sortBy, keyword, isPublic]);

  useEffect(() => {
    console.log(groups); // 그룹 데이터를 확인하기 위한 로그
  }, [groups]);

  const handleGroupClick = (groupId) => {
    console.log(`Navigating to: /group-access/${groupId}`);
    navigate(`/group-access/${groupId}`);
  };

  const loadMoreGroups = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setPage(1);
    setGroups([]);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
    setGroups([]);
  };

  const handlePublicToggle = (publicStatus) => {
    setIsPublic(publicStatus);
    setPage(1);
    setGroups([]);
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <h1>조각집</h1>
        </div>
        <div className="group-actions">
          <button className={`filter-btn ${isPublic ? 'active' : ''}`} onClick={() => handlePublicToggle(true)}>공개</button>
          <button className={`filter-btn ${!isPublic ? 'active' : ''}`} onClick={() => handlePublicToggle(false)}>비공개</button>
          <input 
            type="text" 
            className="search-input" 
            placeholder="그룹명을 검색하세요" 
            value={keyword} 
            onChange={handleSearchChange} 
          />
          <select className="sort-select" value={sortBy} onChange={handleSortChange}>
            <option value="latest">최신순</option>
            <option value="mostPosted">게시글 많은 순</option>
            <option value="mostLiked">좋아요 많은 순</option>
            <option value="mostBadge">배지 많은 순</option>
          </select>
          <button className="create-group-btn" onClick={() => navigate('/create-group')}>그룹 만들기</button>
        </div>
      </header>

      <main>
        <div className="groups" id="groups">
          {groups.map((group) => (
            <div 
              className="group-block" 
              key={group.id} 
              onClick={() => handleGroupClick(group.id)}
            >
              {!isPublic && group.imageUrl && (
                <img src={group.imageUrl} alt={group.name} />  // 비공개 그룹이 아니면 이미지 표시
              )}
              <div className="group-info">
                <div className="title">{group.name}</div>
                <div className="description">{group.introduction}</div>
                <div className="meta">
                  <span>{new Date(group.createdAt).toLocaleDateString()}</span> | <span>{group.likeCount} 공감</span>
                </div>
                <div className="badges">획득 배지: {group.badgeCount}</div>
                <div className="posts">게시글 수: {group.postCount}</div>
              </div>
            </div>
          ))}
        </div>
        {page < totalPages && (
          <button className="load-more-btn" onClick={loadMoreGroups}>더보기</button>
        )}
      </main>
    </div>
  );
}

export default PrivateGroupList;

