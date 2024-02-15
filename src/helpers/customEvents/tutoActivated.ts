interface Props {
  active: boolean;
  section?: string;
}
const onTutoActivated = (props: Props) =>
  new CustomEvent("tutoActivated", { detail: props });

export default onTutoActivated;
