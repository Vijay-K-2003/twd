import { useState } from "react";
// import { useQuery } from "react-query";
import styles from "./CompanySettingStyles";
import { TableProps, TogglerProps } from "./CompanySettingsProps";
// import { getUsers } from "./api";

import { handleDownload, randomizer } from "./helper";
import data from "./data";

const ITEMS_PER_PAGE = 7;


const Toggler = (props: TogglerProps) => {
    interface Buttons {
        title: string,
        first: boolean,
        last: boolean,
    }
    const btns: Buttons[] = [
        {
            title: "General",
            first: true,
            last: false
        },
        {
            title: "Users",
            first: false,
            last: false
        },
        {
            title: "Plan",
            first: false,
            last: false,
        },
        {
            title: "Billing",
            first: false,
            last: false,
        },
        {
            title: "Integrations",
            first: false,
            last: true
        }
    ];

    const {activeToggle, setActiveToggle} = props;

    return (
        <div className={`${styles.Toggler}`}>
            {
                btns.map((btn, i) => {
                    return (
                        <button 
                            key={i} 
                            className={`${styles.Button} 
                                ${btn.first ? styles.FirstButton: ""} 
                                ${btn.last ? styles.LastButton : ""}
                                ${i == activeToggle ? styles.ButtonActive : ""}`}
                            onClick={()=> setActiveToggle(i)}>
                                    {btn.title}
                        </button>
                    );
                })
            }
        </div>
    );
}

const DataTable: React.FC<TableProps> = ({data}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  // const currentItems = data;
  // const pgs = data.length / ITEMS_PER_PAGE + (data.length % ITEMS_PER_PAGE ? 1 : 0) ;

  return (
    <>
      <table className={`${styles.User_table}`}>
        <thead className={`${styles.User_tablehead}`}>
          <tr className={`${styles.User_table_row}`}>
            <th className={` ${styles.User_table_name}`}><div className={`${styles.User_tablehead_elem}`}>Name <img src="/icons/arrow_down_icon.svg" alt="Name" /></div></th>
            <th><div className={`${styles.User_tablehead_elem}`}>Status <img src="/icons/arrow_down_icon.svg" alt="Status" /></div></th>
            <th><div className={`${styles.User_tablehead_elem}`}>Role <img src="/icons/arrow_down_icon.svg" alt="Role" /></div></th>
            <th><div className={`${styles.User_tablehead_elem}`}>Last Login <img src="/icons/arrow_down_icon.svg" alt="Last login" /></div></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index} className={`${styles.User_table_row}`}>
              <td className={` ${styles.User_table_name}`}><div className={`${styles.User_tablehead_elem}`}>{item.name}</div></td>
              <td><div className={`${styles.User_tablehead_elem}`}><span className={`${styles.User_count}`}><div className="bg-gray-500 rounded-full w-[0.4rem] h-[0.4rem]"></div>{randomizer(0, 1) == 0? "Active" : "Inactive"}</span></div></td>
              <td><div className={`${styles.User_tablehead_elem}`}>{item.role}</div></td>
              <td><div className={`${styles.User_tablehead_elem}`}>{item.lastLogin}</div></td>
              <td className="m-auto"><div className={`${styles.User_tablehead_btn}`}> <button><img className="w-8" src="/icons/delete_icon.svg" alt="Delete" /></button> <button> <img className="w-6" src="/icons/edit_icon.svg" alt="Edit" /> </button> </div></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row justify-between align-center items-center text-center">
        <button
        className={`${styles.csvbtn}`}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <button
        className={`${styles.csvbtn}`}
          disabled={currentItems.length < ITEMS_PER_PAGE}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

const UsersTable = () => {
  // const users = useQuery('users', getUsers)
  // console.log(users);
    return (
        <div className={`${styles.Users}`}>
            <div className={`${styles.Users_header}`}>
                <div className="">
                    <div className={`${styles.User_title}`}>Users <span className={`${styles.User_count}`}>48 users</span></div>
                    <div className={`${styles.User_subtitle}`}>Manage your team members and their account permissions here.</div>
                </div>
                <div className={`${styles.Cta}`}>
                    <button onClick={handleDownload} className={`${styles.csvbtn}`}>
                        <img src="/icons/download_cloud_icon.svg" alt="Download CSV" />    Download CSV
                    </button>
                    <button className={`${styles.addbtn}`}>
                        <span className={`${styles.addicon}`}>+</span> Add User
                    </button>
                </div>
            </div>

            <hr />

            <DataTable data={data} />            
        </div>
    );
}

const CompanySettings = () => {
    const [activeToggle, setActiveToggle] = useState(1);
    return (
        <div className={`${styles.Settings}`}>
            <h1 className={`${styles.Settings_header}`}>Company Settings</h1>
            <Toggler activeToggle={activeToggle} setActiveToggle={setActiveToggle} />
            {
                activeToggle == 1 ?
                    <UsersTable />:
                    "Design Not Provided"
            }
        </div>
    );
}

export default CompanySettings;