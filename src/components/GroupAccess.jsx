import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/GroupAccess.css';

function GroupAccess() {
  const { groupId } = useParams(); // URL에서 그룹 ID 가져오기
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // 제출 시 로딩 시작

    try {
      const response = await axios.post(
        `https://codit-teamb-server.onrender.com/api/groups/${groupId}/verify-password`,
        { password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200 && response.data.message === '비밀번호가 확인되었습니다') {
        setMessage('비밀번호가 확인되었습니다. 그룹 페이지로 이동합니다.');
        navigate(`/group-page/${groupId}`); // 그룹 페이지로 이동
      } else {
        setMessage('비밀번호가 틀렸습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('비밀번호가 틀렸습니다. 다시 시도해 주세요.');
      } else {
        setMessage('권한 확인 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } finally {
      setLoading(false); // 요청이 완료되면 로딩 종료
    }
  };

  return (
    <div>
      <header className="header">
        <h1>조각집</h1>
      </header>

      <main>
        <div className="access-container">
          <h2>비공개 그룹</h2>
          <p>비공개 그룹에 접근하기 위해 권한 확인이 필요합니다.</p>
          <form id="access-form" onSubmit={handleSubmit}>
            <label htmlFor="password">비밀번호 입력</label>
            <input
              type="password"
              id="password"
              placeholder="그룹 비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? '확인 중...' : '제출하기'}
            </button>
          </form>
          {message && <p style={{ color: message.includes('확인되었습니다') ? 'green' : 'red' }}>{message}</p>}
        </div>
      </main>
    </div>
  );
}

export default GroupAccess;
