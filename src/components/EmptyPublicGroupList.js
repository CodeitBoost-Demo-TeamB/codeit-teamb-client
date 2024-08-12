import React from 'react';
import './EmptyPublicGroupList.css';

function EmptyPublicGroupList() {
  return (
    <div className="empty-public-group-list">
      <h1>공개 그룹 목록</h1>
      <p>등록된 공개 그룹이 없습니다.</p>
    </div>
  );
}

export default EmptyPublicGroupList;
