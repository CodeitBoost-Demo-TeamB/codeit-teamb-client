import React, { useState } from 'react';
import './CommentRegisterModal.css';

function CommentRegisterModal() {
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      nickname,
      comment,
      password
    });
  };

  return (
    <div className="comment-register-modal">
      <h2>댓글 등록</h2>
      <form onSubmit={handleSubmit}>
        <label>
          닉네임
          <input 
            type="text" 
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
            placeholder="닉네임을 입력해 주세요"
            required 
          />
        </label>
        <label>
          댓글
          <textarea 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            placeholder="댓글을 입력해 주세요"
            required 
          />
        </label>
        <label>
          비밀번호 생성
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="댓글 비밀번호를 생성해 주세요"
            required 
          />
        </label>
        <button type="submit" className="submit-button">등록하기</button>
      </form>
    </div>
  );
}

export default CommentRegisterModal;
