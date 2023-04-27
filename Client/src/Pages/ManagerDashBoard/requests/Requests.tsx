import { useQuery } from "@tanstack/react-query";
import { getRequests } from "../../../utils/apiFunctions";
import { useNavigate } from "react-router";
import { request } from "../../../utils/types";
import styles from "./requests.module.css";
import { useState } from "react";
import Loading from "../../ReUseComponents/Loading/Loading";

export default function Requests() {
  const navigate = useNavigate();
  const [sentRequests, showSentRequests] = useState(false);
  const [recievedRequests, showRecievedRequests] = useState(false);
  const { data, isLoading } = useQuery<{
    data: { requestsSent: request[]; requestsRecieved: request[] };
  }>(["requests"], () => getRequests(navigate), {
    cacheTime: Infinity,
  });
  if (isLoading) return <Loading />;
  return (
    <div className={styles.requests}>
      <div className={styles.sent}>
        <div className={styles.header}>
          {sentRequests ? (
            <i
              className="fa-solid fa-eye-slash"
              onClick={() => showSentRequests(false)}
            ></i>
          ) : (
            <i
              className="fa-solid fa-eye"
              onClick={() => showSentRequests(true)}
            ></i>
          )}
          <h1>
            The Sented Requests
            <span> (total of {data?.data.requestsSent.length})</span>
          </h1>
        </div>
        <RequestsView
          requests={data?.data.requestsSent!}
          requestType={0}
          show={sentRequests}
        />
      </div>
      <div className={styles.recieved}>
        <div className={styles.header}>
          {recievedRequests ? (
            <i
              className="fa-solid fa-eye-slash"
              onClick={() => showRecievedRequests(false)}
            ></i>
          ) : (
            <i
              className="fa-solid fa-eye"
              onClick={() => showRecievedRequests(true)}
            ></i>
          )}
          <h1>
            The Recieved Requests
            <span> (total of {data?.data.requestsRecieved.length})</span>
          </h1>
        </div>
        <RequestsView
          requests={data?.data.requestsRecieved!}
          requestType={1}
          show={recievedRequests}
        />
      </div>
    </div>
  );
}

const RequestsView = ({
  requests,
  requestType,
  show,
}: {
  requests: request[];
  requestType: 0 | 1;
  show: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.list} style={{ display: show ? "flex" : "none" }}>
      {requests.map((req: request, index: number) => {
        return (
          <div
            key={req._id}
            onClick={() => navigate(`/requests/${req._id}/${requestType}`)}
          >
            <span>{index}</span>
            <div>
              <span>Service name</span>
              <span>
                {requestType == 0 ? req.senderService : req.recieverService}
              </span>
            </div>
            <div>
              <span>Date</span>
              <span>{req.date?.substring(0, 16)}</span>
            </div>
            <div>
              <span>Status</span>
              <span>
                {req.requestStatus == 0
                  ? "Pending"
                  : req.requestStatus == 1
                  ? "Accepted"
                  : "Rejected"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
