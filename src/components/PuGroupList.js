import React from 'react';
import PuGroupCard from './PuGroupCard';

function PuGroupList({ groups }) {
  return (
    <div className="group-list">
      {groups.map((group, index) => (
        <PuGroupCard key={index} group={group} />
      ))}
    </div>
  );
}

export default PuGroupList;
