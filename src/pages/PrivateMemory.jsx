import React, { useState } from 'react';
import '../styles/PrivateMemory.css';
import GroupHeader from '../components/GroupHeader';
import MemoryContainer from '../components/MemoryContainer'; // MemoryContainer 사용

const memories = [
  {
    id: 1,
    title: "여행 추억",
    dDay: 120,
    category: "비공개",
    description: "가족 여행에서의 추억이 가득합니다.",
    comments: 5,
    views: "500",
    image: "privateImage1.jpg",
    isPublic: false // 비공개 여부 추가
  },
  {
    id: 2,
    title: "가족과의 시간",
    dDay: 200,
    category: "공개",
    description: "가족과 보낸 소중한 시간입니다.",
    comments: 8,
    views: "1.2K",
    image: "publicImage1.jpg",
    isPublic: true // 공개 여부 추가
  },
  // 더 많은 그룹 데이터를 추가 가능
];

// GroupCard 컴포넌트는 각 메모리 항목을 카드로 렌더링합니다.
function GroupCard({ memory }) {
  return (
    <div className="group-card">
      <img src={memory.image} alt={memory.title} className="group-card-image" />
      <div className="group-info">
        <p className="group-dDay">D-{memory.dDay} | {memory.category}</p>
        <h3 className="group-title">{memory.title}</h3>
        <p className="group-description">{memory.description}</p>
        <p className="group-stats">
          댓글: {memory.comments} | 조회수: {memory.views}
        </p>
      </div>
    </div>
  );
}

function PrivateMemory() {
  const [filteredMemories, setFilteredMemories] = useState(memories.filter(memory => !memory.isPublic)); // 비공개 추억만 필터링
  const [visibleMemories, setVisibleMemories] = useState(filteredMemories.slice(0, 3)); // 처음에는 3개의 메모리만 보여줌

  const loadMoreMemories = () => {
    setVisibleMemories(filteredMemories); // 모든 필터링된 메모리를 로드
  };

  // 그룹 데이터 예시
  const groupData = {
    groupName: "달봉이네 가족",
    dayCount: 265,
    isPublic: false, // 현재 페이지는 비공개 추억이므로 비공개로 설정
    memoriesCount: filteredMemories.length,
    groupSize: 1.5,
  };

  return (
    <div>
      {/* 상단 고정된 GroupHeader 컴포넌트 */}
      <GroupHeader 
        groupName={groupData.groupName}
        dayCount={groupData.dayCount}
        isPublic={groupData.isPublic}
        memoriesCount={groupData.memoriesCount}
        groupSize={groupData.groupSize}
      />

      {/* MemoryContainer 사용 */}
      <MemoryContainer memories={memories} setFilteredMemories={setFilteredMemories} />

      {/* 필터링된 추억 리스트 */}
      <div className="memory-list">
        {visibleMemories.map(memory => (
          <GroupCard key={memory.id} memory={memory} />
        ))}
      </div>
      
      {/* 더보기 버튼 */}
      {visibleMemories.length < filteredMemories.length && (
        <button className="load-more-btn" onClick={loadMoreMemories}>더보기</button>
      )}
    </div>
  );
}

export default PrivateMemory;
