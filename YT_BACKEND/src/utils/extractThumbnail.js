export function getValidThumbnailUrl(youtubeUrl) {
    const regex = /(?:\?v=|\/embed\/|\.be\/)([\w-]{11})/;
    const match = youtubeUrl.match(regex);
    if (match && match[1]) {
        return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
    return youtubeUrl;
}