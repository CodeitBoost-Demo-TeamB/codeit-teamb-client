//그룹 상세 페이지 - 데이터없음
//비공개그룹 공개 그룹 모두 사용(접속시 아직 데이터가 없을 때)

import React from 'react';
import '../styles/NoDataMemory.css';

function NoDataMemory() {
  return (
    <div className="no-data-memory-container">
      <div className="no-data-message">
        <img src="no-data-image.jpg" alt="추억이 없습니다" className="no-data-image" />
        <p>아직 등록된 추억이 없습니다.</p>
      </div>
      <button className="upload-memory-button">추억 올리기</button>
    </div>
  );
}

export default NoDataMemory;
