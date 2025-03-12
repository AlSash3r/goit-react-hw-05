import s from "./ErrorMessage.module.css";
export default function ErrorMessage() {
  return (
    <div className={s.errorContainer}>
      <p className={s.errorMessage}>Something went wrong! Please, try again later...</p>
    </div>
  );
}