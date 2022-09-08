import React from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
class UpdateContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone: "",
      address: {
        city: "",
      },
      showAlertMessage: false,
    };
  }
  toggleAlertMessage = (val) => {
    this.setState({
      showAlertMessage: val,
    });
    setTimeout(() => {
      this.setState({
        showAlertMessage: !val,
      });
    }, 6000);
  };
  InputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };
  AddressInputChange = (field, value) => {
    // handle all address fields
    this.setState({
      address: {
        ...this.state.address, //spread previous value
        [field]: value, //update new value of field
      },
    });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    const userId = this.props.user.id;
    let url = `https://jsonplaceholder.typicode.com/users/1`;
    const { name, email, phone, address } = this.state;
    if (name && email && phone && address.city) {
      fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((user) => {
          console.log(user);
          // call update contact function
          this.props.updateContact(user);
          this.props.hideForm();
        });
    } else {
      this.toggleAlertMessage(true);
    }
  };
  render() {
    const { email, name, phone, address } = this.props.user;
    const { showAlertMessage } = this.state;
    // console.log(this.props);
    return (
      <Container className="m-3">
        <Form
          className="border border-danger p-4 border-2 rounded"
          style={{
            width: "22rem",
            backgroundColor: "lightcyan",
            fontFamily: "Combo cursive",
          }}
        >
          <Row>
            {showAlertMessage && (
              <Alert variant="info">
                Please fill in new or existing records...
              </Alert>
            )}
          </Row>
          {/* email username  phone */}
          <Button
            variant="danger"
            className="my-3"
            onClick={this.props.hideForm}
          >
            Close Form
          </Button>
          <Row>
            {" "}
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={name}
                onChange={(e) => this.InputChange("name", e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={email}
                onChange={(e) => this.InputChange("email", e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} controlId="formGridPhonenumber">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="text"
                placeholder={phone}
                onChange={(e) => this.InputChange("phone", e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder={address.city}
                onChange={(e) =>
                  this.AddressInputChange("city", e.target.value)
                }
              />
            </Form.Group>
          </Row>
          <Button variant="info" type="submit" onClick={this.onFormSubmit}>
            UpdateContact
          </Button>
        </Form>
      </Container>
    );
  }
}

export default UpdateContact;
