import React, { useState } from 'react';
import '../styles/CommentRegisterModal.css';

function CommentRegisterModal({ onAddComment }) {
  const [nickname, setNickname] = useState(''); 
  const [content, setContent] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(true); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname || !content) return;

    onAddComment(nickname, content);
    setNickname('');
    setContent('');
    setIsModalOpen(false); 
  };

  const handleCancel = () => {
    setIsModalOpen(false); 
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal" id="comment-modal">
          <div className="modal-content">
            <h2>댓글 등록</h2>
            <form id="comment-form" onSubmit={handleSubmit}>
              <label htmlFor="nickname">닉네임</label>
              <input
                type="text"
                id="nickname"
                placeholder="닉네임을 입력해 주세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />

              <label htmlFor="comment">댓글</label>
              <textarea
                id="comment"
                placeholder="댓글을 입력해 주세요"
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                required
              ></textarea>

              <div className="button-group">
                <button type="submit" className="submit-button">등록하기</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CommentRegisterModal;
