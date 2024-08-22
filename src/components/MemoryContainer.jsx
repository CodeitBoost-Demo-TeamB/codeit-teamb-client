import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/MemoryContainer.css';
import "../pages/CreateMemoryPage"
import GroupHeader from './GroupHeader';  // GroupHeader 임포트

function MemoryContainer() {
  const [memories, setMemories] = useState([]); // 전체 데이터 관리
  const [filteredMemories, setFilteredMemories] = useState([]); // 필터링된 데이터 관리
  const [isPublicFilter, setIsPublicFilter] = useState(true); // 공개/비공개 필터 상태 관리
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 예시 데이터 또는 API 호출로 데이터를 가져옴
    const fetchMemories = async () => {

      try {
        const response = await fetch('/api/groups/{groupId}/posts'); // 그룹 ID를 실제 값으로 변경해야 합니다.
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        const data = await response.json(); // 응답을 JSON 형식으로 파싱
        setMemories(data); // 받아온 데이터를 상태에 저장
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
      
      const data = [
        {
          "id": 0,
          "nickname": "johndoe123",
          "title": "해변에서의 여름 휴가",
          "imageUrl": "https://example.com/images/beach.jpg",
          "tags": ["휴가", "바다", "여름"],
          "location": "제주도 해변",
          "moment": "2024-07-15",
          "isPublic": true,
          "likeCount": 123,
          "commentCount": 45,
          "createdAt": "2024-07-16T10:30:00.000Z"
        },
        {
          id: 1,
          title: '에델바이스',
          dDay: 265,
          category: '공개',
          description: '새로운 마음으로 응원하고 있는 담임님이 계십니다.',
          comments: 10,
          views: '1.5K',
          image: 'image1.jpg',
          isPublic: true, // 공개
        },
        {
          id: 2,
          title: '가족과의 시간',
          dDay: 120,
          category: '비공개',
          description: '가족들과 함께 보낸 아름다운 순간들.',
          comments: 5,
          views: '500',
          image: 'privateImage1.jpg',
          isPublic: false, // 비공개
        },
        {
          id: 3,
          title: '해변에서의 여름',
          dDay: 300,
          category: '공개',
          description: '해변에서 보낸 즐거운 여름 휴가.',
          comments: 8,
          views: '2.2K',
          image: 'beach.jpg',
          isPublic: true, // 공개
        },
        {
          id: 4,
          title: '봄 소풍',
          dDay: 90,
          category: '비공개',
          description: '가족과 함께한 봄날의 소풍 이야기.',
          comments: 4,
          views: '320',
          image: 'springPicnic.jpg',
          isPublic: false, // 비공개
        },
        {
          id: 5,
          title: '겨울 산책',
          dDay: 50,
          category: '공개',
          description: '눈 덮인 산길을 걸으며 찍은 멋진 사진들.',
          comments: 12,
          views: '3.5K',
          image: 'winterWalk.jpg',
          isPublic: true, // 공개
        },
        {
          id: 6,
          title: '생일 파티',
          dDay: 180,
          category: '비공개',
          description: '친구들과 함께 보낸 생일 파티의 추억.',
          comments: 7,
          views: '1.1K',
          image: 'birthdayParty.jpg',
          isPublic: false, // 비공개
        } 
     
      ];
      setMemories(data);
    };

    fetchMemories();
  }, []);

  useEffect(() => {
    if (location.pathname.includes('/private')) {
      setIsPublicFilter(false); // 비공개 필터 설정
    } else {
      setIsPublicFilter(true); // 공개 필터 설정
    }
  }, [location]);

  // 필터링된 데이터를 관리하는 useEffect
  useEffect(() => {
    const filteredData = memories.filter(memory => memory.isPublic === isPublicFilter);
    setFilteredMemories(filteredData); // 필터링된 데이터를 상태로 저장
  }, [isPublicFilter, memories]);

  const handleMemoryUploadClick = () => {
    console.log("Memory Upload Button Clicked"); 
    navigate('/create'); // 추억 올리기 버튼 클릭 시 /create 경로로 이동
  };

  return (
    
    <div className="memory-container">
      {/* GroupHeader 렌더링 확인 */}
      <GroupHeader
        groupName="달봉이네 가족"
        dayCount={265}
        isPublic={true}
        memoriesCount={memories.length}
        groupSize={1.5}
      />
      <div className="memory word">
        <p className="memory-title">추억 목록</p>
        <button className="memory-upload" onClick={handleMemoryUploadClick}>추억 올리기</button>
      </div>
      <div className="memory-switch">
        <button 
          className={`switch-button ${isPublicFilter ? 'active' : ''}`} 
          onClick={() => navigate('/memory')}
        >
          공개
        </button>
        <button 
          className={`switch-button ${!isPublicFilter ? 'active' : ''}`} 
          onClick={() => navigate('/private')}
        >
          비공개
        </button>
      </div>

      <div className="memory-list">
         {/* 필터링된 메모리 목록이 제대로 렌더링되는지 확인 */}
         {filteredMemories.length === 0 ? (
          <div className="Nodata">
          <p>게시된 추억이 없습니다.</p>
          </div>
        ) : (
          filteredMemories.map(memory => (
            <div key={memory.id} className="memory-card">
              <img src={memory.imageUrl} alt={memory.title} />
              <p>{memory.nickname} | {memory.isPublic ? '공개' : '비공개'}</p>
              <h3>{memory.title}</h3>
              <p>{memory.location} | {memory.moment}</p>
              <p>댓글: {memory.commentCount} | 좋아요: {memory.likeCount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MemoryContainer;
