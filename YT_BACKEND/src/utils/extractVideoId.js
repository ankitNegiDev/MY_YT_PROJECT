export function extractYouTubeVideoId(url) {
    try {
        // creating a new url object..
        const parsedUrl = new URL(url);

        // If URL is like "https://youtu.be/VIDEO_ID" then do this 
        if (parsedUrl.hostname === "youtu.be") {
            return parsedUrl.pathname.slice(1);
        }

        // else if url is standard one like this -->  "youtube.com/watch?v=VIDEO_ID" then search for the 'v' parameter in the url..
        return parsedUrl.searchParams.get("v");
    } catch {
        // If URL is invalid, return null
        return null;
    }
}
