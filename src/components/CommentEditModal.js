import React from 'react';
import './CommentEditModal.css';

function CommentEditModal() {
  return (
    <div className="comment-edit-modal">
      <h2>댓글 수정</h2>
      <input type="text" value="공룡알" readOnly />
      <textarea value="우와 저도"></textarea>
      <input type="password" placeholder="댓글 비밀번호를 입력해 주세요" />
      <button>등록하기</button>
    </div>
  );
}

export default CommentEditModal;
