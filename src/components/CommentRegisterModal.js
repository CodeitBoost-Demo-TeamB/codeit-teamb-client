document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('comment-modal');
  const form = document.getElementById('comment-form');

  // 폼 제출 시 데이터 처리
  form.addEventListener('submit', (event) => {
      event.preventDefault();

      const nickname = document.getElementById('nickname').value;
      const comment = document.getElementById('comment').value;
      const password = document.getElementById('password').value;

      console.log({
          nickname,
          comment,
          password
      });

      alert('댓글이 성공적으로 등록되었습니다!');
      
      // 폼 초기화
      form.reset();
      
      // 모달 닫기
      closeModal();
  });

  // 모달 닫기 함수
  function closeModal() {
      modal.style.display = 'none';
  }

  // 필요에 따라 모달 열기 함수도 추가 가능
  function openModal() {
      modal.style.display = 'flex';
  }
  
  // 초기 모달 상태 설정 (열려있는 상태)
  modal.style.display = 'flex';
});
