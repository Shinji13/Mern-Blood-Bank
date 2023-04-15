import { useQueryClient } from "@tanstack/react-query";
import styles from "./Post.module.css";
import backArrow from "../../../assets/images/arrow-left-solid.svg";
import { ServicePosts } from "../../../utils/types";
import { useNavigate, useParams } from "react-router-dom";
import { motion as m } from "framer-motion";
import { useEffect } from "react";
import { animateScroll } from "react-scroll";

export default function Posts() {
  const navigate = useNavigate();
  const { id, serviceName } = useParams();
  const Client = useQueryClient();
  const service = Client.getQueryData<{
    data: { services: ServicePosts[] };
  }>(["posts"])?.data.services.filter(
    (service) => service.name == serviceName
  )[0];
  const post = service?.posts.filter((post) => post._id == id)[0];

  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 0,
      smooth: true,
    });
  }, []);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "linear" }}
      className={styles.post}
    >
      <div className={styles.firstLayer}>
        <h1>Bloodify</h1>
        <img src={backArrow} onClick={() => navigate(-1)} />
      </div>
      <div className={styles.middleLayer}>
        <h1>Posts</h1>
      </div>
      <div className={styles.content}>
        <div>
          <div>
            <span>1</span>
            <h1>Service that made the post</h1>
          </div>
          <div>
            <div>
              <span>Name</span>
              <span>{service?.name}</span>
            </div>
            <div>
              <span>Address</span>
              <span>{service?.address}</span>
            </div>
          </div>
        </div>
        <div>
          <div>
            <span>2</span>
            <h1>Date when post has been made</h1>
          </div>
          <span>{post?.date}</span>
        </div>
        <div>
          <div>
            <span>3</span>
            <h1>Message of the post</h1>
          </div>
          <p>{post?.message}</p>
        </div>
      </div>
    </m.div>
  );
}
