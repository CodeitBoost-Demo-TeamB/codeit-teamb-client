const groups = [
  {
      id: 1,
      title: "달맞이 가족",
      dDay: 265,
      category: "비공개",
      comments: 8,
      views: "1.5K"
  },
  // 더 많은 그룹 정보를 여기에 추가
];

function createGroupCard(group) {
  return `
      <div class="group-card">
          <div class="group-info">
              <p>D-${group.dDay} | ${group.category}</p>
              <h3>${group.title}</h3>
              <p>댓글: ${group.comments} | 조회수: ${group.views}</p>
          </div>
      </div>
  `;
}

function loadGroups() {
  const groupListElement = document.querySelector('.group-list');
  groups.forEach(group => {
      groupListElement.innerHTML += createGroupCard(group);
  });
}

document.querySelector('.load-more-btn').addEventListener('click', () => {
  // '더보기' 버튼을 클릭했을 때 추가 그룹을 로드하는 로직을 구현
  loadGroups();
});

// 페이지 로드 시 기본 그룹 목록 로드
loadGroups();
