import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PublicGroupList.css';
import cheeseduckImage from '../images/cheeseduck.jpg';

// Star 클래스 정의 (cham 브랜치에는 이 부분이 없으므로 삭제됩니다)

function PublicGroupList() {
  // 페이지 상태 관리
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [sortBy, setSortBy] = useState('latest');
  const [keyword, setKeyword] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const navigate = useNavigate();
  const scrollPositionRef = useRef(0);

  // 그룹 목록 가져오기
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
            setGroups(response.data.data);
          } else {
            setGroups((prevGroups) => [...prevGroups, ...response.data.data]);
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
    scrollPositionRef.current = window.scrollY;
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, scrollPositionRef.current);
  }, [groups]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  const handlePublicToggle = (publicStatus) => {
    if (publicStatus) {
      setIsPublic(true);
      setPage(1);
    } else {
      navigate('/private-groups');
    }
  };

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: 'white', border: '2px solid #ffe644', boxShadow: '0 2px 20px rgba(36, 17, 0, 0.1)', position: 'relative', top: '0', width: '100%', zIndex: '100', flexShrink: '0', boxSizing: 'border-box', margin: '0 auto'}}>
        <div className="logo">
          <h1>🐥조각집🐥</h1>
        </div>
        <div className="group-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className={`filter-btn ${isPublic ? 'active' : ''}`} onClick={() => handlePublicToggle(true)}
            style={{ backgroundColor: '#FFAF00', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '5px' }}
          >
            공개
          </button>
          <button className={`filter-btn ${!isPublic ? 'active' : ''}`} onClick={() => handlePublicToggle(false)}>
            비공개
          </button>
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
          <button className="create-group-btn" 
            onClick={() => navigate('/create-group')}
            style={{ backgroundColor: '#FFAF00', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '5px' }}
          >
            그룹 만들기
          </button>
        </div>
      </header>

      <div className="main-container" style={{ 
        position: 'relative', 
        zIndex: 0, 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        boxSizing: 'border-box', 
        overflow: 'hidden',
        backgroundColor: '#FFF7D5' 
      }}>

        <main className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', flexGrow: 1, overflowY: 'auto' }}>
          <div className="info-bar" style={{ textAlign: 'center', margin: '20px 0', fontSize: '16px', width: '100%' }}>
            <p>현재 페이지: {page} / 총 페이지: {totalPages}</p>
            <p>총 그룹 수: {totalItemCount}</p>
          </div>
          <div className="groups" id="groups" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', padding: '20px', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
            {groups.map((group) => (
              <div className="group-block" key={group.id} onClick={() => handlePublicGroupClick(group.id)} style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', transition: 'transform 0.3s ease, box-shadow 0.3s ease', minHeight: '200px' }}>
                <img src={cheeseduckImage} alt={group.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderBottom: '1px solid #ddd', marginBottom: '16px' }} />
                <div className="group-info">
                  <div className="title" style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>{group.name}</div>
                  <div className="description" style={{ fontSize: '1rem', color: '#666', marginBottom: '12px' }}>{group.introduction}</div>
                  <div className="meta" style={{ fontSize: '0.875rem', color: '#999', marginBottom: '12px' }}>
                    <span>{new Date(group.createdAt).toLocaleDateString()}</span> | <span>{group.likeCount} 공감</span>
                  </div>
                  <div className="badges">획득 배지: {group.badgeCount}</div>
                  <div className="posts">게시글 수: {group.postCount}</div>
                </div>
              </div>
            ))}
          </div>
          {page < totalPages && (
            <div className="load-more-container" style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '20px' }}>
              <button className="load-more-btn" onClick={loadMoreGroups} style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#FFAF00', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                더보기
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default PublicGroupList;
