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
      ? { ...this.props.album, cover: null }
      : { album: "", genre: "", year: 0, artist: "", cover: null };
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const jsonData = (({ album, genre, year, artist }) => ({ album, genre, year, artist }))(
      this.state
    );
    if (this.toEdit) {
      const { _id, cover } = this.props.album;
      albumService.update(_id, jsonData).then(() => this.handleCoverSubmit({ ...jsonData, _id, cover }));
    } else {
      albumService.create(jsonData).then((result) => this.handleCoverSubmit({ ...jsonData, _id: result._id }));
    }
  }

  handleCoverSubmit(albumData) {
    if (this.state.cover) {
      albumService.setCover(albumData._id, this.state.cover).then((result) => {
        this.props.submited({ ...albumData, cover: result.url });
      });
    } else {
      this.props.submited(albumData);
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
    const { album, genre, year, artist } = this.state;

    return (
      <Modal show={show} onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>{this.toEdit ? "Edit album" : "Create album"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(evt) => this.handleSubmit(evt)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Album Title</Form.Label>
              <Form.Control value={album} onChange={(evt) => this.setState({ album: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control value={genre} onChange={(evt) => this.setState({ genre: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Publish Year</Form.Label>
              <Form.Control type="number" value={year} onChange={(evt) => this.setState({ year: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Artist</Form.Label>
              <Form.Control
                value={artist}
                onChange={(evt) => this.setState({ artist: evt.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Cover</Form.Label>
              <Form.Control type="file" onChange={(evt) => this.handleSelectCover(evt)} />
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
