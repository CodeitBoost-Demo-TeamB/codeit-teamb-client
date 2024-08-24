import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// 페이지 경로
import './index.css'; 
import CreateMemoryPage from './pages/CreateMemoryPage';
import DeleteGroupModal from './components/DeleteGroupModal';
import DeleteMemoryModal from './pages/DeleteMemoryModal';
import EditGroupModal from './components/EditGroupModal';
import EditMemoryModal from './pages/EditMemoryModal';
import MemoryDetails from './pages/MemoryDetails';
import NoDataMemory from './pages/NoDataMemory';
import MemoryContainer from './components/MemoryContainer'; // MemoryContainer로 공개/비공개 관리
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
        {/* 공개와 비공개 그룹을 모두 관리하는 MemoryContainer */}
        <Route path="/memory/:groupId" element={<MemoryContainer />} />
        <Route path="/private/:groupId" element={<MemoryContainer />} />

        {/* 공개 및 비공개 추억 세부 사항 
        <Route path="/memory/:groupId/:postId" element={<MemoryDetails />} />
        <Route path="/private/:groupId/:postId" element={<MemoryDetails />} /> */}
        <Route path="/memory/details" element={<MemoryDetails />} />

        {/* 추억 생성 */}
        <Route path="/:groupId/create" element={<CreateMemoryPage />} />

        {/* 그룹 삭제 */}
        <Route path="/delete/group" element={<DeleteGroupModal />} />
        <Route path="/private/delete/group" element={<DeleteGroupModal />} />

        {/* 그룹 정보 수정 */}
        <Route path="/memory/edit/group" element={<EditGroupModal />} />
        <Route path="/private/edit/group" element={<EditGroupModal />} />

        {/* 추억 삭제 */}
        <Route path="/memory/details/delete/memory" element={<DeleteMemoryModal />} />
        <Route path="/private/:id/delete/memory" element={<DeleteMemoryModal />} />

        {/* 추억 수정 */}
        <Route path="/memory/details/edit/memory" element={<EditMemoryModal />} />
        <Route path="/private/:id/edit/memory" element={<EditMemoryModal />} />

        {/* 데이터 없을 때 */}
        <Route path="/nodata" element={<NoDataMemory />} />
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
