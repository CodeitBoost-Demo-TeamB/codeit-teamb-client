// DeleteMemoryModal.js
import React from 'react';
import MemoryDetails from './MemoryDetails';
import '../styles/DeleteMemoryModal.css';

const DeleteMemoryModal = ({ onClose, onDelete }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>추억 삭제</h2>
        <form onSubmit={onDelete}>
          <label>삭제 권한 인증</label>
          <input type="password" placeholder="비밀번호를 입력해 주세요" required />
          <div className="modal-buttons">
            <button type="submit" className="delete-btn">삭제하기</button>
            <button type="button" onClick={onClose} className="cancel-btn">취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteMemoryModal;
