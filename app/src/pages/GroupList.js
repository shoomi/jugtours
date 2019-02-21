import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Navbar, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link} from 'react-router-dom';

class GroupList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            resGroups: [],
            isLoading: true
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/groups')
            .then(response => response.json())
            .then(data => this.setState({groups: data, resGroups: data, isLoading: false}))
    }

    async remove(id) {
        await fetch(`/api/group/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
            this.setState({groups: updatedGroups, resGroups: updatedGroups});
        });
    }

    handleChange(e) {
        if (e.target.value !== "") {
            this.setState({
                groups: this.state.groups.filter(item => {
                    return item.name.toLowerCase().includes(e.target.value.toLowerCase());
                })
            });
        } else {
            this.setState({
                groups: this.state.resGroups
            });
        }
    }

    render() {
        const {groups, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const groupList = groups.map(group => {
            const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;
            return <tr key={group.id}>
                <td style={{whiteSpace: 'nowrap'}}>{group.name}</td>
                <td>{address}</td>
                <td>{group.events.map(event => {
                    return <div key={event.id}>{new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(event.date))}: {event.title}</div>
                })}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/groups/" + group.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <input type="text" className="input" onChange={this.handleChange.bind(this)} placeholder="Search..."/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/groups/new">Add Group</Button>
                    </div>
                    <h3>My JUG Tour</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="20%">Location</th>
                            <th>Events</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groupList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default GroupList;