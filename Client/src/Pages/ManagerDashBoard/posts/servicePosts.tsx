import styles from "./servicePosts.module.css";
import { ServiceInfo } from "../../../utils/valtioStore";
import { useSnapshot } from "valtio";
import { useNavigate } from "react-router";

export default function ServicePosts() {
  const service = useSnapshot(ServiceInfo);
  const navigate = useNavigate();
  return (
    <div className={styles.list}>
      {service.service.posts.map((post, index) => {
        return (
          <div
            className={styles.post}
            key={post.id}
            onClick={() =>
              navigate(`/Posts/${post.id}/${service.service.name}`)
            }
          >
            <span>{index}</span>
            <div>
              <span>Service Name</span>
              <span>{service.service.name}</span>
            </div>
            <div>
              <span>Service address</span>
              <span>{service.service.address}</span>
            </div>
            <div>
              <span>Date of Exchange</span>
              <span>{post.date.substring(0, 24)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
