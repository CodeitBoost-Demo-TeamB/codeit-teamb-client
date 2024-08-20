//그룹 상세 페이지- 비공개 추억
//비공개그룹과 공개그룹 모두 사용

import React, { useState } from 'react';
import '../styles/PrivateMemory.css';

const privateGroups = [
  {
      id: 1,
      title: "여행 추억",
      dDay: 120,
      category: "비공개",
      description: "가족 여행에서의 추억이 가득합니다.",
      comments: 5,
      views: "500",
      image: "privateImage1.jpg"
  },
  // 더 많은 그룹 정보를 여기에 추가
];

function GroupCard({ group }) {
  return (
    <div className="group-card">
      <img src={group.image} alt={group.title} className="group-card-image" />
      <div className="group-info">
        <p className="group-dDay">D-{group.dDay} | {group.category}</p>
        <h3 className="group-title">{group.title}</h3>
        <p className="group-description">{group.description}</p>
        <p className="group-stats">
          댓글: {group.comments} | 조회수: {group.views}
        </p>
      </div>
    </div>
  );
}

function PrivateMemory() {
  const [visibleGroups, setVisibleGroups] = useState(privateGroups.slice(0, 3)); // 처음에는 3개의 그룹만 보여줌

  const loadMoreGroups = () => {
    setVisibleGroups(privateGroups); // 모든 그룹을 로드
  };

  return (
    <div className="memory-container">
      <div className="memory-header">
        {/* 그룹 정보 섹션 */}
      </div>
      <div className="memory-switch">
        <button className="switch-button">공개</button>
        <button className="switch-button active">비공개</button>
      </div>
      <div className="memory-list">
        {visibleGroups.map(group => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
      <button className="load-more-btn" onClick={loadMoreGroups}>더보기</button>
    </div>
  );
}

export default PrivateMemory;
