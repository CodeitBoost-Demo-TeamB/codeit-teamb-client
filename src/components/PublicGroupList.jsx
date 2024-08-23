import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PublicGroupList.css';

function PublicGroupList() {
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [sortBy, setSortBy] = useState('latest');
  const [keyword, setKeyword] = useState('');
  const [isPublic, setIsPublic] = useState(true);
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
            isPublic: isPublic
          }
        });

        if (Array.isArray(response.data.data)) {
          // 그룹 목록 초기화 후 새로운 데이터를 추가
          setGroups(response.data.data);
          setTotalPages(response.data.totalPages);
          setTotalItemCount(response.data.totalItemCount);
        } else {
          console.error("그룹 데이터가 배열이 아닙니다:", response.data);
          setGroups([]);
        }
      } catch (error) {
        console.error('그룹 목록을 가져오는 데 실패했습니다:', error);
      }
    };

    fetchGroups();
  }, [page, pageSize, sortBy, keyword, isPublic]);

  const handleGroupClick = (groupId) => {
    navigate(`/memory/${groupId}`);
  };

  const loadMoreGroups = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  const handlePublicToggle = (publicStatus) => {
    setIsPublic(publicStatus);
    setPage(1);
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
            <div className="group-block" key={group.id} onClick={() => handleGroupClick(group.id)}>
              <img src={group.imageUrl} alt={group.name} />
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

export default PublicGroupList;
