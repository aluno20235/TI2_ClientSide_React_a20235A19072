import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import trackService from "../../services/track";

export default class SubmitDialogComponent extends React.Component {
  toEdit = false;

  constructor(props) {
    super(props);
    this.toEdit = props.track !== undefined;
    this.state = this.getFormState();
  }

  getFormState() {
    return this.toEdit
      ? { ...this.props.track }
      : { album: "", ntrack: 0, track: "", duration: "" };
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const jsonData = (({ album, ntrack, track, duration }) => ({ album, ntrack, track, duration }))(
      this.state
    );
    if (this.toEdit) {
      const { _id } = this.props.track;
      trackService.update(_id, jsonData);
    } else {
      trackService.create(jsonData);
    }
  }

  handleCancel() {
    this.setState(this.getFormState());
    this.props.handleClose();
  }

  render() {
    const { show } = this.props;
    const { album, ntrack, track, duration } = this.state;

    return (
      <Modal show={show} onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>{this.toEdit ? "Edit track" : "Create track"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(evt) => this.handleSubmit(evt)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Album</Form.Label>
              <Form.Control value={album} onChange={(evt) => this.setState({ album: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Track Number</Form.Label>
              <Form.Control type="number" value={ntrack} onChange={(evt) => this.setState({ ntrack: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Track</Form.Label>
              <Form.Control value={track} onChange={(evt) => this.setState({ track: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Form.Control
                value={duration}
                onChange={(evt) => this.setState({ duration: evt.target.value })}
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
