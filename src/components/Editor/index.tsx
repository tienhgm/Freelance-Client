import { Editor, EditorTools, EditorChangeEvent } from '@progress/kendo-react-editor';
import React, { useState } from 'react';

const {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  OrderedList,
  UnorderedList,
  Undo,
  Redo,
  FontSize,
  FontName,
  FormatBlock,
  Link,
  Unlink,
  InsertImage,
  ViewHtml,
  InsertTable,
} = EditorTools;
interface IProps {
  valueChange: any;
  handleChange: (value: any) => void;
  height?: number;
}
export default function MyEditor({ valueChange, handleChange, height = 300 }: IProps) {
  const [value, setValue] = useState(valueChange);
  const onChange = (event: EditorChangeEvent) => {
    setValue(event.html);
    handleChange(event.html);
  };
  return (
    <Editor
      value={value}
      onChange={onChange}
      tools={[
        [Bold, Italic, Underline],
        [AlignLeft, AlignCenter, AlignRight, AlignJustify],
        [Indent, Outdent],
        [OrderedList, UnorderedList],
        FontSize,
        FontName,
        FormatBlock,
        [Undo, Redo],
        [Link, Unlink, InsertImage, ViewHtml],
        // [InsertTable],
      ]}
      contentStyle={{ height: height }}
    />
  );
}
