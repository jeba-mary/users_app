import React from 'react';
import { Field, reduxForm } from 'redux-form';
import data from '../../states.json';

class UserForm extends React.Component {
  constructor() {
    super();
    this.state = {
      countries: data.countries
    }
  }
  

  renderInput = ({ input, type, meta }) => {
    const { mime } = this.props;
    return (
      <div>
        <input
          name={input.name}
          type={type}
          accept={mime}
          onChange={event => this.handleChange(event, input)}
        />
      </div>
    );
  };

  handleChange = (event, input) => {
    event.preventDefault();
    let imageFile = event.target.files[0];
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      const imageObject = new window.Image();

      imageObject.onload = () => {
        imageFile.width = imageObject.naturalWidth;
        imageFile.height = imageObject.naturalHeight;
        input.onChange(imageFile);
        URL.revokeObjectURL(imageFile);
      };
      imageObject.src = localImageUrl;
    }
  };

 
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form">
        <div className="row">
          <div className="col-sm-4">
              <div class="form-group">
                <Field name="user_profile" type="file" component={this.renderInput} class="form-control"/>
            </div>
          </div>
          <div className="col-sm-8">
            <div>
              <label>First Name</label>
              <div class="form-group">
                <Field name="firstName"  component="input" type="text" class="form-control" />
              </div>
            </div>
            <div>
              <label>Last Name</label>
              <div class="form-group">
                <Field name="lastName" component="input" type="text" class="form-control" />
              </div>
            </div>

            <div>
              <label>Age</label>
              <div class="form-group">
                <Field name="age" component="input" type="text" class="form-control" />
              </div>
            </div>

            <div>
              <label>Email</label>
              <div class="form-group">
                <Field name="email" component="input" type="email" label="Email" class="form-control" />
              </div>
            </div>

          <div>
            <label>Active</label>
            <div class="form-group">
              <Field name="status" component="select" class="form-control">
                <option />
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Field>
            </div>
          </div>

          <div>
            <label>Country</label>
            <div class="form-group">
              <Field name="country" id="country" component="select" class="form-control"> {
                this.state.countries.map((c) => {
                  return <option value={c.country}>{c.country}</option>
                })
                }
              </Field>
            </div>
          </div>

          <div>
            <label>Telephone</label>
            <div class="form-group">
              <Field name="telephone" component="input" label="Telephone" class="form-control"/>          
            </div>
          </div>
          <br />
          <button className="btn btn-primary">Submit</button>
        </div>
        </div>
      </form>
    )
  }
}



const validate = formValues => {
  const errors = {}
  if (!formValues.firstName) {
    errors.firstName = 'Required'
  } else if (formValues.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less'
  }

  if (!formValues.lastName) {
    errors.lastName = 'Required'
  } else if (formValues.lastName.length > 15) {
    errors.lastName = 'Must be 15 characters or less'
  }

  if (!formValues.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
    errors.email = 'Invalid email address'
  }
  if (!formValues.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(formValues.age))) {
    errors.age = 'Must be a number'
  } 
  if (!formValues.telephone) {
    errors.telephone = 'Required'
  }else if (isNaN(Number(formValues.telephone)).length >= 10) {
    errors.telephone = 'Must be 10 numbers'
  }
  return errors
}

export default reduxForm({
  form: 'userForm',
  validate
})(UserForm);