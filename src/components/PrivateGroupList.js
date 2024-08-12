import React from 'react';
import Header from '../components/Header';
import GroupList from '../components/GroupList';

function PrivateGroupList() {
  const groups = [
    {
      id: 1,
      name: '달팽이의 가족',
      description: '그룹 설명이 여기에 들어갑니다.',
      d: 265,
      status: '비공개',
      comments: 8,
      views: '1.5K',
      likes: 15
    },
    // 추가 그룹 데이터
  ];

  return (
    <div className="private-group-list">
      <Header />
      <GroupList groups={groups} />
      <div className="load-more">
        <button className="btn load-more-btn">더보기</button>
      </div>
    </div>
  );
}

export default PrivateGroupList;
