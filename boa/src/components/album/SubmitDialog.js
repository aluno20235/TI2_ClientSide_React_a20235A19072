import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import albumService from "../../services/album";

export default class SubmitDialogComponent extends React.Component {
  toEdit = false;

  constructor(props) {
    super(props);
    this.toEdit = props.album !== undefined;
    this.state = this.getFormState();
  }

  getFormState() {
    return this.toEdit
      ? { ...this.props.album }
      : { album: "", genre: "", year: "", artist: "", cover:"" };
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.toEdit) {
      const { _id } = this.props.album;
      albumService
        .update(_id, this.state)
        .then(() => this.props.submited({ ...this.state, _id }))
        .catch(ex => console.log(ex));
    } else {
      albumService
        .create(this.state)
        .then(result => this.props.submited({ ...this.state, _id: result._id }))
        .catch(ex => console.log(ex));
    }
  }

  handleCancel() {
    this.setState(this.getFormState());
    this.props.handleClose();
  }

  handleSelectCover(evt) {
    const formData = new FormData();
    formData.append("cover", evt.target.files[0]);
    this.setState({ cover: formData });
  }

  render() {
    const { show } = this.props;
    const { album, genre, year, artist, cover} = this.state;

    return (
      <Modal show={show} onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>{this.toEdit ? "Edit album" : "Create album"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(evt) => this.handleSubmit(evt)}>
          <Modal.Body>
          <Form.Group>
              <Form.Label>Album</Form.Label>
              <Form.Control 
              required true
              value={album} 
              onChange={(evt) => this.setState({ album: evt.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
               required true
              value={genre} 
              onChange={(evt) => this.setState({ genre: evt.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control 
              required true
              value={year} 
              onChange={(evt) => this.setState({ year: evt.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Artist</Form.Label>
              <Form.Control 
              required true
              value={artist} 
              onChange={(evt) => this.setState({ artist: evt.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cover</Form.Label>
              <Form.Control 
              type="file" 
              onChange={(evt) => this.handleSelectCover(evt)} />
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