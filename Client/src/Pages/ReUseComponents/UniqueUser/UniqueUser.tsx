import { useParams } from "react-router";
import { interaction, user } from "../../../utils/types";
import { useNavigate } from "react-router-dom";
import backArrow from "../../../assets/images/arrow-left-solid.svg";
import styles from "./User.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchInteractions } from "../../../utils/apiFunctions";
import { Interactions } from "../showInteractions/showInteractions";
import { LineChart } from "../Charts";
import Loading from "../Loading/Loading";

type Props = {
  userType: "donors" | "patients";
};

export default function UniqueUser({ userType }: Props) {
  const navigate = useNavigate();
  const client = useQueryClient();
  const { id } = useParams();
  const user =
    userType == "donors"
      ? client
          .getQueryData<{ data: { donors: user[] } }>(["donors"])
          ?.data.donors.filter((donor) => donor.nationalId == id)[0]!
      : client
          .getQueryData<{ data: { patients: user[] } }>(["patients"])
          ?.data.patients.filter((patient) => patient.nationalId == id)[0]!;
  const { isLoading, data } = useQuery<{
    data: { interactions: interaction[] };
  }>(
    ["interactions", user.nationalId],
    () => {
      return fetchInteractions(navigate, "donor", user.interactions);
    },
    {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      cacheTime: Infinity,
    }
  );
  const chartData = {
    labels: data?.data.interactions.map((int: interaction) =>
      int.date.substring(0, 15)
    ),
    datasets: [
      {
        label: userType == "donors" ? "Donation rate" : "planting rate",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "#d52816",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: data?.data.interactions.map((int: interaction) => int.Quantity),
      },
    ],
  };
  return (
    <div className={styles.user}>
      <div className={styles.firstLayer}>
        <h1>Bloodify</h1>
        <img src={backArrow} onClick={() => navigate(-1)} />
      </div>
      <ProfileLayer userType={userType} user={user} navigate={navigate} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.static}>
          <div>
            <h1>{user.fullName} blood exchanges ratio</h1>
            <div>
              <LineChart data={chartData} />
            </div>
          </div>
          <Interactions data={data?.data.interactions!} isService={true} />
        </div>
      )}
    </div>
  );
}

const ProfileLayer = ({
  userType,
  user,
  navigate,
}: {
  userType: "donors" | "patients";
  user: user;
  navigate: Function;
}) => {
  return (
    <div className={styles.profile}>
      <div className={styles.fields}>
        <div>
          <div>
            <span>1</span>
            <h3>User Identifier</h3>
          </div>
          <div>
            <div>
              <span>Full Name</span>
              <span>{user.fullName}</span>
            </div>
            <div>
              <span>National Identificateur</span>
              <span>{user.nationalId}</span>
            </div>
          </div>
        </div>
        <div>
          <div>
            <span>2</span>
            <h3>Personal Information</h3>
          </div>
          <div>
            <div>
              <span>Address</span>
              <span>{user.address}</span>
            </div>
            <div>
              <span>Age</span>
              <span>{user.age}</span>
            </div>
            <div>
              <span>Blood Type</span>
              <span>{user.bloodtype}</span>
            </div>
          </div>
        </div>
        <div>
          <div>
            <span>3</span>
            <h3>Extra Information</h3>
          </div>
          <div>
            <div>
              <span>Telephone</span>
              <span>{user.tel}</span>
            </div>
            {userType == "donors" ? (
              <div>
                <span>Last Donation Date</span>
                <span>{user.lastDonation?.substring(0, 16)}</span>
              </div>
            ) : (
              <button
                onClick={() => navigate(`/patients/${user.nationalId}/update`)}
              >
                Modify
              </button>
            )}
          </div>
        </div>
      </div>
      <img src={`/api/static/images/${user.profileImgPath}`} />
    </div>
  );
};
