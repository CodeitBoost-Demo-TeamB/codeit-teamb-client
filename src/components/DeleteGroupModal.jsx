import React, { useState }from 'react';
import '../styles/DeleteGroupModal.css';

function DeleteGroupModal({groupId, onClose, onDeleteSuccess}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://codit-teamb-server.onrender.com/api/groups/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // 그룹 삭제 성공 시 처리
        onDeleteSuccess();
        onClose();
      } else {
        // 오류 처리
        const errorData = await response.json();
        setError(errorData.message || '그룹 삭제 중 오류가 발생했습니다.');
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="modal-overlay1" onClick={onClose}>
      <div className="modal-content1" onClick={e => e.stopPropagation()}>
        <h2>그룹 삭제</h2>
        <p>삭제 권한 인증</p>
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          className="modal-input1"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="modal-delete-button1" onClick={handleDelete} >삭제하기</button>
        <button className="modal-close-button1" onClick={onClose} >닫기</button>
      </div>
    </div>
  );
}

export default DeleteGroupModal;
