import React, { useState } from 'react';
import '../styles/EditGroupModal.css';

function EditGroupModal({ onClose }) {
  const { groupId } ="66c72e0515caa86a4f2cafeb"; // URL에서 groupId 가져오기 //예시로 1  
  const [groupName, setGroupName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    const updatedGroupData = {
        name: groupName,
        password: password,
        imageUrl: imageUrl,
        isPublic: isPublic,
        introduction: introduction
      };

      try {
        const response = await fetch(`https://codit-teamb-server.onrender.com/api/groups/${groupId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedGroupData), // 데이터를 JSON으로 변환하여 요청
        });

        if (!response.ok) {
            throw new Error('그룹 정보 수정에 실패했습니다.');
          }

          const data = await response.json();
          console.log('그룹 정보 수정 성공:', data);
          onClose(); // 모달 닫기
        } catch (error) {
          console.error('오류 발생:', error);
        }
      };


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>그룹 정보 수정</h2>
        <form onSubmit={handleSubmit}>
          <label>그룹명</label>
          <input type="text" placeholder="그룹명을 입력해 주세요" 
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          />

          <label>대표 이미지</label>
          <input type="text"
          placeholder="이미지 URL을 입력해 주세요"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
           />

          <label>그룹 소개</label>
          <textarea placeholder="그룹을 소개해 주세요"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}></textarea>

          <label>그룹 공개 선택</label>
          <input type="checkbox" 
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}/> 공개

          <label>수정 권한 인증</label>
          <input type="password" placeholder="비밀번호를 입력해 주세요"
           value={password}
           onChange={(e) => setPassword(e.target.value)} />

          <button type="submit">수정하기</button>
        </form>
        <button className="modal-close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default EditGroupModal;
