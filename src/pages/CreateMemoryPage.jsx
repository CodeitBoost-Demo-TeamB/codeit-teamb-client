//추억 작성 페이지
import "../components/MemoryContainer"
import React, { useState } from 'react';
import '../styles/CreatememoryPage.css';
import { useParams } from 'react-router-dom';


function CreateMemoryPage() {
  //const groupId  ='66c704188018b6d3ceb8b32b'; // URL에서 groupId 가져오기 //예시로 1
  const {groupId} = useParams();  // URL에서 groupId 추출
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postPassword, setPostPassword] = useState();
  const [groupPassword, setGroupPassword] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [moment, setMoment] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 태그를 쉼표로 구분된 문자열에서 배열로 변환
    const tagsArray = tags.split(',').map(tag => tag.trim());

    // 서버로 전송할 데이터를 객체로 구성
    const memoryData = {

      nickname: nickname,
      title: title,
      content: content,
      postPassword: postPassword,
      imageUrl: imageUrl,
      tags: tagsArray,
      location: location,
      moment: moment,
      isPublic: isPublic
    };

    try {
      const response = await fetch(`https://codit-teamb-server.onrender.com/api/groups/${groupId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memoryData), // 데이터를 JSON 형식으로 변환하여 전송
      });

      if (!response.ok) {
        throw new Error('추억 생성에 실패했습니다.');
      }

      const data = await response.json();
      console.log('추억 생성 성공:', data);
      // 성공 후 처리 (예: 페이지 이동, 상태 초기화 등)
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  return (
    <div className="create-memory-page">
      <h1>추억 올리기</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="left-form">
          <label htmlFor="nickname">닉네임</label>
          <input 
            type="text" 
            id="nickname" 
            placeholder="닉네임을 입력해 주세요" 
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <label htmlFor="title">제목</label>
          <input 
            type="text" 
            id="title" 
            placeholder="제목을 입력해 주세요" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="image">이미지 URL</label>
          <input 
            type="text" 
            id="image" 
            placeholder="이미지 URL을 입력해 주세요"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)} 
          />

          <label htmlFor="content">본문</label>
          <textarea 
            id="content" 
            placeholder="본문 내용을 입력해 주세요" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="right-form">
          <label htmlFor="tags">태그</label>
          <input 
            type="text" 
            id="tags" 
            placeholder="#태그 (쉼표로 구분)" 
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <label htmlFor="location">장소</label>
          <input 
            type="text" 
            id="location" 
            placeholder="장소를 입력해 주세요" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label htmlFor="date">추억의 순간</label>
          <input 
            type="date" 
            id="date" 
            value={moment}
            onChange={(e) => setMoment(e.target.value)}
          />

          <label htmlFor="public-toggle">추억 공개 선택</label>
          <div className="toggle-container">
            <span>공개</span>
            <input 
              type="checkbox" 
              id="public-toggle" 
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          </div>

          <label htmlFor="password">비밀번호</label>
          <input 
            type="password" 
            id="password" 
            placeholder="비밀번호를 입력해 주세요" 
            value={postPassword}
            onChange={(e) => setPostPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button">올리기</button>
      </form>
    </div>
  );
}

export default CreateMemoryPage;
