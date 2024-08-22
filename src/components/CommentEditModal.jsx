import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CommentEditModal.css';

function CommentEditModal() {
  const commentId = "1"; // 실제로 수정할 댓글 ID
  const [nickname] = useState(''); // 닉네임은 수정 불가
  const [content, setContent] = useState(''); // 수정할 댓글 내용
  const [password, setPassword] = useState(''); // 입력할 비밀번호
  const [isModalOpen, setIsModalOpen] = useState(true);
  const correctPassword = '12345'; // 실제 환경에서는 서버와 통신하여 확인

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 수정할 댓글 데이터
    const updatedComment = {
      nickname,
      content,
      password
    };

    // 비밀번호가 올바른지 확인
    if (password === correctPassword) {
      try {
        // 서버로 수정된 댓글 전송
        await axios.put(
          `https://codit-teamb-server.onrender.com/api/comments/${commentId}`, 
          updatedComment, // 수정된 댓글 데이터 전송
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

  // 폼 초기화 함수
  const resetForm = () => {
    setContent('');
    setPassword('');
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 모달 열기 함수
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
