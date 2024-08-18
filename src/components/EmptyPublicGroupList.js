document.addEventListener('DOMContentLoaded', () => {
  const groupListElement = document.querySelector('.group-list');
  const publicBtn = document.getElementById('public-btn');
  const privateBtn = document.getElementById('private-btn');

  // 공개 버튼 클릭 시 실행할 함수
  publicBtn.addEventListener('click', function() {
      publicBtn.classList.add('active');  // 공개 버튼에 active 클래스 추가
      privateBtn.classList.remove('active');  // 비공개 버튼에서 active 클래스 제거
  });

  // 비공개 버튼 클릭 시 실행할 함수
  privateBtn.addEventListener('click', function() {
      privateBtn.classList.add('active');  // 비공개 버튼에 active 클래스 추가
      publicBtn.classList.remove('active');  // 공개 버튼에서 active 클래스 제거
  });

  // 그룹 데이터가 비어 있는 경우 empty-message를 표시
  if (!groupListElement || groupListElement.children.length === 0) {
      document.querySelector('.empty-message').style.display = 'flex';
  }
});

