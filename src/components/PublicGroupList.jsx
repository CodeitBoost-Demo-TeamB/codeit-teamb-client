import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PublicGroupList.css';
import cheeseduckImage from '../images/cheeseduck.jpg'

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
  const scrollPositionRef = useRef(0); // 스크롤 위치 저장

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
          if (page === 1) {
            setGroups(response.data.data);  // 페이지가 1이면 목록을 초기화
          } else {
            setGroups((prevGroups) => [...prevGroups, ...response.data.data]);  // 페이지가 1이 아니면 기존 목록에 추가
          }
          setTotalPages(response.data.totalPages);
          setTotalItemCount(response.data.totalItemCount);
        } else {
          console.error("그룹 데이터가 배열이 아닙니다:", response.data);
          setGroups([]);
        }
      } catch (error) {
        console.error('그룹 목록을 가져오는 데 실패했습니다:', error);
        setGroups([]);
      }
    };

    fetchGroups();
  }, [page, pageSize, sortBy, keyword, isPublic]);

  const handlePublicGroupClick = (groupId) => {
    navigate(`/memory/${groupId}`);
  };

  const loadMoreGroups = () => {
    scrollPositionRef.current = window.scrollY;  // 현재 스크롤 위치 저장
    if (page < totalPages) {
      setPage(page + 1);  // 페이지 증가
    }
  };

  useEffect(() => {
    // 데이터 로드 후 스크롤 위치 복원
    window.scrollTo(0, scrollPositionRef.current);
  }, [groups]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setPage(1);  // 검색 시 페이지를 1로 초기화
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);  // 정렬 변경 시 페이지를 1로 초기화
  };

  const handlePublicToggle = (publicStatus) => {
    if (publicStatus) {
      setIsPublic(true);
      setPage(1);  // 공개로 변경 시 페이지를 1로 초기화
    } else {
      navigate('/private-groups');  // 비공개 버튼을 누르면 /private-groups로 이동
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <h1>🐥조각집🐥</h1>
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

      <div className="main-container">
        <main className="main-content">
          <div className="info-bar">
            <p>현재 페이지: {page} / 총 페이지: {totalPages}</p>
            <p>총 그룹 수: {totalItemCount}</p>
          </div>
          <div className="groups" id="groups">
            {groups.map((group) => (
              <div className="group-block" key={group.id} onClick={() => handlePublicGroupClick(group.id)}>
                <img src={cheeseduckImage} alt={group.name} />
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
            <div className="load-more-container">
              <button className="load-more-btn" onClick={loadMoreGroups}>더보기</button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default PublicGroupList;
