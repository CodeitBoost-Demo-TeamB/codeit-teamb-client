document.addEventListener('DOMContentLoaded', () => {
  const publicBtn = document.getElementById('publicBtn');
  const privateBtn = document.getElementById('privateBtn');
  const groupList = document.getElementById('group-list');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  
  let isPublic = true; // 현재 공개 그룹을 보고 있는지 여부
  let publicGroupData = [];
  let privateGroupData = [];
  let currentPublicIndex = 0;
  let currentPrivateIndex = 0;
  const loadCount = 2; // 한 번에 로드할 그룹 수

  // 공개 그룹 데이터를 초기화
  function initPublicGroups() {
      publicGroupData = [
          { title: "달봉이네 가족", date: "D+265", status: "공개", description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.", badges: 2, memories: 8, likes: "1.5K" },
          { title: "에델바이스", date: "D+245", status: "공개", description: "새로 만난 아름다운 풍경과 친구들을 만난 날의 기록입니다.", badges: 3, memories: 5, likes: "2K" },
          { title: "공개 그룹 3", date: "D+120", status: "공개", description: "공개 그룹의 다른 내용입니다.", badges: 5, memories: 3, likes: "1K" },
          { title: "공개 그룹 4", date: "D+90", status: "공개", description: "새로운 공개 그룹입니다.", badges: 4, memories: 4, likes: "500" }
      ];
      loadPublicGroups();
  }

  // 비공개 그룹 데이터를 초기화
  function initPrivateGroups() {
      privateGroupData = [
          { title: "비공개 가족", date: "D+300", status: "비공개", description: "비공개 그룹으로 운영되고 있는 가족입니다.", badges: 1, memories: 6, likes: "500" },
          { title: "비밀 모임", date: "D+150", status: "비공개", description: "비밀리에 진행 중인 모임입니다.", badges: 4, memories: 10, likes: "3K" },
          { title: "비공개 그룹 3", date: "D+100", status: "비공개", description: "추가된 비공개 그룹입니다.", badges: 2, memories: 2, likes: "700" },
          { title: "비공개 그룹 4", date: "D+50", status: "비공개", description: "새로운 비공개 그룹입니다.", badges: 3, memories: 5, likes: "1.2K" }
      ];
  }

  // 공개 그룹 데이터를 불러와 렌더링 (더보기 포함)
  function loadPublicGroups() {
      for (let i = currentPublicIndex; i < currentPublicIndex + loadCount && i < publicGroupData.length; i++) {
          groupList.innerHTML += createGroupBlock(publicGroupData[i]);
      }
      currentPublicIndex += loadCount;

      // 더 이상 로드할 데이터가 없으면 더보기 버튼을 숨김
      if (currentPublicIndex >= publicGroupData.length) {
          loadMoreBtn.style.display = 'none';
      }
  }

  // 비공개 그룹 데이터를 불러와 렌더링 (더보기 포함)
  function loadPrivateGroups() {
      for (let i = currentPrivateIndex; i < currentPrivateIndex + loadCount && i < privateGroupData.length; i++) {
          groupList.innerHTML += createGroupBlock(privateGroupData[i]);
      }
      currentPrivateIndex += loadCount;

      // 더 이상 로드할 데이터가 없으면 더보기 버튼을 숨김
      if (currentPrivateIndex >= privateGroupData.length) {
          loadMoreBtn.style.display = 'none';
      }
  }

  // 그룹 블록을 생성하는 함수
  function createGroupBlock(group) {
      return `
          <div class="group-block">
              <div class="group-info">
                  <p class="title">${group.title}</p>
                  <p class="date">${group.date} | ${group.status}</p>
                  <p class="description">${group.description}</p>
                  <div class="badges">획득 배지: <span class="badge-count">${group.badges}</span></div>
                  <div class="memories">추억: <span class="memory-count">${group.memories}</span></div>
                  <div class="likes">공감: <span class="like-count">${group.likes}</span></div>
              </div>
          </div>
      `;
  }

  // 공개 버튼 클릭 시 공개 그룹 로드
  publicBtn.addEventListener('click', () => {
      isPublic = true;
      publicBtn.classList.add('active');
      privateBtn.classList.remove('active');
      groupList.innerHTML = ''; // 기존 내용 지우기
      currentPublicIndex = 0; // 인덱스 리셋
      loadMoreBtn.style.display = 'block'; // 더보기 버튼 다시 보여줌
      loadPublicGroups();
  });

  // 비공개 버튼 클릭 시 비공개 그룹 로드
  privateBtn.addEventListener('click', () => {
      isPublic = false;
      privateBtn.classList.add('active');
      publicBtn.classList.remove('active');
      groupList.innerHTML = ''; // 기존 내용 지우기
      currentPrivateIndex = 0; // 인덱스 리셋
      loadMoreBtn.style.display = 'block'; // 더보기 버튼 다시 보여줌
      loadPrivateGroups();
  });

  // 더보기 버튼 클릭 시 데이터 추가 로드
  loadMoreBtn.addEventListener('click', () => {
      if (isPublic) {
          loadPublicGroups();
      } else {
          loadPrivateGroups();
      }
  });

  // 초기 데이터 로드
  initPublicGroups();
  initPrivateGroups();
});
