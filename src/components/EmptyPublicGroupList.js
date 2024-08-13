document.addEventListener('DOMContentLoaded', () => {
  const groupListElement = document.querySelector('.group-list');
  
  // 그룹 데이터가 비어 있는 경우 empty-message를 표시
  if (!groupListElement || groupListElement.children.length === 0) {
      document.querySelector('.empty-message').style.display = 'flex';
  }
});
