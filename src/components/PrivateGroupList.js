import React from 'react';
import './PrivateGroupList.css';

function PrivateGroupList() {
  const privateGroups = ['Private Group 1', 'Private Group 2', 'Private Group 3']; // 임의의 데이터

  return (
    <div className="private-group-list">
      <h1>비공개 그룹 목록</h1>
      <ul>
        {privateGroups.map((group, index) => (
          <li key={index}>{group}</li>
        ))}
      </ul>
    </div>
  );
}

export default PrivateGroupList;
