import React, { useState } from 'react';
import './CommentDeleteModal.css';

function CommentDeleteModal({ onClose }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 댓글 삭제 로직 작성
    console.log("Entered Password: ", password);
    // 추가 로직: 비밀번호가 확인되면 삭제 처리 후 모달 닫기
  };

  return (
    <div className="comment-delete-modal">
      <div className="modal-header">
        <h2>댓글 삭제</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          삭제 권한 인증
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="댓글 비밀번호를 입력해 주세요"
            required 
          />
        </label>
        <button type="submit" className="delete-button">삭제하기</button>
      </form>
    </div>
  );
}

export default CommentDeleteModal;
