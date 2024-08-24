import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/MemoryContainer.css';
import GroupHeader from './GroupHeader';
import MemoryDetails  from '../pages/MemoryDetails';

function MemoryContainer() {
  const { groupId } = useParams(); // URL에서 groupId 추출
  const [group, setGroup] = useState(null);
  const [memories, setMemories] = useState([]); // 추억 목록
  const [filteredMemories, setFilteredMemories] = useState([]); // 필터링된 추억 목록
  const [isPublicFilter, setIsPublicFilter] = useState(true); // 공개/비공개 필터 상태 관리
  const navigate = useNavigate();

  useEffect(() => {
    // 그룹 데이터를 가져오는 함수
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`https://codit-teamb-server.onrender.com/api/groups/${groupId}`);
        console.log("Response Status:", response.status); // 응답 상태 확인
        const groupData = await response.json();
        console.log("Group Data:", groupData); // 그룹 데이터 확인
        setGroup(groupData); // 그룹 정보 저장
      } catch (error) {
        console.error('그룹 데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    // 추억 데이터를 가져오는 함수
    const fetchMemories = async () => {
      try {
        const response = await fetch(`https://codit-teamb-server.onrender.com/api/groups/${groupId}/posts`);
        const data = await response.json();

        // 받아온 데이터가 올바른 형식인지 확인
        if (data && data.data && Array.isArray(data.data)) {
          setMemories(data.data); // 추억 목록 저장
        } else {
          console.error('추억 데이터를 가져오는 중 오류가 발생했습니다:', data);
        }
      } catch (error) {
        console.error('추억 데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchGroupData(); // 그룹 정보 가져오기
    fetchMemories(); // 추억 목록 가져오기
  }, [groupId]);

  useEffect(() => {
    // 공개/비공개 필터링
    const filteredData = memories.filter(memory => memory.isPublic === isPublicFilter);
    setFilteredMemories(filteredData);
  }, [isPublicFilter, memories]);

  const handleMemoryClick = (memory) => {
    // 추억 카드를 클릭할 때 추억의 ID와 그룹 ID를 기반으로 세부 페이지로 이동
    navigate(`/memory/${groupId}/${memory.id}`, { state: { memory } });
  };

  const handleMemoryUploadClick = () => {
    navigate(`/${groupId}/create`);
  };

  const handlePublicClick = () => {
    setIsPublicFilter(true); // 공개 필터 설정
    navigate(`/memory/${groupId}`); // 공개 추억 페이지로 이동
  };

  const handlePrivateClick = () => {
    setIsPublicFilter(false); // 비공개 필터 설정
    navigate(`/private/${groupId}`); // 비공개 추억 페이지로 이동
  };

  // group이 아직 로드되지 않았다면 로딩 중 메시지를 표시
  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <div className="memory-container">
      {/* GroupHeader 컴포넌트에 그룹 정보를 전달 */}
      <GroupHeader
        groupName={group.name || '알 수 없는 그룹'}
        dayCount={group.createdAt ? Math.floor((new Date() - new Date(group.createdAt)) / (1000 * 60 * 60 * 24)) : '알 수 없음'} // 그룹 생성 후 지난 일 수 계산
        isPublic={group.isPublic}
        memoriesCount={group.postCount || 0} // 그룹의 전체 추억 갯수
        groupSize={group.likeCount  || 0 }
        introduction1={group.introduction || '소개 정보가 없습니다.' }
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
            <div key={memory.id} className="memory-card"
            onClick={() => handleMemoryClick(memory)}> {/*의심부분*/}
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
