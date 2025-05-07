
export default function InputField({ isObscure, customHintText, value, onChange }) {
  const inputType = isObscure ? "password" : "text";

  return <>
    <input type={inputType}
           placeholder={customHintText}
           value={value}
           onChange={onChange}
           className="ge-white-bg-color ge-border-focus px-2 py-3" />
  </>
}