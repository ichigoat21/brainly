import { useEffect, useState } from "react";
import { CardComponent } from "../components/card";
import { SideBarComponent } from "../components/sidebar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";

interface ContentItem {
  _id: string;
  type: string;
  title: string;
  link: string;
}

export const ShareBoard = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const { id } = useParams<{ id: string }>();

  async function fetchContent() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/content/${id}`);
      console.log("Fetched:", response.data);


      setContent(response.data.content);


    } catch (error) {
      console.error("Failed to fetch shared content:", error);
    }
  }

  useEffect(() => {
    if (id) fetchContent();
  }, [id]);

  return (
    <div>
      <SideBarComponent />
      <div className="p-4 ml-72 bg-[#f8fafc] min-h-screen">
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {content.map(({ _id, type, title, link }) => (
            <CardComponent
              key={_id}
              title={title}
              link={link}
              type={type as "youtube" | "twitter"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
