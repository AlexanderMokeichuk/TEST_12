import React, {ChangeEvent, useRef} from "react";

interface  Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  name: string,
}
const   FileInput: React.FC<Props> = ({name, onChange}) => {
  const inputRef = useRef(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <>
      <input
        type="file"
        name={name}
        accept="image/*"

        ref={inputRef}
        onChange={onFileChange}
      />
    </>
  );
};

export default FileInput;