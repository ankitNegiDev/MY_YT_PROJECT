export function timeSince(dateString) {
    // first we we are parsing the date string into a js date object.
    const date = new Date(dateString);
    // here we are getting the differnce since the differe will come in milliseconds so we will divide it with 1000 to get seconds. and math.floor is to remove the decimal part.
    const seconds = Math.floor((new Date() - date) / 1000);

    // 1 year = 365 × 24 × 60 × 60 = 31,536,000 seconds
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return interval === 1 ? "1 year ago" : interval + " years ago";
    }
    // 1 month = 30 × 24 × 60 × 60 = 2,592,000 seconds
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval === 1 ? "1 month ago" : interval + " months ago";
    }
    // 1 day = 24 × 60 × 60 = 86, 400 seconds
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval === 1 ? "1 day ago" : interval + " days ago";
    }
    // 1 hour = 3600 seconds
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval === 1 ? "1 hour ago" : interval + " hours ago";
    }
    // 1 minute = 60 seconds
    interval = Math.floor(seconds / 60); // 120sec/60 -> 2min so ans is 2 + "minutes ago"...
    if (interval >= 1) {
        return interval === 1 ? "1 minute ago" : interval + " minutes ago";
    }
    return "just now";
}