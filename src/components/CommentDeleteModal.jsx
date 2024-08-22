import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CommentDeleteModal.css';

function CommentDeleteModal() {
  const commentId = "1"; // 실제로 삭제할 댓글 ID
  const [password, setPassword] = useState(''); // 입력할 비밀번호
  const [message, setMessage] = useState(''); // 서버로부터 받은 메시지 상태
  const [isModalOpen, setIsModalOpen] = useState(true); // 모달 열림 상태

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 댓글 삭제 요청
      const response = await axios.delete(
        `https://codit-teamb-server.onrender.com/api/comments/${commentId}`, 
        {
          data: { password }, // 비밀번호를 요청 데이터로 전송
          headers: { 'Content-Type': 'application/json' }
        }
      );

      // 성공 처리
      if (response.status === 200) {
        setMessage(response.data.message || '댓글이 성공적으로 삭제되었습니다!');
        resetForm(); // 폼 초기화
        closeModal(); // 모달 닫기
      }
    } catch (error) {
      // 오류 응답 처리
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setMessage(error.response.data.message || '잘못된 요청입니다.');
        } else if (status === 403) {
          setMessage(error.response.data.message || '비밀번호가 틀렸습니다.');
        } else if (status === 404) {
          setMessage(error.response.data.message || '존재하지 않습니다.');
        } else {
          setMessage('댓글 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
      } else {
        setMessage('서버와의 통신 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  // 폼 초기화 함수
  const resetForm = () => {
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
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      )}
      <button onClick={openModal} className="open-modal-button">댓글 삭제하기</button>
    </>
  );
}

export default CommentDeleteModal;

