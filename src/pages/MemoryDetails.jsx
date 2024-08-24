import React, { useState, useEffect } from 'react';
import '../styles/MemoryDetails.css';
import CommentRegisterModal from '../components/CommentRegisterModal'; // 모달 추가
import EditMemoryModal from '../pages/EditMemoryModal'; // 추억 수정 모달 추가
import DeleteMemoryModal from '../pages/DeleteMemoryModal'; // 추억 삭제 모달 추가
import strawberryImage from '../images/strawberry.jpg';

function MemoryDetails() {
  const [memory, setMemory] = useState(null);
  const [comments, setComments] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); // 댓글 모달 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 추억 수정 모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 추억 삭제 모달 상태
  const [modalKey, setModalKey] = useState(0); // 모달을 재초기화하기 위한 키

  // 예시 데이터
  const exampleMemory = {
    id: 123,
    groupId: 123,
    nickname: '딸기빵',
    title: '딸기보단 초코지',
    content: '사실 전 초코빵이 되고싶어요 \ 여러분은 머가 더 좋으신지?초코?딸기?',
    imageUrl: strawberryImage,
    tags: ['초코', '딸기'],
    location: '딸기네 집',
    moment: '2024-08-23',
    isPublic: true,
    likeCount: 15,
    commentCount: 2,
    createdAt: '2024-08-23T07:47:49.803Z',
  };

  const exampleComments = [
    {
      id: 1,
      nickname: '딸기쉐이크',
      content: '이 바보야 딸기가 최고지',
      createdAt: '2024-08-23T08:00:00.000Z',
    },
    {
      id: 2,
      nickname: '초코라떼',
      content: '왜 그런 생각을 하시는지?',
      createdAt: '2024-08-23T09:30:00.000Z',
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setMemory(exampleMemory);
      setComments(exampleComments);
      setLoading(false); 
    }, 500);
  }, []);

  // 모달에서 새로운 댓글 추가하는 함수
  const handleAddComment = (nickname, content) => {
    const newComment = {
      id: comments.length + 1,
      nickname: nickname,
      content: content,
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
    setIsModalOpen(false); // 댓글 모달 닫기
  };

  // 댓글 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
    setModalKey(modalKey + 1); // 모달을 초기화하기 위해 key 값 증가
  };

  // 추억 수정 모달 열기
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  // 추억 삭제 모달 열기
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  // 댓글 삭제 함수
  const handleCommentDelete = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!memory) {
    return <div>Loading...</div>;
  }

  return (
    <div className="memory-detail-container">
      <header className="memory-header">
        <h1 className="memory-title2">🐥{memory.title}</h1>
        <div className="memory-meta">
          <span className="memory-day-count">D-{new Date(memory.moment).toLocaleDateString()}</span>
          <span className="memory-visibility">{memory.isPublic ? '공개' : '비공개'}</span>
        </div>
        <div className="memory-sub-info">
          <span>{memory.location} | {new Date(memory.createdAt).toLocaleString()}</span>
          <span>좋아요: {memory.likeCount} | 댓글: {comments.length}</span>
        </div>
      </header>

      <main className="memory-content">
        {memory.imageUrl && <img src={memory.imageUrl} alt={memory.title} className="memory-image" />} 
        <div className="memory-description-box">
          <p className="memory-description">✏️{memory.content}</p>
        </div>
        <div className="memory-tags">
          {memory.tags.map((tag, index) => (
            <span key={index} className="memory-tag">#{tag}</span>
          ))}
        </div>

        {/* 추억 수정하기 및 삭제하기 버튼 */}
        <div className="memory-actions">
          <button onClick={openEditModal} className="edit-btn1">추억 수정하기</button>
          <button onClick={openDeleteModal} className="delete-btn1">추억 삭제하기</button>
        </div>
      </main>

      <section className="comments-section">
        <h2>댓글 {comments.length}</h2>
        <button onClick={openModal} className="open-modal-button">댓글 등록하기</button>
        {isModalOpen && <CommentRegisterModal key={modalKey} onAddComment={handleAddComment} />} {/* 댓글 모달 열기 */}
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <p>
                <strong>{comment.nickname}</strong> | {new Date(comment.createdAt).toLocaleString()}
              </p>
              <p>{comment.content}</p>
              <button className="comment-delete-btn" onClick={() => handleCommentDelete(comment.id)}>
                댓글 삭제
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 추억 수정 모달 */}
      {isEditModalOpen && <EditMemoryModal onClose={() => setIsEditModalOpen(false)} />}

      {/* 추억 삭제 모달 */}
      {isDeleteModalOpen && <DeleteMemoryModal onClose={() => setIsDeleteModalOpen(false)} memoryId={memory.id} />}
    </div>
  );
}

export default MemoryDetails;
