// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
interface IProps {
  valueChange: any;
  handleChange: (value: any) => void;
}

export default function CkEditor({ valueChange, handleChange }: IProps) {
  const onChange = (e: any, editor: any) => {
    const getData = editor.getData();
    handleChange(getData);
  };
  return <CKEditor editor={ClassicEditor} data={valueChange} onChange={onChange} />;
}
