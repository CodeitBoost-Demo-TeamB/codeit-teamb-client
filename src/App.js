import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// 컴포넌트 경로
//import MemoryContainer from './components/MemoryContainer';

// 페이지 경로
import CreateMemoryPage from './pages/CreateMemoryPage';
import DeleteGroupModal from './pages/DeleteGroupModal';
import DeleteMemoryModal from './pages/DeleteMemoryModal';
import EditGroupModal from './pages/EditGroupModal';
import EditMemoryModal from './pages/EditMemoryModal';
import MemoryDetails from './pages/MemoryDetails';
import NoDataMemory from './pages/NoDataMemory';
import PrivateMemory from './pages/PrivateMemory';
import PublicMemory from './pages/PublicMemory';

function App() {
  return (
    <Router>
      <Routes>
        //공개그룹일때 추억목록 및 디테일,그룹상세페이지
        <Route path="/memory" element={<PublicMemory />} />
        <Route path="/memory/:id" element={<MemoryDetails />} />
        <Route path="/private" element={<PrivateMemory />} />
        <Route path="/private/:id" element={<MemoryDetails />} />
        //비공개그룹일때 추억목록 및 디테일,그룹상세페이지
        <Route path="/private-groups/private" element={<PrivateMemory />} />
        <Route path="/private-groups/private/:id" element={<MemoryDetails />} />
        <Route path="/private-groups/memory" element={<PublicMemory />} />
        <Route path="/private-groups/memory/:id" element={<MemoryDetails />} />
        //공개그룹에서 추억생성할때
        <Route path="/memory/create" element={<CreateMemoryPage />} />
        <Route path="/private/create" element={<CreateMemoryPage />} />
        //비공개그룹에서 추억생성할때
        <Route path="/private-groups/memory/create" element={<CreateMemoryPage />} />
        <Route path="private-groups/private/create" element={<CreateMemoryPage />} />
        //그룹삭제는 그룹상세페이지에서 가능
        <Route path="/memory/delete/group" element={<DeleteGroupModal />} />
        <Route path="/private/delete/group" element={<DeleteGroupModal />} />
        <Route path="/private-groups/memory/delete/group" element={<DeleteGroupModal />} />
        <Route path="/private-groups/private/delete/group" element={<DeleteGroupModal />} />
        //그룹정보수정은 그룹상세페이지에서 가능
        <Route path="/memory/edit/group" element={<EditGroupModal />} />
        <Route path="/private/edit/group" element={<EditGroupModal />} />
        <Route path="/private-groups/memory/edit/group" element={<EditGroupModal />} />
        <Route path="private-groups/private/edit/group" element={<EditGroupModal />} />
        
        //추억삭제는 메모리 디테일 추억상세페이지 에서 가능
        <Route path="/memory/:id/delete/memory" element={<DeleteMemoryModal />} />
        <Route path="/private/:id/delete/memory" element={<DeleteMemoryModal />} />
        <Route path="/private-groups/private/:id/delete/memory" element={<DeleteMemoryModal />} />
        <Route path="/private-groups/memory/:id/delete/memory" element={<DeleteMemoryModal />} />

        <Route path="/memory/:id/edit/memory" element={<EditMemoryModal />} />
        <Route path="/private/:id/edit/memory" element={<EditMemoryModal />} />
        <Route path="/private-groups/private/:id/edit/memory" element={<EditMemoryModal />} />
        <Route path="/private-groups/memory/:id/edit/memory" element={<EditMemoryModal />} />
        //데이터 없을때 
        <Route path="/nodata" element={<NoDataMemory />} />
      </Routes>
    </Router>
  );
}

export default App;
