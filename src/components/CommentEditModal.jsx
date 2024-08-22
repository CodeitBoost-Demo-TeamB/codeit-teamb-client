import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CommentEditModal.css';

function CommentEditModal() {
  const [nickname] = useState('공룡알'); // 닉네임은 수정 불가
  const [comment, setComment] = useState('우와 저도!');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const correctPassword = '12345'; // 실제 환경에서는 서버와 통신하여 확인

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === correctPassword) {
      try {
        const commentId = 123; // 실제 수정할 댓글 ID로 교체해야 합니다.
        await axios.put(
          `https://codit-teamb-server.onrender.com/api/comments/${commentId}`, 
          { content: comment }, 
          { headers: { 'Content-Type': 'application/json' } }
        );
        alert('댓글이 성공적으로 수정되었습니다!');
        resetForm();
        closeModal();
      } catch (error) {
        console.error('댓글 수정 실패:', error);
        alert('댓글 수정에 실패했습니다.');
      }
    } else {
      alert('비밀번호가 일치하지 않습니다. 다시 시도해 주세요.');
    }
  };

  const resetForm = () => {
    setComment('');
    setPassword('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal" id="edit-comment-modal">
          <div className="modal-content">
            <h2>댓글 수정</h2>
            <form id="edit-comment-form" onSubmit={handleSubmit}>
              <label htmlFor="edit-nickname">닉네임</label>
              <input
                type="text"
                id="edit-nickname"
                value={nickname}
                readOnly
              />

              <label htmlFor="edit-comment">댓글</label>
              <textarea
                id="edit-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>

              <label htmlFor="edit-password">수정 권한 인증</label>
              <input
                type="password"
                id="edit-password"
                placeholder="댓글 비밀번호를 입력해 주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="submit-button">
                수정하기
              </button>
            </form>
          </div>
        </div>
      )}
      <button onClick={openModal} className="open-modal-button">댓글 수정하기</button>
    </>
  );
}

export default CommentEditModal;
