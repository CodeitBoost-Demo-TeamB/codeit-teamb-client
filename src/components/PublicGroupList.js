import React from 'react';
import './PublicGroupList.css';

function PublicGroupList() {
  const publicGroups = ['Group A', 'Group B', 'Group C']; // 임의의 데이터

  return (
    <div className="public-group-list">
      <h1>공개 그룹 목록</h1>
      <ul>
        {publicGroups.map((group, index) => (
          <li key={index}>{group}</li>
        ))}
      </ul>
    </div>
  );
}

export default PublicGroupList;
