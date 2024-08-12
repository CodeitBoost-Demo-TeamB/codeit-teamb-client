import React, { useState } from 'react';
import './CreateGroup.css';

function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [groupType, setGroupType] = useState('public');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Group Name:', groupName);
    console.log('Group Type:', groupType);
    // 추가적인 로직 구현 가능
  };

  return (
    <div className="create-group">
      <h1>그룹 만들기</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="그룹 이름을 입력해 주세요"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <select value={groupType} onChange={(e) => setGroupType(e.target.value)}>
          <option value="public">공개 그룹</option>
          <option value="private">비공개 그룹</option>
        </select>
        <button type="submit">그룹 만들기</button>
      </form>
    </div>
  );
}

export default CreateGroup;
