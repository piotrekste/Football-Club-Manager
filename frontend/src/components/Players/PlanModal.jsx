import React, { Component } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import foto from "../../img/matthew.png";
class PlanModal extends Component {
  state = {
    open: false,
  };
  render() {
    return (
      <Modal
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
        trigger={<Button>Zaplanuj trening</Button>}
      >
        <Modal.Header>planowanie</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src={foto} wrapped />
          <Modal.Description>
            <Header> jsjsjsjsj</Header>
            <p>jsjsjsjsj</p>kalendarz itp
            <p> jsjsjsjsj</p>
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button
            content="Zamknij"
            labelPosition="right"
            icon="checkmark"
            onClick={() => this.setState({ open: false })}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default PlanModal;
