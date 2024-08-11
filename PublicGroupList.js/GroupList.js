import React from 'react';
import GroupCard from './GroupCard';

function GroupList({ groups }) {
  return (
    <div className="group-list">
      {groups.map((group, index) => (
        <GroupCard key={index} group={group} />
      ))}
    </div>
  );
}

export default GroupList;
