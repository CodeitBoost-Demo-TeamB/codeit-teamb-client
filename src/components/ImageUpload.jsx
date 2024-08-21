import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // 파일 선택 처리
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);  // 선택된 파일을 상태로 저장
  };

  // 이미지 업로드 및 URL 받아오기
  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('이미지를 선택해 주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);  // 'image' 키에 파일 추가

    try {
      // 이미지 업로드를 위한 POST 요청
      const response = await axios.post('/api/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // 서버로부터 받은 이미지 URL을 상태로 저장
      setImageUrl(response.data.imageUrl);
      alert('이미지 업로드 성공!');
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <label htmlFor="imageFile">이미지 파일 선택:</label>
        <input
          type="file"
          id="imageFile"
          onChange={handleFileChange}
          accept="image/*"  // 이미지 파일만 허용
          required
        />

        <button type="submit">이미지 업로드</button>
      </form>

      {/* 이미지가 업로드된 후 URL을 통해 이미지를 표시 */}
      {imageUrl && (
        <div>
          <h3>업로드된 이미지:</h3>
          <img src={imageUrl} alt="업로드된 이미지" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
