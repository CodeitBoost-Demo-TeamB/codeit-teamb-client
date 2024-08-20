//추억 작성 페이지

import React from 'react';
import '../styles/CreatememoryPage.css';

function CreateMemoryPage() {
  return (
    <div className="create-memory-page">
      <h1>추억 올리기</h1>
      <div className="form-container">
        <div className="left-form">
          <label htmlFor="nickname">닉네임</label>
          <input type="text" id="nickname" placeholder="닉네임을 입력해 주세요" />

          <label htmlFor="title">제목</label>
          <input type="text" id="title" placeholder="제목을 입력해 주세요" />

          <label htmlFor="image">이미지</label>
          <input type="file" id="image" />

          <label htmlFor="content">본문</label>
          <textarea id="content" placeholder="본문 내용을 입력해 주세요"></textarea>
        </div>

        <div className="right-form">
          <label htmlFor="tags">태그</label>
          <input type="text" id="tags" placeholder="#태그" />

          <label htmlFor="location">장소</label>
          <input type="text" id="location" placeholder="장소를 입력해 주세요" />

          <label htmlFor="date">추억의 순간</label>
          <input type="date" id="date" />

          <label htmlFor="public-toggle">추억 공개 선택</label>
          <div className="toggle-container">
            <span>공개</span>
            <input type="checkbox" id="public-toggle" />
          </div>

          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호를 입력해 주세요" />
        </div>
      </div>

      <button className="submit-button">올리기</button>
    </div>
  );
}

export default CreateMemoryPage;
