import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GroupAccess from '../src/components/GroupAccess.jsx';
import CommentDeleteModal from '../src/components/CommentDeleteModal.jsx';
import CommentRegisterModal from '../src/components/CommentRegisterModal.jsx';
import CommentEditModal from '../src/components/CommentEditModal.jsx';
import NotFoundPage from '../src/components/NotFoundPage.jsx';
import PublicGroupList from '../src/components/PublicGroupList.jsx';
import PrivateGroupList from '../src/components/PrivateGroupList.jsx';
import EmptyPublicGroupList from '../src/components/EmptyPublicGroupList.jsx';
import CreateGroup from '../src/components/CreateGroup.jsx';
import '../src/styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        //공개 그룹 목록 페이지
        <Route path="/" element={<PublicGroupList />} />
        //비공개 그룹 목록 페이지
        <Route path="/private-groups" element={<PrivateGroupList />} />
        //데이터 없는 페이지
        <Route path="/empty-public-groups" element={<EmptyPublicGroupList />} />
        //그룹 생성 페이지
        <Route path="/create-group" element={<CreateGroup />} />
        //그룹 접근 권한 페이지
        <Route path="/group-access" element={<GroupAccess />} />
        //댓글 삭제 
        <Route path="/comment-delete" element={<CommentDeleteModal />} />
        //댓글 등록
        <Route path="/comment-register" element={<CommentRegisterModal />} />
        //댓글 수정
        <Route path="/comment-edit" element={<CommentEditModal />} />
        //404 페이지
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
