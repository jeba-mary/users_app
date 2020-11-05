import React from 'react';
import UserList from './users/UserList';
import UserCreate from './users/UserCreate';
class HomePage extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <UserCreate />
        <UserList />
      </div>
    )
  }
}

export default HomePage;