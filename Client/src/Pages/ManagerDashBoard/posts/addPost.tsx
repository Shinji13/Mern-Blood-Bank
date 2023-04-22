import styles from "./servicePosts.module.css";
import { useMutation } from "@tanstack/react-query";
import { addPost } from "../../../utils/apiFunctions";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { post } from "../../../utils/types";
import { UUID } from "uuidjs";
import backArrow from "../../../assets/images/arrow-left-solid.svg";

export default function AddPost() {
  const navigate = useNavigate();
  const postRef = useRef<post>({
    id: UUID.genV4().toString(),
    message: "",
    date: new Date().toString(),
  });
  const { mutate } = useMutation({
    mutationFn: () => addPost(postRef.current, navigate),
  });
  return (
    <div className={styles.addPost}>
      <div className={styles.firstLayer}>
        <h1>Bloodify</h1>
        <img src={backArrow} onClick={() => navigate(-1)} />
      </div>
      <h1>New Post</h1>
      <textarea
        onChange={(evt) => (postRef.current.message = evt.target.value)}
      ></textarea>
      <button
        onClick={() => {
          mutate();
          navigate(-1);
        }}
      >
        Create
      </button>
    </div>
  );
}
