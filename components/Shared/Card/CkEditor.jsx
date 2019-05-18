import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';

function CkEditor(props) {
  return (
    <CKEditor
      editor={ClassicEditor}
      {...props}
    />
  );
}

export default CkEditor;
