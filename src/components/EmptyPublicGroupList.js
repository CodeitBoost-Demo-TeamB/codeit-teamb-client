import React from 'react';

function EmptyGroupList() {
  return (
    <div className="empty-group-list">
      <div className="empty-icon">
        {/* 여기에 비어 있는 그룹의 아이콘을 추가할 수 있습니다 */}
        <img src="path_to_empty_icon.svg" alt="No Groups" />
      </div>
      <p className="empty-message">등록된 공개 그룹이 없습니다.</p>
      <p className="empty-submessage">가장 먼저 그룹을 만들어보세요!</p>
      <button className="btn create-group-btn">그룹 만들기</button>
    </div>
  );
}

export default EmptyGroupList;
