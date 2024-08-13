import React from 'react';
import '../styles/PrivateGroupList.css';

const groups = [
  { id: 1, title: '달맞이 가족', dDay: 265, category: '비공개', comments: 8, views: '1.5K' },
  { id: 2, title: '달맞이 가족', dDay: 265, category: '비공개', comments: 8, views: '1.5K' },
];

function PrivateGroupList() {
  return (
    <div className="private-group-list">
      <h1 className="page-title">조각집</h1>
      <div className="group-list">
        {groups.map((group) => (
          <div key={group.id} className="group-card">
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

export default PrivateGroupList;
