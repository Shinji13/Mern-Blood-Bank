import { useNavigate } from "react-router";
import backArrow from "../../../assets/images/arrow-left-solid.svg";
import styles from "./add.module.css";
import { useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addRequest, fetchServices } from "../../../utils/apiFunctions";
import { request, service } from "../../../utils/types";
import { ServiceInfo } from "../../../utils/valtioStore";

export default function AddRequest() {
  const [selectedService, changeSelectedService] = useState("");
  const navigate = useNavigate();
  const { isLoading: LoadingServices, data: ServicesData } = useQuery<{
    data: { services: service[] };
  }>(["services"], () => fetchServices(navigate));
  const [errorMessage, SetErrorMessage] = useState<string>("");
  const [options, SetOptions] = useState<string[]>([]);
  const newRequestRef = useRef<request>({
    recieverService: "",
    senderService: ServiceInfo.service.name,
    date: new Date().toString(),
    respondMessage: "",
    requestStatus: 0,
    requestMessage: "",
  });
  const { mutate } = useMutation({
    mutationFn: () => addRequest(navigate, newRequestRef.current),
  });
  const createRequestHandler = () => {
    if (newRequestRef.current.recieverService == "") {
      SetErrorMessage("Please select a service to send the request to");
      return;
    }
    if (newRequestRef.current.requestMessage.length < 20) {
      SetErrorMessage(
        "Please enter a message that contains at least 20 letters"
      );
      return;
    }
    mutate();
  };
  return (
    <div className={styles.add}>
      <div className={styles.firstLayer}>
        <h1>Bloodify</h1>
        <img src={backArrow} onClick={() => navigate(-1)} />
      </div>
      <div className={styles.secondLayer}>
        <h1>New Request</h1>
        <div className={styles.service}>
          <h3>
            <span>1</span> Select Service
          </h3>
          <input
            onFocus={() => SetErrorMessage("")}
            value={selectedService}
            onChange={(evt) => {
              const options =
                evt.target.value === ""
                  ? []
                  : ServicesData?.data.services
                      .filter((service: { name: string; address: string }) => {
                        return (
                          service.name.includes(evt.target.value, 0) &&
                          service.name !== ServiceInfo.service.name
                        );
                      })
                      .map(
                        (service: { name: string; address: string }) =>
                          service.name
                      )!;
              changeSelectedService(evt.target.value);
              SetOptions(options);
            }}
          />
          <ul>
            {options.map((el) => (
              <li
                onClick={(evt) => {
                  newRequestRef.current.recieverService =
                    evt.currentTarget.textContent || "";
                  changeSelectedService(evt.currentTarget.textContent || "");
                  SetOptions([]);
                }}
                key={el}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>
            <span>2</span> Request Message{" "}
            <span>(please write at least 20 letters)</span>
          </h3>
          <textarea
            onFocus={() => SetErrorMessage("")}
            onChange={(evt) =>
              (newRequestRef.current.requestMessage = evt.target.value)
            }
          />
        </div>
        <button onClick={createRequestHandler}>Create</button>
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
