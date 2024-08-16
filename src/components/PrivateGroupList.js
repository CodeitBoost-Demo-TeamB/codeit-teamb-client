document.addEventListener('DOMContentLoaded', () => {
  const publicBtn = document.getElementById('publicBtn');
  const privateBtn = document.getElementById('privateBtn');
  const groupList = document.getElementById('group-list');
  
  publicBtn.addEventListener('click', () => {
      publicBtn.classList.add('active');
      privateBtn.classList.remove('active');
      loadPublicGroups();
  });
  
  privateBtn.addEventListener('click', () => {
      privateBtn.classList.add('active');
      publicBtn.classList.remove('active');
      loadPrivateGroups();
  });

  function loadPublicGroups() {
      groupList.innerHTML = ''; // 기존 내용 지우기
      // 공개 그룹 데이터를 로드하여 groupList에 추가하는 코드
      groupList.innerHTML += createGroupBlock("공개 그룹 1", "D-265", "8", "1.5K");
  }

  function loadPrivateGroups() {
      groupList.innerHTML = ''; // 기존 내용 지우기
      // 비공개 그룹 데이터를 로드하여 groupList에 추가하는 코드
      groupList.innerHTML += createGroupBlockNoImage("비공개 그룹 1", "D-265", "8", "1.5K");
  }

  function createGroupBlock(title, date, badges, likes) {
      return `
          <div class="group-block">
              <div class="group-info">
                  <p class="title">${title}</p>
                  <div class="stats">
                      <span>날짜: ${date}</span>
                      <span>획득 배지: ${badges}</span>
                      <span>공감: ${likes}</span>
                  </div>
              </div>
          </div>
      `;
  }

  function createGroupBlockNoImage(title, date, badges, likes) {
      return `
          <div class="group-block">
              <div class="group-info">
                  <p class="title">${title}</p>
                  <div class="stats">
                      <span>날짜: ${date}</span>
                      <span>획득 배지: ${badges}</span>
                      <span>공감: ${likes}</span>
                  </div>
              </div>
          </div>
      `;
  }

  // 초기 로드 시 공개 그룹을 로드
  loadPublicGroups();
});
