import React from 'react';
import '../styles/PublicGroupList.css';

const groups = [
  { id: 1, image: 'image1.jpg', title: '에델바이스', dDay: 265, category: '공개', comments: 2, views: '1.5K' },
  { id: 2, image: 'image2.jpg', title: '에델바이스', dDay: 265, category: '공개', comments: 2, views: '1.5K' },
];

function PublicGroupList() {
  return (
    <div className="public-group-list">
      <h1 className="page-title">조각집</h1>
      <div className="group-list">
        {groups.map((group) => (
          <div key={group.id} className="group-card">
            <img src={group.image} alt={group.title} className="group-image" />
            <div className="group-info">
              <p className="group-d-day">D-{group.dDay}</p>
              <p className="group-category">{group.category}</p>
              <h3 className="group-title">{group.title}</h3>
              <div className="group-details">
                <p>모집글</p>
                <p>{group.comments}</p>
                <p>조회수</p>
                <p>{group.views}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="pagination">
        <button className="pagination-btn">더보기</button>
      </footer>
    </div>
  );
}

export default PublicGroupList;
