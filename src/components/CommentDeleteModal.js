document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('delete-comment-modal');
  const form = document.getElementById('delete-comment-form');
  const closeModalBtn = document.getElementById('close-modal');
  const correctPassword = "12345";  // 실제 환경에서는 서버에서 확인해야 하는 비밀번호

  // 폼 제출 시 데이터 처리
  form.addEventListener('submit', (event) => {
      event.preventDefault();

      const password = document.getElementById('delete-password').value;

      if (password === correctPassword) {
          alert('댓글이 성공적으로 삭제되었습니다!');
          
          // 이곳에 댓글 삭제 로직 추가 (예: 서버에 요청 전송)
          
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

  // 모달 닫기 버튼 이벤트
  closeModalBtn.addEventListener('click', closeModal);

  // 초기 모달 상태 설정 (열려있는 상태)
  modal.style.display = 'flex';
});
