import React, { useState } from 'react';
import '../styles/GroupHeader.css';  // 스타일링 파일은 필요에 맞게 추가
import DeleteGroupModal from './DeleteGroupModal'; // 모달 컴포넌트 임포트
import EditGroupModal from './EditGroupModal';  // 수정 모달 임포트

function GroupHeader({ groupName, dayCount, isPublic, memoriesCount, groupSize }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEditClick = (e) => {
    e.preventDefault();
    setEditModalOpen(true);  // 그룹 수정 모달 열기
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setDeleteModalOpen(true);  // 그룹 삭제 모달 열기
  };

  return (
    <div className="group-header">
      <div className="group-header-content">
        <img 
          src="your-image-url-here.jpg"  // 이미지 경로는 동적으로 받아올 수도 있습니다
          alt={groupName}
          className="group-header-image"
        />
        <div className="group-header-info">
          <div className="group-header-top">
            <span className="group-day-count">D+{dayCount}</span>
            <span className="group-visibility">{isPublic ? '공개' : '비공개'}</span>
          </div>
          <h2 className="group-name">{groupName}</h2>
          <p className="group-meta">
            추억 {memoriesCount} | 그룹 공감 {groupSize}
          </p>
          <p className="group-description">
            서로 한 마음으로 응원하고 아끼는 {groupName}입니다.
          </p>
          <div className="group-badges">
            <span className="badge">🎖️ 7일 연속 게시글 등록</span>
            <span className="badge">🌟 그룹 공감 1만개 이상 받기</span>
            <span className="badge">💖 추억 공감 1만개 이상 받기</span>
          </div>
        </div>
      </div>
      <div className="group-header-actions">
        <button className="action-button1" onClick={handleEditClick}>그룹 정보 수정하기</button>
        <button className="action-button2" onClick={handleDeleteClick}>그룹 삭제하기</button>
        <button className="group-share-btn">공감 보내기</button>
      </div>

      {/* 그룹 수정 모달 */}
      {isEditModalOpen && <EditGroupModal onClose={() => setEditModalOpen(false)} />}

      {/* 그룹 삭제 모달 */}
      {isDeleteModalOpen && <DeleteGroupModal onClose={() => setDeleteModalOpen(false)} />}
    </div>
  );
}

export default GroupHeader;
