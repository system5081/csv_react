import React,{useEffect,useState,createContext} from 'react'

import { withCookies } from 'react-cookie'
import axios from 'axios'

export const ApiContext = createContext();

const ApiContextProvider = (props) => {
    const token = props.cookies.get("jwt-token");
    const [csvs, setCsvs] = useState([]);
    //新規
    const [title, setTitle] = useState("");
    const [csv, setCsv] = useState(null);
    // const [thum, setThum] = useState(null);
    //選択された内容
    const [selectedCsv, setSelectedCsv] = useState(null);
    //モーダル
    const [modalIsOpen, setModalIsOpen] = useState(false);


    useEffect(() => {
        const getCsv = async () => {
          try {
            const res = await axios.get("https://csvapi.system5081.com/api/csvs/", {
              headers: {
                Authorization: `JWT ${token}`,
              },
            });
            setCsvs(res.data);
          } catch {
            console.log("error");
          }
        };
        getCsv();
      }, [token]);      //トークンが変わった際にuseEffectが行われる


    const newCsv = async () => {
        const uploadData = new FormData();
        // uploadData.append("title", title);
        uploadData.append("title", title);
        uploadData.append("csv", csv, csv.name);
        // uploadData.append("thum", thum, thum.name);
        try {
            const res = await axios.post(
                "https://csvapi.system5081.com/api/csvs/",
                uploadData,
                {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: `JWT ${token}`,
                    },
                }
            );
            setCsvs([...csvs, res.data]);
            setModalIsOpen(false);
            setTitle("");
            setCsv(null);
            // setThum(null);
        } catch {
            console.log("error");
        }
    };
//csvの削除
    const deleteCsv = async () => {
        try {
            await axios.delete(
                `https://csvapi.system5081.com/api/csvs/${selectedCsv.id}/`,
                {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${token}`,
                    },
                }
            );
            setSelectedCsv(null);
            setCsvs(csvs.filter((item) => item.id !== selectedCsv.id));
        } catch {
            console.log("error");
        }
        };
  return (
    <ApiContext.Provider
      value={{
        csvs,
        title,
        setTitle,
        csv,
        setCsv,
        selectedCsv,
        setSelectedCsv,
        modalIsOpen,
        setModalIsOpen,
        newCsv,
        deleteCsv,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default withCookies(ApiContextProvider);
