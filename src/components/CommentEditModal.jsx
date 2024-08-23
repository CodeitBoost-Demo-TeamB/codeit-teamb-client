import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CommentEditModal.css';

function CommentEditModal() {
  const commentId = "1"; // 실제로 수정할 댓글 ID
  const [nickname] = useState(''); // 닉네임은 수정 불가
  const [content, setContent] = useState(''); // 수정할 댓글 내용
  const [password, setPassword] = useState(''); // 입력할 비밀번호
  const [message, setMessage] = useState(''); // 서버로부터 받은 메시지 상태
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 수정할 댓글 데이터
    const updatedComment = {
      nickname,
      content,
      password
    };

    try {
      // 서버로 수정된 댓글 전송
      const response = await axios.put(
        `https://codit-teamb-server.onrender.com/api/comments/${commentId}`,
        updatedComment,
        { headers: { 'Content-Type': 'application/json' } }
      );

      // 성공 처리
      if (response.status === 200) {
        setMessage("댓글이 성공적으로 수정되었습니다!");
        resetForm(); // 폼 초기화
        closeModal(); // 모달 닫기
      }
    } catch (error) {
      // 오류 응답 처리
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          alert(error.response.data.message || '잘못된 요청입니다.');
        } else if (status === 403) {
          alert(error.response.data.message || '비밀번호가 틀렸습니다.');
        } else if (status === 404) {
          alert(error.response.data.message || '존재하지 않습니다.');
        } else {
          alert('댓글 수정 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
      } else {
        alert('서버와의 통신 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
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
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      )}
      <button onClick={openModal} className="open-modal-button">댓글 수정하기</button>
    </>
  );
}

export default CommentEditModal;
