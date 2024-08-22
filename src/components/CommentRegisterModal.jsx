import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CommentRegisterModal.css';

function CommentRegisterModal({ postId }) {
  const commentId = "1"; // 실제로 댓글과 관련된 작업에 사용할 댓글 ID
  const [nickname, setNickname] = useState(''); // 닉네임 입력 상태
  const [content, setContent] = useState(''); // 댓글 내용 입력 상태
  const [password, setPassword] = useState(''); // 비밀번호 입력 상태
  const [message, setMessage] = useState(''); // 서버로부터 받은 메시지 상태
  const [isModalOpen, setIsModalOpen] = useState(true); // 모달 열림 상태

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 댓글 등록 데이터 객체
    const registerCommentData = {
      nickname,
      content,
      password
    };

    try {
      // 댓글 등록 요청
      const response = await axios.post(
        `https://codit-teamb-server.onrender.com/api/posts/${postId}/comments`,
        registerCommentData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200 || response.status === 201) {
        const { id, nickname, content, createdAt } = response.data;
        setMessage(`댓글이 성공적으로 등록되었습니다!\nID: ${id}, 닉네임: ${nickname}, 내용: ${content}, 작성일: ${new Date(createdAt).toLocaleString()}`);
        resetForm(); // 폼 초기화
        closeModal(); // 모달 닫기
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // 요청 양식 오류 시 메시지 설정
        setMessage(error.response.data.message || '잘못된 요청입니다.');
      } else {
        // 기타 오류 처리
        setMessage('댓글 등록 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  // 폼 초기화 함수
  const resetForm = () => {
    setNickname('');
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
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      )}
      <button onClick={openModal} className="open-modal-button">댓글 등록하기</button>
    </>
  );
}

export default CommentRegisterModal;
