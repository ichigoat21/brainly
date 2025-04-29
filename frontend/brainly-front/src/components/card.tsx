import { ShareIcon } from "./icons/ShareIcon"
interface CardProps {
    title : string,
    link : string,
    type : "youtube" | "twitter"
}
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
export const CardComponent = ({title, link, type} : CardProps) => {
    return <div className="p-4 bg-white rounded-md border-gray-200 max-w-96 border">
        <div className="flex justify-between">
         <div className="flex items-center gap-2">
            <div className="text-gray-500">
            <ShareIcon size="md"/>
            </div>  
         {title}
         </div>
         <div>
         <div className="flex items-center gap-2 text-gray-500">
         <a href={link} target="_blank">
          <ShareIcon size="md"/> 
          </a>s
         <ShareIcon size="md"/>
         </div>
        </div>
    </div>
    <div className="pt-4">
    {type === "youtube" && (
     <iframe
    className="w-full aspect-video rounded-xl"
    src={getYouTubeEmbedLink(link)}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
    />
    )}
    {type === "twitter" && <blockquote className="twitter-tweet min-h-72 min-w-48">
     <a href={link.replace("x.com", "twitter.com")}></a>
    </blockquote>}
    </div>
    </div>
}