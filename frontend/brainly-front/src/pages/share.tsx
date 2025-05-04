import { useEffect, useState } from "react";
import { CardComponent } from "../components/card";
import { SideBarComponent } from "../components/sidebar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";

// Type for content items
interface ContentItem {
  key : number,
  type: string;
  title: string;
  link: string;
}

export const ShareBoard = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const { id } = useParams<{ id: string }>()
  async function fetchContent() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/${id}`,{
      });
      console.log(id)
      setContent([response.data.content]);
    } catch (error) {
      console.error("Failed to fetch shared content:", error);
    }
  } 
 
    useEffect(()=>{
      fetchContent()
    }, [])
     
    

  return (
    <div>
      <SideBarComponent />
      <div className="p-4 ml-72 bg-[#f8fafc] min-h-screen">
        <br />
        <div className="flex gap-4 flex-wrap">
          {content.map(({key, type, title, link})=> <CardComponent key={key} title={title} link={link} type={type as "youtube" | "twitter"}/> )}
        </div>
      </div>
    </div>
  );
};