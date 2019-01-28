import React from 'react';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import slugify from 'slugify';
import PropTypes from 'prop-types';

import {
  Card, CardBody, FormGroup, CardTitle, Input,
} from 'reactstrap';

import * as pollActions from '../../redux/actions/pollActions';

/*
  Froala editor uses window object.
  At the first load, NEXT JS rendering pages on server side.
  So, components cant reach window object. To access window object,
  we should use Next Js's dynamic function.
*/
const FroalaEditorInput = dynamic(import('react-froala-wysiwyg'), {
  ssr: false,
});

/* Note: not placeholder, We should use placeholderText. */
class PollHeader extends React.Component {
  config = {
    placeholderText: 'Anket açıklamanızı giriniz...',
    heightMin: 100,
    heightMax: 400,
    iframe: true,
    toolbarSticky: false,
    tabSpaces: 4,
    pluginsEnabled: ['align', 'charCounter', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'embedly', 'emoticons', 'entities', 'file', 'fontFamily', 'fontSize', 'fullscreen', 'image', 'imageManager', 'inlineStyle', 'lineBreaker', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'quickInsert', 'quote', 'save', 'table', 'url', 'video', 'wordPaste'],
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', 'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote'],
  };

  constructor(props) {
    super(props);
    this.onDescChange = this.onDescChange.bind(this);
  }

  onDescChange(descContent) {
    this.props.handleDescOnChange(descContent);
  }

  render() {
    const { name, desc, slug } = this.props.poll;
    return (
      <>
        <Card>
          <CardBody>
            <CardTitle>Anket Başlığı</CardTitle>
            <FormGroup>
              <Input
                value={name}
                onChange={e => this.props.handleNameOnChange(e.target.value)}
                placeholder="Anket başlığınızı giriniz..."
              />
            </FormGroup>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>Anket Açıklaması</CardTitle>
            <FormGroup>
              <FroalaEditorInput
                tag="textarea"
                config={this.config}
                model={desc}
                onModelChange={this.onDescChange}
              />
            </FormGroup>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>Anket Adresi</CardTitle>
            <FormGroup>
              <Input
                value={slug}
                onChange={e => this.props.handleSlugOnChange(
                  slugify(e.target.value,
                    {
                      replacement: '-',
                      remove: null,
                      lower: true,
                    }),
                )}
                placeholder="boşluksuz, kısa çizgilerle ayrılmış bir link adı giriniz (ör. anket-1)..."
              />
            </FormGroup>
          </CardBody>
        </Card>
      </>
    );
  }
}

PollHeader.propTypes = {
  poll: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  handleNameOnChange: PropTypes.func.isRequired,
  handleDescOnChange: PropTypes.func.isRequired,
  handleSlugOnChange: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    poll: state.poll,
  };
}

export default connect(
  mapStateToProps,
  pollActions,
)(PollHeader);
