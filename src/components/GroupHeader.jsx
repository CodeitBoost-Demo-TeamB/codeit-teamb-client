// GroupHeader.jsx
import React from 'react';
import '../styles/GroupHeader.css';  // 스타일링 파일은 필요에 맞게 추가

function GroupHeader({ groupName, dayCount, isPublic, memoriesCount, groupSize }) {
  return (
    <div className="group-header">
      <div className="group-header-content">
        <img 
          src="your-image-url-here.jpg"  // 이미지 경로는 동적으로 받아올 수도 있습니다
          alt={groupName}
          className="group-header-image"
        />
        <div className="group-header-info">
          <span className="group-day-count">D+{dayCount}</span>
          <span className="group-visibility">{isPublic ? '공개' : '비공개'}</span>
          <h2 className="group-name">{groupName}</h2>
          <p>추억 {memoriesCount} | 그룹 공감 {groupSize}K</p>
          <div className="group-badges">
            <span>🎖️ 7일 연속 게시글 등록</span>
            <span>🌟 그룹 공감 1만개 이상 받기</span>
            <span>💖 추억 공감 1만개 이상 받기</span>
          </div>
        </div>
      </div>
      <div className="group-header-actions">
        <button>그룹 정보 수정하기</button>
        <button>그룹 삭제하기</button>
        <button className="group-share-btn">공감 보내기</button>
      </div>
    </div>
  );
}

export default GroupHeader;
