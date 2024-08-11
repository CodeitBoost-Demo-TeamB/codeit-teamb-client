import React from 'react';

function GroupCard({ group }) {
  return (
    <div className="group-card">
      <img src={group.image} alt={group.name} className="group-image" />
      <div className="group-info">
        <div className="group-header">
          <span className="group-d">D-{group.d}</span>
          <span className="group-status">{group.status}</span>
        </div>
        <h2 className="group-name">{group.name}</h2>
        <p className="group-description">{group.description}</p>
        <div className="group-meta">
          <span className="group-comments">댓글 {group.comments}</span>
          <span className="group-views">조회 {group.views}</span>
          <span className="group-likes">좋아요 {group.likes}</span>
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
