import React, { Component } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

class LoginContent extends Component {
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "90vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="black" textAlign="center">
            Zaloguj się na swoje konto!
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Login"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />

              <Button color="black" fluid size="large">
                Zaloguj się
              </Button>
            </Segment>
          </Form>
          <Segment stacked>
            <Button color="black" fluid size="large">
              Przypomnij hasło
            </Button>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginContent;
