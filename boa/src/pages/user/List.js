import React from "react";
import { Container, Button, Table, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import services from "../../services";
import SubmitDialogComponent from "../../components/user/SubmitDialog";
import SearchFormComponent from "../../components/global/SearchForm";
import "./User.css";


export default class UserListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
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
        if (this.props.location.pathname === "/user/list")
            services.user
                .getAll(searchText)
                .then((value) => this.setState({ users: value }))
                .catch((err) => this.setState({ error: err }));
    }

    render() {
        const { users, error, toCreate } = this.state;

        return (
            <Container>
                {error !== undefined && <Alert variant="danger">{error}</Alert>}

                <div className="buttons-container">
                    {<SearchFormComponent
                        search={(text) => this.getList(text)} />}
                </div>
                <SubmitDialogComponent
                    show={toCreate}
                    handleClose={() => this.setState({ toCreate: false })}
                    submited={(createdUser) => this.setState({ users: [...users, createdUser], toCreate: false })}
                />
                <Table responsive>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={`user${index}`}>
                                <td>{user.username}</td>
                                <td style={{ textAlign: "right" }}>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => this.props.history.push(`/user/details/${user._id}`)}>
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