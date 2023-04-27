import styles from "./UniqueRequest.module.css";
import backArrow from "../../../assets/images/arrow-left-solid.svg";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../utils/types";
import { useRef, useState } from "react";
import { respondRequest } from "../../../utils/apiFunctions";

export default function UniqueRequest() {
  const [errorMessage, setError] = useState("");
  const { id, type } = useParams() as { id: string; type: string };
  const client = useQueryClient();
  const request = client
    .getQueryData<{
      data: { requestsSent: request[]; requestsRecieved: request[] };
    }>(["requests"])
    ?.data[+type == 0 ? "requestsSent" : "requestsRecieved"].filter(
      (req: request) => req._id == id
    )[0];
  const navigate = useNavigate();
  const respondRef = useRef<HTMLTextAreaElement>(null);
  const { mutate } = useMutation({
    mutationFn: (status: 1 | 2) =>
      respondRequest(navigate, id, status, respondRef.current?.value!),
  });

  const respond = (status: 2 | 1) => {
    if (respondRef.current?.value.length! < 20) {
      setError("Please write a response with at least 20 characters");
      return;
    }
    mutate(status);
  };
  return (
    <div className={styles.request}>
      <div className={styles.firstLayer}>
        <h1>Bloodify</h1>
        <img src={backArrow} onClick={() => navigate(-1)} />
      </div>
      <div className={styles.secondLayer}>
        <div>
          <h3>
            <span>1</span> Services of the request
          </h3>
          <div>
            <h4>Sender service</h4>
            <h4>Reciever service</h4>
            <span>{request?.senderService}</span>
            <span>{request?.recieverService}</span>
          </div>
        </div>
        <div>
          <h3>
            <span>2</span> Submiting date of the request
          </h3>
          <span>{request?.date?.substring(0, 16)}</span>
        </div>
        <div>
          <h3>
            <span>3</span> Status of the request
          </h3>
          <span>
            {request?.requestStatus == 0
              ? "Pending"
              : request?.requestStatus == 1
              ? "Accepted"
              : "Rejected"}
          </span>
        </div>
        <div>
          <h3>
            <span>4</span> Request message
          </h3>
          <p>{request?.requestMessage}</p>
        </div>
        <div>
          <h3>
            <span>5</span> Respond message
          </h3>
          {+type == 1 && request?.requestStatus == 0 ? (
            <textarea onFocus={() => setError("")} ref={respondRef} />
          ) : (
            <p>{request?.respondMessage}</p>
          )}
        </div>
        {+type == 1 && request?.requestStatus == 0 ? (
          <div className={styles.action}>
            <button onClick={() => respond(2)}>Reject</button>
            <button onClick={() => respond(1)}>Accept</button>
          </div>
        ) : (
          ""
        )}
      </div>
      {errorMessage != "" ? (
        <div className={styles.errorLayer}>
          <i className="fas fa-exclamation-triangle"></i>
          <span>{errorMessage}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
