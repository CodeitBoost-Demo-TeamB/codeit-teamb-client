//추억 상세 페이지
//비공개,공개그룹 접속시==>비공개,공개 추억시 모두 사용
// MemoryDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/MemoryDetails.css';

const groups = [
  {
    id: 1,
    title: "에델바이스",
    dDay: 265,
    category: "공개",
    description: "새로운 마음으로 응원하고 있는 담임님이 계십니다.",
    comments: 2,
    views: "1.5K",
    image: "image1.jpg"
  },
  // 더 많은 그룹 정보를 여기에 추가
];

function MemoryDetails() {
  const { id } = useParams();
  const memory = groups.find(group => group.id === parseInt(id));

  return (
    <div className="memory-details">
      <header className="memory-header">
        <h1>{memory.title}</h1>
        <p className="meta">D-{memory.dDay} | {memory.category}</p>
      </header>
      
      <section className="memory-content">
        <img 
          src={memory.image} 
          alt={memory.title} 
          className="memory-image" 
        />
        <p>{memory.description}</p>
      </section>
      
      <section className="comments-section">
        <h2>댓글 {memory.comments}</h2>
        {/* 댓글 내용 추가 가능 */}
      </section>
    </div>
  );
}

export default MemoryDetails;
