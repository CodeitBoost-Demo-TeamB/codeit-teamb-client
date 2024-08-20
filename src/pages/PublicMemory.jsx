import React, { useState } from 'react';
import '../styles/PublicMemory.css';
import GroupHeader from '../components/GroupHeader';
import MemoryContainer from '../components/MemoryContainer';

const memories = [
  {
    id: 1,
    title: "에델바이스",
    dDay: 265,
    category: "공개",
    description: "새로운 마음으로 응원하고 있는 담임님이 계십니다.",
    comments: 2,
    views: "1.5K",
    image: "image1.jpg",
    isPublic: true  // 공개 여부
  },
  {
    id: 2,
    title: "추억의 바다",
    dDay: 365,
    category: "비공개",
    description: "가족들과 함께한 아름다운 바다 여행입니다.",
    comments: 10,
    views: "3.2K",
    image: "image2.jpg",
    isPublic: false  // 비공개 여부
  },
  // 더 많은 추억 데이터를 추가 가능
];

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

function PublicMemory() {
  const [filteredMemories, setFilteredMemories] = useState(memories.filter(memory => memory.isPublic)); // 기본적으로 공개된 메모리만 표시
  const [visibleMemories, setVisibleMemories] = useState(filteredMemories.slice(0, 3)); // 처음에는 3개의 메모리만 보여줌

  const loadMoreMemories = () => {
    setVisibleMemories(filteredMemories); // 모든 필터링된 메모리를 로드
  };

  // 그룹 데이터 예시
  const groupData = {
    groupName: "에델바이스",
    dayCount: 265,
    isPublic: true,
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

export default PublicMemory;
