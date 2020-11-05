import React from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions';
import UserForm from './UserForm';

class UserCreate extends React.Component {
  
  onSubmit = (formValues) => {
    this.props.createUser(formValues);
  }

  render() {
    return (
      <div className="jumbotron">
        <UserForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}


export default connect(null, { createUser })(UserCreate);