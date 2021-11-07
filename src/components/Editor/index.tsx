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
  valueWorkExp: any;
  watchWorkExp: (value: any) => void;
}
export default function MyEditor({ valueWorkExp, watchWorkExp }: IProps) {
  const [value, setValue] = useState(valueWorkExp);
  const onChange = (event: EditorChangeEvent) => {
    setValue(event.html)
    watchWorkExp(event.html);
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
        [InsertTable],
      ]}
      contentStyle={{ height: 330 }}
    />
  );
}
