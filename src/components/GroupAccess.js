document.addEventListener('DOMContentLoaded', () => {
  const correctPassword = "12345";  // 실제 환경에서는 서버에서 확인해야 하는 비밀번호

  document.getElementById('access-group-form').addEventListener('submit', (event) => {
      event.preventDefault();

      const enteredPassword = document.getElementById('group-password').value;

      if (enteredPassword === correctPassword) {
          alert('비밀번호가 일치합니다. 그룹에 접근합니다.');
          // 이곳에서 실제 그룹 페이지로 이동하는 코드를 추가
          window.location.href = "group-page.html";  // 예: 그룹 페이지로 리다이렉션
      } else {
          alert('비밀번호가 일치하지 않습니다. 다시 시도해 주세요.');
      }
  });
});

