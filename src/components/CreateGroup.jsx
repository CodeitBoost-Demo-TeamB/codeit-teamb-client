import React, { useState } from 'react';
import '../src/styles/CreateGroup.css';

function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [groupPassword, setGroupPassword] = useState('');

  const handleToggleChange = () => {
    setIsPublic(!isPublic);
    if (isPublic) {
      setGroupPassword(''); // 공개일 경우 비밀번호 제거
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setGroupImage(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } else {
      setGroupImage(null);
      setFileName('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const groupData = {
      groupName,
      groupImage,
      groupDescription,
      groupVisibility: isPublic ? '공개' : '비공개',
      groupPassword: isPublic ? '' : groupPassword,
    };

    console.log(groupData);
    alert('그룹이 성공적으로 생성되었습니다!');
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <h1>조각집</h1>
        </div>
      </header>

      <main>
        <div className="create-group-form">
          <h2>그룹 만들기</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="group-name">그룹명</label>
            <input
              type="text"
              id="group-name"
              placeholder="그룹명을 입력해 주세요"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />

            <label htmlFor="group-image">대표 이미지</label>
            <div className="file-input-wrapper">
              <input
                type="text"
                id="file-name"
                value={fileName}
                placeholder="파일을 선택해 주세요"
                readOnly
              />
              <label htmlFor="group-image" className="file-button">파일 선택</label>
              <input
                type="file"
                id="group-image"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>

            <label htmlFor="group-description">그룹 소개</label>
            <textarea
              id="group-description"
              placeholder="그룹을 소개해 주세요"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              required
            ></textarea>

            <label>그룹 공개 선택</label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="public-checkbox"
                className="toggle-checkbox"
                checked={isPublic}
                onChange={handleToggleChange}
              />
              <label htmlFor="public-checkbox" className="toggle-label"></label>
            </div>

            {!isPublic && (
              <>
                <label htmlFor="group-password">비밀번호 생성</label>
                <input
                  type="password"
                  id="group-password"
                  placeholder="그룹 비밀번호를 생성해 주세요"
                  value={groupPassword}
                  onChange={(e) => setGroupPassword(e.target.value)}
                  required
                />
              </>
            )}

            <button type="submit" className="create-button">만들기</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateGroup;
