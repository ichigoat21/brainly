import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { CardComponent } from "../components/card";
import { PlusIcon } from "../components/icons/PlusIcon";
import { ShareIcon } from "../components/icons/ShareIcon";
import { ModalComponent } from "../components/modal";
import { SideBarComponent } from "../components/sidebar";
import axios from "axios";
import { BACKEND_URL } from "../config";

type Content = {
  _id: string;
  type: "youtube" | "twitter";
  title: string;
  link: string;
};

export const Dashboard = () => {
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
  }, []);

  return (
    <div>
      <SideBarComponent />
      <div className="p-4 ml-72 bg-[#f8fafc] min-h-screen">
        <ModalComponent
          open={modalOpen}
          onclick={() => {
            setModelOpen(false);
          }}
        />
        <div className="flex justify-end pt-5 gap-2">
          <Button
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
            size="md"
            variant="secondary"
            text="Add Content"
          />
        </div>
        <br />
        <div className="flex gap-4">
          {content.map(({ _id, type, title, link }) => (
            <CardComponent
              key={_id}
              title={title}
              link={link}
              type={type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
