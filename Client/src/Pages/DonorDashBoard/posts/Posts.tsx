import { useNavigate } from "react-router-dom";
import styles from "./Posts.module.css";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { fetchPosts } from "../../../utils/apiFunctions";
import { ServicePosts } from "../../../utils/types";
import { BarChart } from "../../ReUseComponents/Charts";
import Loading from "../../ReUseComponents/Loading/Loading";
import { compareDates } from "../../../utils/utilFunctions";

export const Posts = () => {
  const [posts, changePosts] = useState<ServicePosts[]>([]);
  const navigate = useNavigate();
  const { isError, isLoading, data } = useQuery(
    ["posts"],
    () => {
      return fetchPosts(navigate);
    },
    {
      onSuccess: (data) => {
        changePosts(data.data.services);
      },
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      cacheTime: Infinity,
    }
  );

  const serviceFilterRef = useRef<HTMLInputElement>(null);
  const addressFilterRef = useRef<HTMLInputElement>(null);
  const filterByServiceName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === "" && addressFilterRef.current?.value === "")
      changePosts(data?.data.services);
    else {
      const filteredPosts = data?.data.services.filter(
        (service: ServicePosts) =>
          service.name.includes(evt.target.value, 0) &&
          service.address.includes(addressFilterRef.current?.value as string, 0)
      );
      changePosts(filteredPosts);
    }
  };
  const filterByAddress = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === "" && serviceFilterRef.current?.value === "")
      changePosts(data?.data.services);
    else {
      const filteredPosts = data?.data.services.filter(
        (service: ServicePosts) =>
          service.address.includes(evt.target.value, 0) &&
          service.name.includes(serviceFilterRef.current?.value as string, 0)
      );
      changePosts(filteredPosts);
    }
  };

  const chartData = {
    labels: data?.data.services
      .sort(
        (ServiceA: ServicePosts, ServiceB: ServicePosts) =>
          ServiceA.posts.filter((post) => compareDates(post.date)).length -
          ServiceB.posts.filter((post) => compareDates(post.date)).length
      )
      .slice(-10)
      .map((Service: ServicePosts) => Service.name),
    datasets: [
      {
        label: "Services with Most Posts in last 12 days",
        backgroundColor: "#d52816",
        data: data?.data.services.map(
          (service: ServicePosts) => service.posts.length
        ),
      },
    ],
  };
  if (isLoading) return <Loading />;
  else if (isError) return <h1>Sorry Error occured</h1>;
  else
    return (
      <div className={styles.posts}>
        <div className={styles.intro}>
          <div>
            <h1>Services</h1>
            <h1>Posts</h1>
          </div>
          <div>
            <BarChart data={chartData} />
          </div>
        </div>
        <div className={styles.filter}>
          <div>
            <span>Search wih service name</span>
            <input
              ref={serviceFilterRef}
              type="text"
              onChange={filterByServiceName}
            />
          </div>
          <div>
            <span>Search wih address</span>
            <input
              ref={addressFilterRef}
              type="text"
              onChange={filterByAddress}
            />
          </div>
        </div>
        <div className={styles.list}>
          {posts.map((el: ServicePosts) =>
            el.posts.map((post, index) => {
              return !compareDates(post.date) ? (
                <div
                  className={styles.post}
                  key={post._id}
                  onClick={() => navigate(`/Posts/${post._id}/${el.name}`)}
                >
                  <span>{index}</span>
                  <div>
                    <span>Service Name</span>
                    <span>{el.name}</span>
                  </div>
                  <div>
                    <span>Service address</span>
                    <span>{el.address}</span>
                  </div>
                  <div>
                    <span>Date of Exchange</span>
                    <span>{post.date.substring(0, 24)}</span>
                  </div>
                </div>
              ) : (
                ""
              );
            })
          )}
        </div>
      </div>
    );
};
