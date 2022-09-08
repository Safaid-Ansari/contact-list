import React from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
class ContactForm extends React.Component {
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
        ...this.state.address, //spread/copy previous value
        [field]: value, //update new value of field
      },
    });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address } = this.state;
    if (name && email && phone && address.city) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((user) => {
          console.log(user);
          //callback function for app component to add new user to the users array for rendering new data
          this.props.formSubmit(user);
        });
    } else {
      this.toggleAlertMessage(true);
    }
  };
  render() {
    const { showAlertMessage } = this.state;
    return (
      <Container>
        {" "}
        <Form
          style={{
            width: "70rem",
            backgroundColor: "lightblue",
            fontFamily: "Combo cursive",
          }}
          className="border border-danger p-4 border-3 rounded  "
        >
          <Row>
            {showAlertMessage && (
              <Alert variant="danger">Please fill in all the details...</Alert>
            )}
          </Row>
          {/* email username  phone */}
          <Row className="mb-3">
            {" "}
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                onChange={(e) => this.InputChange("name", e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => this.InputChange("email", e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} controlId="formGridPhonenumber">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Phone Number"
                onChange={(e) => this.InputChange("phone", e.target.value)}
              />
            </Form.Group>
          </Row>

          {/* email username  phone */}
          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                onChange={(e) =>
                  this.AddressInputChange("city", e.target.value)
                }
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" onClick={this.onFormSubmit}>
            Add Contact
          </Button>
        </Form>
      </Container>
    );
  }
}

export default ContactForm;
