import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GroupAccess from './components/GroupAccess';
import CommentDeleteModal from './components/CommentDeleteModal';
import CommentRegisterModal from './components/CommentRegisterModal';
import CommentEditModal from './components/CommentEditModal';
import NotFoundPage from './components/NotFoundPage';
import PublicGroupList from './components/PublicGroupList';
import PrivateGroupList from './components/PrivateGroupList';
import EmptyPublicGroupList from './components/EmptyPublicGroupList';
import CreateGroup from './components/CreateGroup';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicGroupList />} />
        <Route path="/private-groups" element={<PrivateGroupList />} />
        <Route path="/empty-public-groups" element={<EmptyPublicGroupList />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/group-access" element={<GroupAccess />} />
        <Route path="/comment-delete" element={<CommentDeleteModal />} />
        <Route path="/comment-register" element={<CommentRegisterModal />} />
        <Route path="/comment-edit" element={<CommentEditModal />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
