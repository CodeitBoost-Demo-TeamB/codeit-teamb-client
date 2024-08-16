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
      // 여기에 공개 그룹 데이터를 로드하여 groupList에 추가하는 코드 작성
      groupList.innerHTML += createGroupBlock("공개 그룹 1", "https://via.placeholder.com/250", "D-265", "2", "1.5K");
  }

  function loadPrivateGroups() {
      groupList.innerHTML = ''; // 기존 내용 지우기
      // 여기에 비공개 그룹 데이터를 로드하여 groupList에 추가하는 코드 작성
      groupList.innerHTML += createGroupBlock("비공개 그룹 1", "https://via.placeholder.com/250", "D-100", "3", "1.2K");
  }

  function createGroupBlock(title, imgSrc, date, badges, likes) {
      return `
          <div class="group-block">
              <img src="${imgSrc}" alt="그룹 이미지">
              <div class="group-info">
                  <p class="title">${title}</p>
                  <p class="description">그룹 설명을 여기에 추가하세요.</p>
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
