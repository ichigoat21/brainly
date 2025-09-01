import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { CardComponent } from "../components/card";
import { PlusIcon } from "../components/icons/PlusIcon";
import { ShareIcon } from "../components/icons/ShareIcon";
import { ModalComponent } from "../components/modal";
import { SideBarComponent } from "../components/sidebar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { NightIcon } from "../components/icons/NightMode";
import { LightIcon } from "../components/icons/LightMode";

type Content = {
  _id: string;
  type: "youtube" | "twitter";
  title: string;
  link: string;
};

export const Dashboard = () => {
  const [mode, setMode] = useState(true);
  const [content, setContent] = useState<Content[]>([]);
  const [modalOpen, setModelOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${BACKEND_URL}/api/v1/content/preview`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setContent(response.data.content);
    }
    fetchData();
  }, [modalOpen]);

  async function deleteHandler(id : string){
    try {
     const response =  await axios.delete(`${BACKEND_URL}/api/v1/content/delete/${id}`, {
      headers : {
        Authorization : localStorage.getItem("token")
      }
    })
    console.log(response.data.message)
    setContent((item) => item.filter(c => c._id !== id))
  } catch(error) {
    console.error("Error deleting content", error);
  }
  }
  async function shareHandler(){
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/content/share`,{
            share : true
        }, {
          headers : {
            Authorization : localStorage.getItem('token')
          }
        })
        const hash = response.data.hash
        alert(`http://localhost:5173/${hash}`)
    } catch (e){
      console.log("Error Sharing", e)
    }
  }

  return (
    <div>
      <SideBarComponent />
      <div className={`p-4 ml-72 ${mode ?  "bg-[#f8fafc]" : "bg-gray-900" }  min-h-screen`}>
        <ModalComponent
          open={modalOpen}
          onclick={() => {
            setModelOpen(false);
          }}
        />
        <div className="flex justify-end items-center pt-5 gap-2">
          <div>
        {mode ? (
              <NightIcon size="lg" onclick={() => setMode(false)} />
                ) : (
               <LightIcon size="lg" onclick={() => setMode(true)} />
                )              
           }
          </div>
          <Button
            onclick={() => {
              shareHandler()
            }}
            startIcon={<ShareIcon size="lg" />}
            size="lg"
            variant="primary"
            text="Share"
          />
          <Button
            onclick={() => {
              setModelOpen(true);
            }}
            endIcon={<PlusIcon size="lg" />}
            size="lg"
            variant="secondary"
            text="Add Content"
          />

        </div>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {content.map(({ _id, type, title, link }) => (
            <CardComponent
              key={_id}
              title={title}
              link={link}
              type={type}
              ondelete={() => {deleteHandler(_id)}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
