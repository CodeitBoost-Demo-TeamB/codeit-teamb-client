// EditMemoryModal.js
import React from 'react';
import '../styles/EditMemoryModal.css';


const EditMemoryModal = ({ onClose, onSave, memoryData }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content edit-modal">
        <h2>추억 수정</h2>
        <form onSubmit={onSave}>
          <div className="modal-form-grid">
            <div>
              <label>닉네임</label>
              <input type="text" defaultValue={memoryData.nickname} required />
            </div>
            <div>
              <label>태그</label>
              <input type="text" defaultValue={memoryData.tags.join(', ')} />
            </div>
            <div>
              <label>제목</label>
              <input type="text" defaultValue={memoryData.title} required />
            </div>
            <div>
              <label>장소</label>
              <input type="text" defaultValue={memoryData.location} required />
            </div>
            <div>
              <label>이미지</label>
              <input type="file" />
            </div>
            <div>
              <label>추억의 순간</label>
              <input type="date" defaultValue={memoryData.moment} required />
            </div>
            <div>
              <label>본문</label>
              <textarea defaultValue={memoryData.content} required></textarea>
            </div>
            <div>
              <label>추억 공개 선택</label>
              <input type="checkbox" defaultChecked={memoryData.isPublic} /> 공개
            </div>
            <div>
              <label>수정 권한 인증</label>
              <input type="password" placeholder="비밀번호를 입력해 주세요" required />
            </div>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="save-btn">수정하기</button>
            <button type="button" onClick={onClose} className="cancel-btn">취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemoryModal;
