//그룹 상세 페이지-공개 추억
//비공개 그룹과 공개그룹 모두 사용

import React, { useState } from 'react';
import 'styles/PublicMemory.css';

const groups = [
  {
      id: 1,
      title: "에델바이스",
      dDay: 265,
      category: "공개",
      description: "새로운 마음으로 응원하고 있는 담임님이 계십니다.",
      comments: 2,
      views: "1.5K",
      image: "image1.jpg"
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

function PublicMemory() {
  const [visibleGroups, setVisibleGroups] = useState(groups.slice(0, 3)); // 처음에는 3개의 그룹만 보여줌

  const loadMoreGroups = () => {
    setVisibleGroups(groups); // 모든 그룹을 로드
  };

  return (
    <div className="memory-container">
      <div className="memory-header">
        {/* 그룹 정보 섹션 */}
      </div>
      <div className="memory-switch">
        <button className="switch-button active">공개</button>
        <button className="switch-button">비공개</button>
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

export default PublicMemory;
