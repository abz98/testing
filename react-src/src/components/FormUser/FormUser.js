import React, { useEffect, useState } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'm' },
  { key: 'f', text: 'Female', value: 'f' },
  { key: 'o', text: 'Do Not Disclose', value: 'o' }
];

const FormUser = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    formClassName: '',
    formSuccessMessage: '',
    formErrorMessage: ''
  });

  useEffect(() => {
    if (props.userID) {
      axios.get(`${props.server}/api/users/${props.userID}`)
        .then((response) => {
          setFormData({
            ...formData,
            name: response.data.name,
            email: response.data.email,
            age: response.data.age ?? '',
            gender: response.data.gender
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.userID, props.server]);

  const handleInputChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e, { value }) => {
    setFormData({ ...formData, gender: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: formData.name,
      email: formData.email,
      age: formData.age,
      gender: formData.gender
    };

    const method = props.userID ? 'put' : 'post';
    const params = props.userID ? props.userID : '';

    axios({
      method: method,
      responseType: 'json',
      url: `${props.server}/api/users/${params}`,
      data: user
    })
      .then((response) => {
        setFormData({
          ...formData,
          formClassName: 'success',
          formSuccessMessage: response.data.msg
        });

        if (!props.userID) {
          setFormData({
            ...formData,
            name: '',
            email: '',
            age: '',
            gender: ''
          });
          props.onUserAdded(response.data.result);
          props.socket.emit('add', response.data.result);
        } else {
          props.onUserUpdated(response.data.result);
          props.socket.emit('update', response.data.result);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            setFormData({
              ...formData,
              formClassName: 'warning',
              formErrorMessage: err.response.data.msg
            });
          }
        } else {
          setFormData({
            ...formData,
            formClassName: 'warning',
            formErrorMessage: 'Something went wrong. ' + err
          });
        }
      });
  };

  const { formClassName, formSuccessMessage, formErrorMessage } = formData;

  return (
    <Form className={formClassName} onSubmit={handleSubmit}>
      <Form.Input
        label='Name'
        type='text'
        placeholder='Elon Musk'
        name='name'
        maxLength='40'
        required
        value={formData.name}
        onChange={handleInputChange}
      />
      <Form.Input
        label='Email'
        type='email'
        placeholder='elonmusk@tesla.com'
        name='email'
        maxLength='40'
        required
        value={formData.email}
        onChange={handleInputChange}
      />
      <Form.Group widths='equal'>
        <Form.Input
          label='Age'
          type='number'
          placeholder='18'
          min={5}
          max={130}
          name='age'
          value={formData.age}
          onChange={handleInputChange}
        />
        <Form.Field
          control={Select}
          label='Gender'
          options={genderOptions}
          placeholder='Gender'
          value={formData.gender}
          onChange={handleSelectChange}
        />
      </Form.Group>
      <Message success color='green' header='Nice one!' content={formSuccessMessage} />
      <Message warning color='yellow' header='Woah!' content={formErrorMessage} />
      <Button color={props.buttonColor} floated='right'>{props.buttonSubmitTitle}</Button>
      <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
    </Form>
  );
};

export default FormUser;
