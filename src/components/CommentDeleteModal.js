import React from 'react';
import './CommentDeleteModal.css';

function CommentDeleteModal() {
  return (
    <div className="comment-delete-modal">
      <h2>댓글 삭제</h2>
      <p>삭제 권한 인증</p>
      <input type="password" placeholder="댓글 비밀번호를 입력해 주세요" />
      <button>삭제하기</button>
    </div>
  );
}

export default CommentDeleteModal;
