import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CreateGroup.css';

function CreateGroup() {
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태 추가
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleToggleChange = () => {
    setIsPublic(!isPublic);
    if (isPublic) {
      setPassword(''); // 공개일 경우 비밀번호 제거
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // 선택한 파일을 상태로 설정
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = '';

      // Step 1: 이미지를 FormData로 전송
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const imageResponse = await axios.post('https://codit-teamb-server.onrender.com/api/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // 서버에서 반환된 이미지 URL 저장
        imageUrl = imageResponse.data.imageUrl;
      }

      // Step 2: JSON 형식으로 나머지 데이터를 전송
      const groupData = {
        name,
        introduction,
        isPublic,
        password: isPublic ? 'public-group-placeholder-password' : password,
        imageUrl, // 이미지 URL을 JSON 데이터에 추가
      };

      const response = await axios.post('https://codit-teamb-server.onrender.com/api/groups', groupData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('그룹이 성공적으로 생성되었습니다!');
        // 성공 시, 적절한 페이지로 리다이렉트
        navigate(isPublic ? '/PublicGroupList' : '/PrivateGroupList');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message || '잘못된 요청입니다.');
      } else {
        alert('그룹 생성 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
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

            <label htmlFor="image">대표 이미지</label>
            <input 
              type="file" 
              id="image" 
              onChange={handleFileChange} // 파일 변경 시 처리
              accept="image/*" // 이미지 파일만 허용
            />

            <label htmlFor="introduction">그룹 소개</label>
            <textarea
              id="introduction"
              placeholder="그룹을 소개해 주세요"
              value={introduction}
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
