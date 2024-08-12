import React from 'react';
import Header from './PuHeader';
import GroupList from './PuGroupList';
import EmptyGroupList from './components/EmptyGroupList';

function PublicGroupList() {
  const groups = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      name: '에델바이스',
      description: '새로운 하루의 은유화로 우리와 언제나 함께하길 기약합니다.',
      d: 265,
      status: '공개',
      comments: 2,
      views: '1.5K',
      likes: 3
    },
    // 추가 그룹 데이터
  ];

  return (
    <div className="public-group-list">
      <PuHeader />
      <PuGroupList groups={groups} />
      <div className="load-more">
        <button className="btn load-more-btn">더보기</button>
      </div>
    </div>
  );
}

export default PublicGroupList;
