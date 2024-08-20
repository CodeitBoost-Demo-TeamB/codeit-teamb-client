import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/MemoryContainer.css';
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
      const data = [

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
        },
        {
          id: 7,
          title: '크리스마스 이브',
          dDay: 365,
          category: '공개',
          description: '크리스마스 이브에 가족들과 함께 한 따뜻한 순간들.',
          comments: 15,
          views: '4.8K',
          image: 'christmasEve.jpg',
          isPublic: true, // 공개
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

  return (
    
    <div className="memory-container">
      {/* GroupHeader 렌더링 확인 */}
      <GroupHeader
        groupName="달봉이네 가족"
        dayCount={265}
        isPublic={isPublicFilter}
        memoriesCount={filteredMemories.length}
        groupSize={1.5}
      />
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
          <p>필터링된 추억이 없습니다.</p>
        ) : (
          filteredMemories.map(memory => (
            <div key={memory.id} className="memory-card">
              <img src={memory.image} alt={memory.title} />
              <h3>{memory.title}</h3>
              <p>{memory.description}</p>
              <p>댓글: {memory.comments} | 조회수: {memory.views}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MemoryContainer;
