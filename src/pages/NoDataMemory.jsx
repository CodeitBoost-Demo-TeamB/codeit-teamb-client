import React from 'react';
import '../styles/NoDataMemory.css';
import GroupHeader from '../components/GroupHeader'; // GroupHeader 컴포넌트 추가

function NoDataMemory() {
  // 그룹 데이터 예시 (실제 데이터는 서버에서 받아올 수도 있음)

  
  const groupData = {
    groupName: "달봉이네 가족",
    dayCount: 265,
    isPublic: false, // 현재 페이지는 비공개 추억이므로 비공개로 설정
    memoriesCount:0,
    groupSize: 1.5,
  };

  return (
    <div className="no-data-memory-page">
      {/* 상단 고정된 GroupHeader 컴포넌트 */}
      <GroupHeader 
        groupName={groupData.groupName}
        dayCount={groupData.dayCount}
        isPublic={groupData.isPublic}
        memoriesCount={groupData.memoriesCount}
        groupSize={groupData.groupSize}
      />

      <div className="no-data-memory-container">
        <div className="no-data-message">
          <img src="no-data-image.jpg" alt="추억이 없습니다" className="no-data-image" />
          <p>아직 등록된 추억이 없습니다.</p>
        </div>
        <button className="upload-memory-button">추억 올리기</button>
      </div>
    </div>
  );
}

export default NoDataMemory;
