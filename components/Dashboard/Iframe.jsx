import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Col, Row, FormGroup, Label,
} from 'reactstrap';

class Iframe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 600,
      height: 400,
    };
  }

  widthOnChangeHandle = (e) => {
    this.setState({
      width: e.target.value,
    });
  }

  heightOnChangeHandle = (e) => {
    this.setState({
      height: e.target.value,
    });
  }

  render() {
    const { modal, toggle, pollName } = this.props;
    const { width, height } = this.state;
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Iframe Kodu</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label>Genişlik</Label>
                <Input
                  defaultValue={height}
                  value={width}
                  onChange={e => this.widthOnChangeHandle(e)}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>Yükseklik</Label>
                <Input
                  defaultValue={height}
                  value={height}
                  onChange={e => this.heightOnChangeHandle(e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Input
                  type="textarea"
                  defaultValue={`<iframe width=600 height=400 src=https://questionnaire-test.herokuapp.com/poll/${pollName}></iframe>`}
                  value={`<iframe width=${width} height=${height} src=https://questionnaire-test.herokuapp.com/poll/${pollName}></iframe>`}
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Kapat</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

Iframe.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  pollName: PropTypes.string.isRequired,
};

export default Iframe;
