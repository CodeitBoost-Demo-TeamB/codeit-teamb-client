import React from 'react';
import '../styles/DeleteGroupModal.css';

function DeleteGroupModal({ onClose }) {
  return (
    <div className="modal-overlay1" onClick={onClose}>
      <div className="modal-content1" onClick={e => e.stopPropagation()}>
        <h2>그룹 삭제</h2>
        <p>삭제 권한 인증</p>
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          className="modal-input1"
        />
        <button className="modal-delete-button1">삭제하기</button>
        <button className="modal-close-button1" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default DeleteGroupModal;
