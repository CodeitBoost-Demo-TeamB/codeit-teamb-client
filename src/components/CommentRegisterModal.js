import React from 'react';
import './CommentRegisterModal.css';

function CommentRegisterModal() {
  return (
    <div className="comment-register-modal">
      <h2>댓글 등록</h2>
      <input type="text" placeholder="닉네임을 입력해 주세요" />
      <textarea placeholder="댓글을 입력해 주세요"></textarea>
      <input type="password" placeholder="댓글 비밀번호를 생성해 주세요" />
      <button>등록하기</button>
    </div>
  );
}

export default CommentRegisterModal;
