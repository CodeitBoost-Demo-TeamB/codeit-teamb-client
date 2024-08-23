import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PublicGroupList.css';

function PublicGroupList() {
  const [groups, setGroups] = useState([]);  // 그룹 데이터를 저장하는 상태
  const [page, setPage] = useState(1);  // 현재 페이지 번호
  const [pageSize, setPageSize] = useState(4);  // 페이지당 그룹 수
  const [sortBy, setSortBy] = useState('latest');  // 정렬 기준
  const [keyword, setKeyword] = useState('');  // 검색어
  const [isPublic, setIsPublic] = useState(true);  // 공개/비공개 여부
  const [totalPages, setTotalPages] = useState(0);  // 전체 페이지 수
  const [totalItemCount, setTotalItemCount] = useState(0);  // 전체 아이템 수
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // 서버로부터 그룹 데이터를 요청하는 API 호출
        const response = await axios.get('https://codit-teamb-server.onrender.com/api/groups', {
          params: {
            page: page,
            pageSize: pageSize,
            sortBy: sortBy,
            keyword: keyword,
            isPublic: true
          }
        });

        // 응답 데이터를 설정
        if (Array.isArray(response.data.data)) {
          setGroups((prevGroups) => [...prevGroups, ...response.data.data]);  // 이전 그룹 목록에 새 그룹 추가
          setTotalPages(response.data.totalPages);  // 전체 페이지 수 설정
          setTotalItemCount(response.data.totalItemCount);  // 전체 아이템 수 설정
        } else {
          console.error("그룹 데이터가 배열이 아닙니다:", response.data);
          setGroups([]);
        }
      } catch (error) {
        console.error('그룹 목록을 가져오는 데 실패했습니다:', error);
      }
    };

    fetchGroups();
  }, [page, pageSize, sortBy, keyword, isPublic]);  // 파라미터가 변경될 때마다 호출

  const handleGroupClick = (groupId) => {
    navigate(`/memory/${groupId}`);  // 그룹 클릭 시 해당 그룹의 ID를 URL에 포함하여 메모리 페이지로 이동
  };

  
  const loadMoreGroups = () => {
    if (page < totalPages) {
      setPage(page + 1);  // 다음 페이지로 이동
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setPage(1);  // 검색 시 페이지 번호 초기화
    setGroups([]);  // 그룹 목록 초기화
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);  // 정렬 변경 시 페이지 번호 초기화
    setGroups([]);  // 그룹 목록 초기화
  };

  const handlePublicToggle = (publicStatus) => {
    setIsPublic(publicStatus);
    setPage(1);  // 페이지 번호를 1로 초기화
    setGroups([]);  // 그룹 목록 초기화
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
