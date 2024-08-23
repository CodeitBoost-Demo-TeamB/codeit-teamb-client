import React, { useState } from 'react';
import '../styles/PublicMemory.css';
import GroupHeader from '../components/GroupHeader';
import MemoryContainer from '../components/MemoryContainer';
import DeleteGroupModal from '../components/DeleteGroupModal'; // 모달 컴포넌트 임포트



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
  //const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리
  const [filteredMemories, setFilteredMemories] = useState(memories.filter(memory => memory.isPublic)); // 기본적으로 공개된 메모리만 표시
  const [visibleMemories, setVisibleMemories] = useState(filteredMemories.slice(0, 3)); // 처음에는 3개의 메모리만 보여줌

 /* const openModal = () => {
    setIsModalOpen(true);
    console.log("모달 열림");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
*/

  const loadMoreMemories = () => {
    const moreMemories = memories.slice(visibleMemories.length, visibleMemories.length + 3);
    setVisibleMemories(prevMemories => [...prevMemories, ...moreMemories]);
    //setVisibleMemories(filteredMemories); // 모든 필터링된 메모리를 로드
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
        //onDeleteClick={openModal} // 모달 열기 함수 전달
      />

      {/* DeleteGroupModal */}
      <DeleteGroupModal isOpen={isModalOpen} onClose={closeModal} />

      {/* MemoryContainer 사용 */}
      {/*<MemoryContainer memories={memories} setFilteredMemories={setFilteredMemories} />*/}

      {/* 필터링된 추억 리스트 */}
      <div className="memory-list">
        {visibleMemories.map(memory => (
          <GroupCard key={memory.id} memory={memory} />
        ))}
      </div>
      
      {/* 더보기 버튼 
      {visibleMemories.length < filteredMemories.length && (
        <button className="load-more-btn" onClick={loadMoreMemories}>더보기</button>
      )}*/}

      {/* 더보기 버튼을 항상 하단에 표시 */}
      <div className="load-more-container">
        <button className="load-more-btn" onClick={loadMoreMemories}>더보기</button>
      </div>
    </div>
  );
}

export default PublicMemory;
