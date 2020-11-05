import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../../actions';

class UserList extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderOptions(user) {
    return (
      <div class="text-right">
        <Link to={`/users/edit/${user.id}`} className="btn btn-success">Edit</Link>
        <button onClick={() => this.props.deleteUser(user.id)} className="btn btn-danger">Delete</button>
      </div>
    )
  }

  renderUsers() {
    return (
      <tr>
        <th>User</th>
        <th>User</th>
        <th>User</th>
        {this.props.map(user => {
          <th key={user}>{user.firstName}</th>
        })}
      </tr>
    )
  }

  renderList() {
    return this.props.users.map(user => {
      let fullName = user.firstName + " " + user.lastName
      return (
        <div className="table" key={user.id}>
          <div className="card">
              <div className="card-body">
                <div>{fullName}</div>
                <div>{user.email}</div>
                <div>{user.active}</div>
                {this.renderOptions(user)}
              </div>
          </div>
          
        </div>
      );
    }).reverse();
  }

  render() {
    return (
        <div className="container-fluid">
          {this.renderList()}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    users: Object.values(state.users)
  };
}

export default connect(mapStateToProps, { fetchUsers, deleteUser })(UserList);