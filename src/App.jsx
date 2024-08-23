import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GroupAccess from './components/GroupAccess.jsx';
import CommentDeleteModal from './components/CommentDeleteModal.jsx';
import CommentRegisterModal from './components/CommentRegisterModal.jsx';
import CommentEditModal from './components/CommentEditModal.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import PublicGroupList from './components/PublicGroupList.jsx';
import PrivateGroupList from './components/PrivateGroupList.jsx';
import EmptyPublicGroupList from './components/EmptyPublicGroupList.jsx';
import CreateGroup from './components/CreateGroup.jsx';
import '../src/styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* 공개 그룹 목록 페이지 */}
        <Route path="/public-groups" element={<PublicGroupList />} />
        
        {/* 비공개 그룹 목록 페이지 */}
        <Route path="/private-groups" element={<PrivateGroupList />} />
        
        {/* 데이터 없는 페이지 */}
        <Route path="/empty-public-groups" element={<EmptyPublicGroupList />} />
        
        {/* 그룹 생성 페이지 */}
        <Route path="/create-group" element={<CreateGroup />} />
        
        {/* 그룹 접근 권한 페이지 - groupId를 URL 파라미터로 받음 */}
        <Route path="/group-access/:groupId" element={<GroupAccess />} />
        
        {/* 댓글 삭제 */}
        <Route path="/comment-delete" element={<CommentDeleteModal />} />
        
        {/* 댓글 등록 */}
        <Route path="/comment-register" element={<CommentRegisterModal />} />
        
        {/* 댓글 수정 */}
        <Route path="/comment-edit" element={<CommentEditModal />} />
        
        {/* 404 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
