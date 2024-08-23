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

  // 그룹 목록을 서버에서 가져오는 함수
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('https://codit-teamb-server.onrender.com/api/groups', {
          params: {
            page: page,
            pageSize: pageSize,
            sortBy: sortBy,
            keyword: keyword,
            isPublic: false  // 비공개 그룹만 필터링
          }
        });

        const responseData = response.data;
        
        // 응답 데이터가 배열인 경우 처리
        if (responseData.data && Array.isArray(responseData.data)) {
          setGroups((prevGroups) => [...prevGroups, ...responseData.data]);
          setTotalPages(responseData.totalPages);
          setTotalItemCount(responseData.totalItemCount);
        } else {
          console.error("받아온 데이터가 배열이 아닙니다 또는 비어 있습니다:", responseData);
          setGroups([]);  // 오류 발생 시 빈 배열로 초기화
          setTotalPages(0);
          setTotalItemCount(0);
        }
      } catch (error) {
        console.error('그룹 목록을 가져오는 데 실패했습니다:', error);
        setGroups([]);  // 오류 시 빈 배열로 초기화
        setTotalPages(0);
        setTotalItemCount(0);
      }
    };

    fetchGroups();
  }, [page, pageSize, sortBy, keyword, isPublic]);

  // 더 많은 그룹 로드
  const loadMoreGroups = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // 검색어 변경 처리
  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setPage(1);
    setGroups([]);  // 새로운 검색어로 검색 시 그룹 목록 초기화
  };

  // 정렬 기준 변경 처리
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
    setGroups([]);  // 정렬 기준 변경 시 그룹 목록 초기화
  };

  // 공개/비공개 전환 처리
  const handlePublicToggle = (publicStatus) => {
    setIsPublic(publicStatus);
    setPage(1);
    setGroups([]);  // 공개/비공개 변경 시 그룹 목록 초기화
  };

  // 그룹 클릭 시 그룹 접근 페이지로 이동
  const handleGroupClick = (groupId) => {
    console.log("Group ID clicked:", groupId);  // groupId가 제대로 넘어가는지 확인
    navigate(`/group-access/${groupId}`);  // GroupAccess 페이지로 이동
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
              onClick={() => handleGroupClick(group.id)}  // 클릭 시 그룹 접근 페이지로 이동
            >
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
