import InputField from "../_components/input"

export default function Test() {
  return <>
    <h1>Hej!</h1>
    <InputField customHintText={"Email"} />
    <InputField customHintText={"Password"} isObscure={true} />
  </>
}
