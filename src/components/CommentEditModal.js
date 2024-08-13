document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('edit-comment-modal');
  const form = document.getElementById('edit-comment-form');
  const correctPassword = "12345";  // 실제 환경에서는 서버에서 확인해야 하는 비밀번호

  // 폼 제출 시 데이터 처리
  form.addEventListener('submit', (event) => {
      event.preventDefault();

      const nickname = document.getElementById('edit-nickname').value;
      const comment = document.getElementById('edit-comment').value;
      const password = document.getElementById('edit-password').value;

      if (password === correctPassword) {
          console.log({
              nickname,
              comment,
              password
          });

          alert('댓글이 성공적으로 수정되었습니다!');
          
          // 폼 초기화
          form.reset();
          
          // 모달 닫기
          closeModal();
      } else {
          alert('비밀번호가 일치하지 않습니다. 다시 시도해 주세요.');
      }
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
