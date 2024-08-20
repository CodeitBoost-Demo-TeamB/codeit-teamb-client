//비공개,공개 그룹 전환을 설정하는 컴포넌트 
import React, { useState } from 'react';
import PublicMemory from '../pages/PublicMemory';
import PrivateMemory from '../pages/PrivateMemory';
import './MemoryContainer.css';

function MemoryContainer() {
  const [isPublic, setIsPublic] = useState(true); // true면 공개, false면 비공개

  return (
    <div className="memory-container">
      <div className="memory-switch">
        <button 
          className={`switch-button ${isPublic ? 'active' : ''}`} 
          onClick={() => setIsPublic(true)}
        >
          공개
        </button>
        <button 
          className={`switch-button ${!isPublic ? 'active' : ''}`} 
          onClick={() => setIsPublic(false)}
        >
          비공개
        </button>
      </div>
      {isPublic ? <PublicGroupMemory /> : <PrivateGroupMemory />}
    </div>
  );
}

export default MemoryContainer;
