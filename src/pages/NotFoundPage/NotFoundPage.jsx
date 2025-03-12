import s from "./NotFoundPage.module.css";
import BackButton from "../../components/BackButton/BackButton";

export default function NotFoundPage() {
  return (
    <div className={s.container}>
      <div className={s.message}>
        <p className={s.text}>Sorry! Not found!</p>
        <BackButton backPath="/movies" /> {}
      </div>
    </div>
  );
}
