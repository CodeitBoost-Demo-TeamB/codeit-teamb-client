import React, { useState } from 'react';
import axios from 'axios';
import '../src/styles/CommentRegisterModal.css';

function CommentRegisterModal() {
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postId = 1; // 실제 게시물 ID로 교체해야 합니다.
      const commentData = { nickname, content: comment, password };
      await axios.post(`/https://codit-teamb-server.onrender.com/api/posts/${postId}/comments`, commentData);
      alert('댓글이 성공적으로 등록되었습니다!');
      resetForm();
      closeModal();
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  const resetForm = () => {
    setNickname('');
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
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>

              <label htmlFor="password">비밀번호 생성</label>
              <input
                type="password"
                id="password"
                placeholder="댓글 비밀번호를 생성해 주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="submit-button">등록하기</button>
            </form>
          </div>
        </div>
      )}
      <button onClick={openModal} className="open-modal-button">댓글 등록하기</button>
    </>
  );
}

export default CommentRegisterModal;
