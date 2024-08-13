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

function createGroupCard(group) {
  return `
      <div class="group-card">
          <img src="${group.image}" alt="${group.title}">
          <div class="group-info">
              <p>D-${group.dDay} | ${group.category}</p>
              <h3>${group.title}</h3>
              <p>${group.description}</p>
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

