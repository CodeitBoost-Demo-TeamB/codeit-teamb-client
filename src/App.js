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


function App() {
  return (
    <Router>
      <Routes>
        {/* 공개와 비공개 그룹을 모두 관리하는 MemoryContainer */}
        <Route path="/memory" element={<MemoryContainer />} />
        <Route path="/private" element={<MemoryContainer />} />

        {/* 공개 및 비공개 추억 세부 사항 */}
        <Route path="/memory/:id" element={<MemoryDetails />} />
        <Route path="/private/:id" element={<MemoryDetails />} />

        {/* 추억 생성 */}
        <Route path="/create" element={<CreateMemoryPage />} />

        {/* 그룹 삭제 */}
        <Route path="/memory/delete/group" element={<DeleteGroupModal />} />
        <Route path="/private/delete/group" element={<DeleteGroupModal />} />

        {/* 그룹 정보 수정 */}
        <Route path="/memory/edit/group" element={<EditGroupModal />} />
        <Route path="/private/edit/group" element={<EditGroupModal />} />

        {/* 추억 삭제 */}
        <Route path="/memory/:id/delete/memory" element={<DeleteMemoryModal />} />
        <Route path="/private/:id/delete/memory" element={<DeleteMemoryModal />} />

        {/* 추억 수정 */}
        <Route path="/memory/:id/edit/memory" element={<EditMemoryModal />} />
        <Route path="/private/:id/edit/memory" element={<EditMemoryModal />} />

        {/* 데이터 없을 때 */}
        <Route path="/nodata" element={<NoDataMemory />} />
      </Routes>
    </Router>
  );
}

export default App;
