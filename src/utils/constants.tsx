export const ERROR_MESSAGES: Record<number, string> = {
    404: "The requested resource was not found.",
    101: "Unauthorized access. Please check your API key.",
    429: "You have reached your subscription's monthly request limit.",
    601: "Invalid or missing query value.",
    603: "Historical data is not supported on your plan.",
    604: "Bulk queries are not supported on your plan.",
    605: "Invalid language code specified.",
    606: "Invalid unit value specified.",
    607: "Invalid interval value specified.",
    608: "Invalid forecast days value specified.",
    609: "Weather forecast data is not supported on your plan.",
    611: "Invalid historical date specified.",
    612: "Invalid historical time frame specified.",
    613: "Historical time frame too long. Maximum allowed: 60 days.",
    614: "Missing historical date.",
    615: "API request has failed. Please try again later.",
};

export const TOP15CITIESBYPOPULATION = [
  "Tokyo", "Delhi", "Shanghai", "Dhaka", "Sao Paulo",
  "Cairo", "Mexico City", "Beijing", "Mumbai", "Osaka",
  "Chongqing", "Karachi", "Kinshasa", "Lagos", "Istanbul"
]; // source: https://www.jagranjosh.com/general-knowledge/largest-cities-in-the-world-by-population-1697031444-1 
