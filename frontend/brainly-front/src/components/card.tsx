

import axios from "axios";
import { BACKEND_URL } from "../config";
import { DeleteIcon } from "./icons/deteteicon";
import { ShareIcon } from "./icons/ShareIcon"


type which = "youtube" | "twitter"
interface CardProps {
    title : string,
    link : string,
    type : which, 
    ondelete : () => void
}; 
const response = await axios.get(`${BACKEND_URL}/api/v1/contents`, {
  headers : {
    Authorization: localStorage.getItem("token") || "",
  }
});
console.log(response.data)
const contentId = response.data.content._id
const deleteIcon = async () => {
  
  console.log("clicked")

    await axios.delete(`${BACKEND_URL}/api/v1/delete/${contentId}`, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });}



const getYouTubeEmbedLink = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
      }
      const videoId = parsedUrl.searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (e) {
      return ""; 
    }
  };
  
export const CardComponent = ({title, link, type, ondelete} : CardProps) => {
    return <div className="p-3 bg-white rounded-md border border-gray-200 w-80 h-80 overflow-hidden flex flex-col justify-between">
        <div className="flex justify-between">
         <div className="flex items-center gap-2">
            <div className="text-gray-500">
            <ShareIcon size="md"/>
            </div>  
            <div className="flex items-center gap-2 text-sm text-gray-700 truncate max-w-[70%]">
           <span className="truncate">{title}</span>
            </div>
         </div>
         <div>
         <div className="flex items-center gap-2 text-gray-500">
         <a href={link} target="_blank">
         <ShareIcon size="md"/> 
          </a>
         <div onClick={()=>{deleteIcon()}}  className="cursor-pointer"><DeleteIcon  /> 
         </div> 
         </div>
        </div>
    </div>
    <div className="mt-2 flex-1 overflow-hidden rounded-md">
  {type === "youtube" && (
    <iframe
      className="w-full h-full rounded-md block"
      src={getYouTubeEmbedLink(link)}
      title="YouTube video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  )}
  {type === "twitter" && (
    <div className="w-full h-full overflow-auto">
      <blockquote
        className="twitter-tweet w-full min-h-full"
        style={{ height: "100%" }}
      >
        <a href={link.replace("x.com", "twitter.com")}></a>
      </blockquote>
    </div>
  )}
</div>

    </div>
}