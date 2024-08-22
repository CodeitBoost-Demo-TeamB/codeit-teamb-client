import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateGroup.css';

function CreateGroup() {
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [password, setPassword] = useState('');

  const handleToggleChange = () => {
    setIsPublic(!isPublic);
    if (isPublic) {
      setPassword(''); // 공개일 경우 비밀번호 제거
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // JSON 데이터 구성
    const groupData = {
      name: name,
	    password: password,
      imageUrl: imageUrl,
      isPublic: true,
      introduction: introduction
    };

    try {
      await axios.post('https://codit-teamb-server.onrender.com/api/groups', groupData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert('그룹이 성공적으로 생성되었습니다!');
      // 폼 초기화
      setName('');
      setIntroduction('');
      setIsPublic(false);
      setPassword('');
    } catch (error) {
      console.error('그룹 생성 실패:', error);
      alert('그룹 생성 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
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
            <label htmlFor="name">그룹명</label>
            <input
              type="text"
              id="name"
              placeholder="그룹명을 입력해 주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          <label htmlFor="image">이미지 URL</label>
          <input 
            type="text" 
            id="image" 
            placeholder="이미지 URL을 입력해 주세요"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)} 
          />

            <label htmlFor="instroduction">그룹 소개</label>
            <textarea
              id="instroduction"
              placeholder="그룹을 소개해 주세요"
              value={instroduction}
              onChange={(e) => setIntroduction(e.target.value)}
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
                <label htmlFor="password">비밀번호 생성</label>
                <input
                  type="password"
                  id="password"
                  placeholder="그룹 비밀번호를 생성해 주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
