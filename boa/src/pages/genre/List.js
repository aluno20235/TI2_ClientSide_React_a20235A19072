import React from "react";
import { Container, Button, Table, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPlus } from "@fortawesome/free-solid-svg-icons";
import services from "../../services";
import SubmitDialogComponent from "../../components/genre/SubmitDialog";
import SearchFormComponent from "../../components/global/SearchForm";
import "./Genre.css";

export default class GenreListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      error: undefined,
      toCreate: false,
    };
  }

  componentDidMount() {
    this.getList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.getList();
    }
  }

  getList(searchText) {
    if (this.props.location.pathname === "/genre/list")
      services.genre
        .getAll(searchText)
        .then((value) => this.setState({ genres: value }))
        .catch((err) => this.setState({ error: err }));
  }

  render() {
    
    const { genres, error, toCreate } = this.state;

    return (
      <Container>
        {error !== undefined && <Alert variant="danger">{error}</Alert>}

        <div className="buttons-container">
          <Button
            variant="outline-primary"
            style={{ alignSelf: "flex-start" }}
            onClick={() => this.setState({ toCreate: true })}>
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;Add new genre
          </Button>
          {<SearchFormComponent
           autocomplete
           search={(text) => this.getList(text)} />}
        </div>

        <SubmitDialogComponent
          show={toCreate}
          handleClose={() => this.setState({ toCreate: false })}
          submited={(createdGenre) => this.setState({ genres: [...genres, createdGenre], toCreate: false })}
        />

        <Table responsive>
          <thead>
            <tr>
              <th>Genre</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {genres.map((genre, index) => (
              <tr key={`genre${index}`}>
                <td>{genre.genre}</td>
                <td style={{ textAlign: "right" }}>
                  <Button
                    variant="outline-primary"
                    onClick={() => this.props.history.push(`/genre/details/${genre._id}`)}>
                    <FontAwesomeIcon icon={faInfo} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}
