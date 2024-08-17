document.addEventListener('DOMContentLoaded', () => {
    const visibilityToggle = document.getElementById('public-checkbox');
    const passwordLabel = document.getElementById('password-label');
    const passwordInput = document.getElementById('group-password');
    const fileInput = document.getElementById('group-image');
    const fileNameInput = document.getElementById('file-name');

    // 공개 여부에 따라 비밀번호 입력 필드 표시/숨김
    visibilityToggle.addEventListener('change', () => {
        if (visibilityToggle.checked) {
            passwordLabel.style.display = 'none';
            passwordInput.style.display = 'none';
            passwordInput.required = false;
        } else {
            passwordLabel.style.display = 'block';
            passwordInput.style.display = 'block';
            passwordInput.required = true;
        }
    });

    // 파일 선택 시 파일 이름 표시
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileNameInput.value = fileInput.files[0].name;
        } else {
            fileNameInput.value = '';
        }
    });

    // 폼 제출 시 데이터 처리
    document.getElementById('create-group-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const groupName = document.getElementById('group-name').value;
        const groupImage = fileInput.files[0];
        const groupDescription = document.getElementById('group-description').value;
        const groupVisibility = visibilityToggle.checked ? '공개' : '비공개';
        const groupPassword = passwordInput.value;

        console.log({
            groupName,
            groupImage,
            groupDescription,
            groupVisibility,
            groupPassword
        });

        alert('그룹이 성공적으로 생성되었습니다!');
    });
});
