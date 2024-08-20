import React, { useState } from 'react';
import '../src/styles/CommentDeleteModal.css';

function CommentDeleteModal() {
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const correctPassword = '12345'; // 실제 환경에서는 서버와 통신하여 확인

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === correctPassword) {
      alert('댓글이 성공적으로 삭제되었습니다!');
      // 여기에 실제 댓글 삭제 로직 추가 (예: 서버 요청)
      resetForm();
      closeModal();
    } else {
      alert('비밀번호가 일치하지 않습니다. 다시 시도해 주세요.');
    }
  };

  const resetForm = () => {
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
        <div className="modal" id="delete-comment-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <h2>댓글 삭제</h2>
            <form id="delete-comment-form" onSubmit={handleSubmit}>
              <label htmlFor="delete-password">삭제 권한 인증</label>
              <input
                type="password"
                id="delete-password"
                placeholder="댓글 비밀번호를 입력해 주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="submit-button">
                삭제하기
              </button>
            </form>
          </div>
        </div>
      )}
      <button onClick={openModal} className="open-modal-button">댓글 삭제하기</button>
    </>
  );
}

export default CommentDeleteModal;
