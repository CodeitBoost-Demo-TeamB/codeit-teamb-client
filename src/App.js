import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GroupAccess from './components/GroupAccess';
import CommentDeleteModal from './components/CommentDeleteModal';
import CommentRegisterModal from './components/CommentRegisterModal';
import CommentEditModal from './components/CommentEditModal';
import NotFoundPage from './components/NotFoundPage';
import PublicGroupList from './components/PublicGroupList';
import PrivateGroupList from './components/PrivateGroupList';
import EmptyPublicGroupList from './components/EmptyPublicGroupList';
import CreateGroup from './components/CreateGroup';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PublicGroupList} />
        <Route path="/private-groups" component={PrivateGroupList} />
        <Route path="/empty-public-groups" component={EmptyPublicGroupList} />
        <Route path="/create-group" component={CreateGroup} />
        <Route path="/group-access" component={GroupAccess} />
        <Route path="/comment-delete" component={CommentDeleteModal} />
        <Route path="/comment-register" component={CommentRegisterModal} />
        <Route path="/comment-edit" component={CommentEditModal} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
