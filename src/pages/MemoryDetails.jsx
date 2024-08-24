import React, { useState, useEffect } from 'react';
import '../styles/MemoryDetails.css';
import { useParams, useLocation } from 'react-router-dom';
// import axios from 'axios'; // 서버와 연결시 주석 해제
import DeleteMemoryModal from './DeleteMemoryModal';
import EditMemoryModal from './EditMemoryModal';

function MemoryDetails() {
  const { postId } = useParams(); // URL에서 groupId와 memoryId 추출
  const location = useLocation(); // useLocation으로 state에 접근
  const [memory, setMemory] = useState(null); // 게시글 데이터 상태
  const [comments, setComments] = useState([]); // 댓글 목록 상태
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태, 예시 데이터 사용할 때 false로 설정
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // 삭제 모달 상태
  const [isEditModalOpen, setEditModalOpen] = useState(false); // 수정 모달 상태
  const [error, setError] = useState(null); // 에러 상태 관리

  // 예시 데이터
  const exampleMemory = {
    id: 123,
    groupId: 123,
    nickname: 'JohnDoe',
    title: '인천 앞바다에서 무려 60cm 월척을 낚다!',
    content: '인천 앞바다에서 월척을 낚았습니다! 가족들과 즐거운 시간을 보냈습니다.',
    imageUrl: 'https://example.com/fishing.jpg',
    tags: ['낚시', '여행'],
    location: '인천',
    moment: '2024-02-21',
    isPublic: true,
    likeCount: 15,
    commentCount: 2,
    createdAt: '2024-02-22T07:47:49.803Z',
  };

  const exampleComments = [
    {
      id: 1,
      nickname: 'JaneDoe',
      content: '와, 정말 멋진 낚시 경험이네요!',
      createdAt: '2024-02-22T08:00:00.000Z',
    },
    {
      id: 2,
      nickname: 'FishingExpert',
      content: '60cm라니 대단하네요!',
      createdAt: '2024-02-22T09:30:00.000Z',
    },
  ];

  useEffect(() => {
    // UI 테스트를 위해 하드코딩된 예시 데이터를 사용
    setTimeout(() => {
      setMemory(exampleMemory);
      setComments(exampleComments);
      setLoading(false); // 로딩 상태 종료
    }, 500); // UI 테스트를 위해 약간의 지연 추가

    /* 
    // 실제 서버와 연결할 때 주석 해제
    if (!memory) {
      const fetchMemoryDetails = async () => {
        try {
          const response = await axios.get(`https://codit-teamb-server.onrender.com/api/posts/${postId}`);
          setMemory(response.data); // 서버에서 받은 추억 데이터 설정
          setComments(response.data.comments || []); // 댓글 데이터 저장
          setLoading(false); // 로딩 상태 종료
        } catch (err) {
          console.error('추억 데이터를 가져오는 중 오류가 발생했습니다:', err);
          setError('추억 데이터를 가져오는 중 오류가 발생했습니다.');
          setLoading(false); // 로딩 상태 종료
        }
      };
      fetchMemoryDetails();
    } else {
      setLoading(false);
    }
    */
  }, [memory, postId]);

  // 댓글 추가 함수
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment) return;

    // 예시로 댓글 추가 로직
    const newCommentObject = {
      id: comments.length + 1,
      nickname: 'CurrentUser',
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, newCommentObject]);
    setNewComment('');

    /* 
    // 실제 서버와 연결할 때 주석 해제
    try {
      const response = await axios.post(`https://codit-teamb-server.onrender.com/api/posts/${postId}/comments`, { content: newComment });
      setComments([...comments, response.data]);
      setNewComment(''); // 입력 필드 초기화
    } catch (err) {
      console.error('댓글 등록 중 오류 발생:', err);
    }
    */
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // 에러 발생 시 메시지 표시
  }

  // 게시글 데이터가 없을 경우
  if (!memory) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const handleDelete = (e) => {
    e.preventDefault();
    console.log('삭제되었습니다.');
    setDeleteModalOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('수정되었습니다.');
    setEditModalOpen(false);
  };

  return (
    <div className="memory-detail-container">
      <header className="memory-header">
        <h1 className="memory-title">{memory.title}</h1>
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
        <p className="memory-description">{memory.content}</p>
        <div className="memory-tags">
          {memory.tags.map((tag, index) => (
            <span key={index} className="memory-tag">#{tag}</span>
          ))}
        </div>
      </main>

      <section className="comments-section">
        <h2>댓글 {comments.length}</h2>
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <textarea
            placeholder="댓글을 작성하세요..."
            className="comment-textarea"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button type="submit" className="comment-submit-btn">댓글 등록하기</button>
        </form>
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <p>
                <strong>{comment.nickname}</strong> | {new Date(comment.createdAt).toLocaleString()}
              </p>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </section>

      {isDeleteModalOpen && (
        <DeleteMemoryModal onClose={() => setDeleteModalOpen(false)} onDelete={handleDelete} />
      )}

      {isEditModalOpen && (
        <EditMemoryModal onClose={() => setEditModalOpen(false)} onSave={handleSave} memoryData={memory} />
      )}
    </div>
  );
}

export default MemoryDetails;
