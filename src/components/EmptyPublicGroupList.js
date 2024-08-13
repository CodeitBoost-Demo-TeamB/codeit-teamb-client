import React from 'react';
import '../styles/EmptyPublicGroupList.css';

function EmptyPublicGroupList() {
  return (
    <div className="empty-public-group-list">
      <h1 className="page-title">조각집</h1>
      <div className="no-groups">
        <p>등록된 공개 그룹이 없습니다.</p>
      </div>
    </div>
  );
}

export default EmptyPublicGroupList;
