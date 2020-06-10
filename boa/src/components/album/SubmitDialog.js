import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import bookService from "../../services/book";

export default class SubmitDialogComponent extends React.Component {
  toEdit = false;

  constructor(props) {
    super(props);
    this.toEdit = props.book !== undefined;
    this.state = this.getFormState();
  }

  getFormState() {
    return this.toEdit
      ? { ...this.props.book, cover: null }
      : { title: "", collection: "", author: "", publish_year: 0, cover: null };
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const jsonData = (({ title, collection, author, publish_year }) => ({ title, collection, author, publish_year }))(
      this.state
    );
    if (this.toEdit) {
      const { _id, cover } = this.props.book;
      bookService.update(_id, jsonData).then(() => this.handleCoverSubmit({ ...jsonData, _id, cover }));
    } else {
      bookService.create(jsonData).then((result) => this.handleCoverSubmit({ ...jsonData, _id: result._id }));
    }
  }

  handleCoverSubmit(bookData) {
    if (this.state.cover) {
      bookService.setCover(bookData._id, this.state.cover).then((result) => {
        this.props.submited({ ...bookData, cover: result.url });
      });
    } else {
      this.props.submited(bookData);
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
    const { title, collection, author, publish_year } = this.state;

    return (
      <Modal show={show} onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>{this.toEdit ? "Edit book" : "Create book"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(evt) => this.handleSubmit(evt)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control value={title} onChange={(evt) => this.setState({ title: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Collection</Form.Label>
              <Form.Control value={collection} onChange={(evt) => this.setState({ collection: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control value={author} onChange={(evt) => this.setState({ author: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Publish year</Form.Label>
              <Form.Control
                type="number"
                value={publish_year}
                onChange={(evt) => this.setState({ publish_year: evt.target.value })}
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
