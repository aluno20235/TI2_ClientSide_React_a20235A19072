import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import userService from "../../services/user";

export default class SubmitDialogComponent extends React.Component {
  toEdit = false;

  constructor(props) {
    super(props);
    this.toEdit = props.user !== undefined;
    this.state = this.getFormState();
  }

  getFormState() {
    return this.toEdit
      ? { ...this.props.user }
      : { username: "", role: "", email: "", name: "" };
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.toEdit) {
      const { _id } = this.props.user;
      userService
        .update(_id, this.state)
        .then(() => this.props.submited({ ...this.state, _id }))
        .catch(ex => console.log(ex));
    } 
  }

  handleCancel() {
    this.setState(this.getFormState());
    this.props.handleClose();
  }

  render() {
    const { show } = this.props;
    const { username, role, email, name } = this.state;

    return (
      <Modal show={show} onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(evt) => this.handleSubmit(evt)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control value={username} readOnly onChange={(evt) => this.setState({ username: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                  as="select"
                  value={role}
                  onChange={(evt) => this.setState({ role: parseInt(evt.target.value) })}>
                  <option value={2}>Contributor</option>
                  <option value={1}>Admin</option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control value={email} onChange={(evt) => this.setState({ email: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(evt) => this.setState({ name: evt.target.value })}
              />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleCancel()}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
