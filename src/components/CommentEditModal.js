import React, { useState } from 'react';
import './CommentEditModal.css';

function CommentEditModal() {
  const [comment, setComment] = useState('우와 저도');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 댓글 수정 로직 작성
    console.log({
      nickname: '공룡알', // 닉네임은 고정
      comment,
      password
    });
  };

  return (
    <div className="comment-edit-modal">
      <h2>댓글 수정</h2>
      <form onSubmit={handleSubmit}>
        <label>
          닉네임
          <input 
            type="text" 
            value="공룡알" 
            readOnly 
            className="readonly-input"
          />
        </label>
        <label>
          댓글
          <textarea 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            required 
          />
        </label>
        <label>
          수정 권한 인증
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="댓글 비밀번호를 입력해 주세요"
            required 
          />
        </label>
        <button type="submit" className="submit-button">등록하기</button>
      </form>
    </div>
  );
}

export default CommentEditModal;
