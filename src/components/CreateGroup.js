import React, { useState } from 'react';
import './CreateGroup.css';

function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      groupName,
      groupImage,
      groupDescription,
      isPublic,
      password
    });
  };

  return (
    <div className="create-group-form">
      <header className="header">
        <h1 className="logo">조각집</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <h2>그룹 만들기</h2>
        <label>
          그룹명
          <input 
            type="text" 
            value={groupName} 
            onChange={(e) => setGroupName(e.target.value)} 
            placeholder="그룹명을 입력해 주세요"
            required 
          />
        </label>
        <label>
          대표 이미지
          <input 
            type="file" 
            onChange={(e) => setGroupImage(e.target.files[0])} 
            required 
          />
        </label>
        <label>
          그룹 소개
          <textarea 
            value={groupDescription} 
            onChange={(e) => setGroupDescription(e.target.value)} 
            placeholder="그룹을 소개해 주세요"
            required 
          />
        </label>
        <label>
          그룹 공개 선택
          <div className="toggle-switch">
            <span>공개</span>
            <input 
              type="checkbox" 
              checked={isPublic} 
              onChange={(e) => setIsPublic(e.target.checked)} 
            />
          </div>
        </label>
        {!isPublic && (
          <label>
            비밀번호 생성
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="그룹 비밀번호를 생성해 주세요"
              required={!isPublic} 
            />
          </label>
        )}
        <button type="submit" className="create-button">만들기</button>
      </form>
    </div>
  );
}

export default CreateGroup;
