import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PersonalInfo {
  name: string;
  email: string;
}

const getPersonalInfo = (): PersonalInfo[] => {
  const data = localStorage.getItem("data");
  const personalInfo: PersonalInfo[] = JSON.parse(data!)?.personalInfo;
  return personalInfo;
};

const Planet = () => {
  const navigate = useNavigate();
  const [personalInfo] = useState<PersonalInfo[]>(getPersonalInfo());
  const [showBox, setShowBox] = useState(false);
  const [data, setData] = useState<PersonalInfo>({ name: "", email: "" });
  const universBG = "/img/univers.jpg";

  const handleCircleClick = (d: any) => {
    setData(d);
    setShowBox(true);
  };

  return (
    <>
      <button
        className="absolute  top-4 right-4 bg-blue-500 text-white py-2 px-6 leading-5  rounded-md"
        onClick={() => {
          navigate("/personal-info");
        }}
      >
        Add Info
      </button>
      <div
        className="planet_box w-full h-screen flex justify-center items-center mx-auto bg-bottom bg-no-repeat"
        style={{ backgroundImage: `url(${universBG}) ` }}
      >
        {!personalInfo?.length && (
          <div className="text-white text-3xl">
            No data?{" "}
            <button
              onClick={() => {
                navigate("/personal-info")
              }}
            >
              Add Here
            </button>
          </div>
        )}
        {personalInfo?.length && (
          <div className="planet_box_container">
            <div className="sun bg-gradient-to-r from-red-600 to-red-800 shadow-lg w-16 h-16 rounded-full absolute left-0 right-0 top-0 bottom-0 m-auto"></div>

            {personalInfo.map((d: { name: any }, index: number) => (
              <div
                key={`${index}_${d.name}`}
                className="orbit absolute left-0 right-0 border border-solid border-black shadow-red rounded-full top-0 bottom-0 m-auto"
                style={{
                  zIndex: 999 - index * 9,
                  width: 100 + index * 70 + "px",
                  height: 100 + index * 70 + "px",
                  animation: `gravity ${10 + index * 3}s linear infinite`,
                }}
              >
                <div
                  className="circle cursor-pointer bg-gradient-to-r from-umber-600 to-umber-800 shadow-inner w-5 h-5 rounded-full absolute left-1/2 transform -translate-x-1/2 top-0"
                  onClick={() => handleCircleClick(d)}
                ></div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showBox && (
        <div className="object-box  p-4 shadow-md absolute top-1/2 transform -translate-y-1/2 left-20">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 text-xs text-gray-700 uppercase dark:text-gray-400"
                  >
                    name
                  </th>
                  <td className="px-6 py-4">{data?.name}</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 text-xs text-gray-700 uppercase dark:text-gray-400"
                  >
                    Email
                  </th>
                  <td className="px-6 py-4">{data?.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Planet;
