import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import artistService from "../../services/artist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faSave } from "@fortawesome/free-solid-svg-icons";

export default class SubmitDialogComponent extends React.Component {
  toEdit = false;

  constructor(props) {
    super(props);
    this.toEdit = props.artist !== undefined;
    this.state = this.getFormState();
  }

  getFormState() {
    return this.toEdit
      ? { ...this.props.artist, photo: null }
      : { artistname: "", description: "", photo: null };
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const jsonData = (({ artistname, description }) => ({ artistname, description }))(
      this.state
    );
    if (this.toEdit) {
      const { _id, photo } = this.props.artist;
      artistService.update(_id, jsonData).then(() => this.handlePhotoSubmit({ ...jsonData, _id, photo }));
    } else {
      artistService.create(jsonData).then((result) => this.handlePhotoSubmit({ ...jsonData, _id: result._id }));
    }
  }

  handlePhotoSubmit(artistData) {
    if (this.state.photo) {
      artistService.setPhoto(artistData._id, this.state.photo).then((result) => {
        this.props.submited({ ...artistData, photo: result.url });
      });
    } else {
      this.props.submited(artistData);
    }
  }

  handleCancel() {
    this.setState(this.getFormState());
    this.props.handleClose();
  }

  handleSelectPhoto(evt) {
    const formData = new FormData();
    formData.append("photo", evt.target.files[0]);
    this.setState({ photo: formData });
  }

  render() {
    const { show } = this.props;
    const { artistname, description } = this.state;

    return (
      <Modal show={show} onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>{this.toEdit ? "Edit Artist" : "Create Artist"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(evt) => this.handleSubmit(evt)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Artist</Form.Label>
              <Form.Control value={artistname} onChange={(evt) => this.setState({ artistname: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control value={description} onChange={(evt) => this.setState({ description: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Photo</Form.Label>
              <Form.Control type="file" onChange={(evt) => this.handleSelectPhoto(evt)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleCancel()}>
            <FontAwesomeIcon icon={faUndo} />
            </Button>
            <Button variant="primary" type="submit">
              <FontAwesomeIcon icon={faSave}  />
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
