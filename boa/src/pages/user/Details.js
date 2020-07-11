import React from "react";
import { Container, Button, Col, Row, Jumbotron, Spinner, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import userService from "../../services/user";
import RemoveDialogComponent from "../../components/user/RemoveDialog";
import SubmitDialogComponent from "../../components/user/SubmitDialog";
import AuthContext from "../../configs/authContext";
import roles from "../../configs/roles";

export default class UserDetailsPage extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      error: undefined,
      toRemove: false,
      toUpdate: false,
    };
  }

  componentDidMount() {
    userService
      .getOne(this.props.match.params.id)
      .then((value) => this.setState({ user: value }))
      .catch((err) => this.setState({ error: err }));
  }

  render() {
    const { user, error, toRemove, toUpdate } = this.state;

    return (
      <Container>
        <Button variant="outline-primary" style={{ margin: "10px 0" }} onClick={() => this.props.history.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} />
          &nbsp;Back to list
        </Button>
        {error !== undefined && <Alert variant="danger">{error}</Alert>}
        {user !== undefined ? (
          <div>
            <Jumbotron>
              <Row>
                <Col xs={6} md={8} lg={9}>
                  <h1>Username : {user.username}</h1>
                  <h5>User id : {user._id}</h5>
                  {user.role===roles.Admin && <h5>Role : Admin</h5>}
                  {user.role===roles.Contributor && <h5>Role : Contributor</h5>}
                  <h5>Name : {user.name}</h5>
                  <h5>Email : {user.email}</h5>
                  <br />
                  <p>
                    <Button variant="dark" onClick={() => this.setState({ toUpdate: true })}>
                      Update
                    </Button>
                    &nbsp;
                    <Button variant="danger" onClick={() => this.setState({ toRemove: true })}>
                      Remove
                    </Button>
                  </p>
                </Col>
              </Row>
            </Jumbotron>

            <RemoveDialogComponent
              userId={user._id}
              show={toRemove}
              handleClose={() => this.setState({ toRemove: false })}
              removed={() => this.props.history.goBack()}
            />
            <SubmitDialogComponent
              user={user}
              show={toUpdate}
              handleClose={() => this.setState({ toUpdate: false })}
              submited={(updatedUser) => this.setState({ user: updatedUser, toUpdate: false })}
            />
          </div>
        ) : (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
      </Container>
    );
  }
}