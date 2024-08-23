import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/MemoryContainer.css';
import GroupHeader from './GroupHeader';

function MemoryContainer() {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [memories, setMemories] = useState([]); // 초기값을 빈 배열로 설정
  const [filteredMemories, setFilteredMemories] = useState([]); 
  const [isPublicFilter, setIsPublicFilter] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`https://codit-teamb-server.onrender.com/api/groups/${groupId}`);
        const groupData = await response.json();
        setGroup(groupData);
      } catch (error) {
        console.error('그룹 데이터를 가져오는 데 오류가 발생했습니다:', error);
      }
    };

    const fetchMemories = async () => {
      try {
        const response = await fetch(`https://codit-teamb-server.onrender.com/api/groups/${groupId}/posts`);
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        const data = await response.json();

        // 받아온 데이터가 배열인지 확인
        if (Array.isArray(data)) {
          setMemories(data); // 배열일 경우만 상태에 저장
        } else {
          console.error('받아온 데이터가 배열이 아닙니다:', data);
          setMemories([]); // 배열이 아닌 경우 빈 배열로 설정
        }
      } catch (error) {
        console.error('추억 데이터를 가져오는 중 오류 발생:', error);
        setMemories([]); // 오류 발생 시 빈 배열로 설정
      }
    };

    fetchGroupData();
    fetchMemories();
  }, [groupId]);

  useEffect(() => {
    if (Array.isArray(memories)) {
      const filteredData = memories.filter(memory => memory.isPublic === isPublicFilter);
      setFilteredMemories(filteredData);
    }
  }, [isPublicFilter, memories]);

  const handleMemoryUploadClick = () => {
    navigate(`/${groupId}/create`);
  };

  const handlePublicClick = () => {
    setIsPublicFilter(true);
    navigate(`/memory/${groupId}`);
  };

  const handlePrivateClick = () => {
    setIsPublicFilter(false);
    navigate(`/private/${groupId}`);
  };

  // group이 아직 로드되지 않았다면 로딩 중 메시지를 표시
  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <div className="memory-container">
      {/* GroupHeader 렌더링 확인 */}
      <GroupHeader
        groupName={group.name}
        dayCount={Math.floor((new Date() - new Date(group.createdAt)) / (1000 * 60 * 60 * 24))}  // 그룹 생성 후 지난 일 수
        isPublic={group.isPublic}
        memoriesCount={filteredMemories.length}
        groupSize={group.likeCount}
        introduction1={group.introduction}
      />
      <div className="memory word">
        <p className="memory-title">추억 목록</p>
        <button className="memory-upload" onClick={handleMemoryUploadClick}>추억 올리기</button>
      </div>
      <div className="memory-switch">
        <button 
          className={`switch-button ${isPublicFilter ? 'active' : ''}`} 
          onClick={handlePublicClick}
        >
          공개
        </button>
        <button 
          className={`switch-button ${!isPublicFilter ? 'active' : ''}`} 
          onClick={handlePrivateClick}
        >
          비공개
        </button>
      </div>

      <div className="memory-list">
         {/* 필터링된 메모리 목록이 제대로 렌더링되는지 확인 */}
         {filteredMemories.length === 0 ? (
          <div className="Nodata">
            <p>게시된 추억이 없습니다.</p>
          </div>
        ) : (
          filteredMemories.map(memory => (
            <div key={memory.id} className="memory-card">
              <img src={memory.imageUrl} alt={memory.title} />
              <p>{memory.nickname} | {memory.isPublic ? '공개' : '비공개'}</p>
              <h3>{memory.title}</h3>
              <p>{memory.location} | {memory.moment}</p>
              <p>댓글: {memory.commentCount} | 좋아요: {memory.likeCount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MemoryContainer;
