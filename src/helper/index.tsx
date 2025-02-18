
export const checkLocationPermission = async () => {
    if (!navigator.permissions) {
      console.warn("Permissions API is not supported in this browser.");
      return "unknown";
    }
  
    try {
      const permissionStatus = await navigator.permissions.query({ name: "geolocation" });
      return permissionStatus.state;
    } catch (error) {
      console.error("Error checking location permission:", error);
      return "unknown";
    }
};


export const capitalizeQuery = (query: string): string => {
  return query.replace(/\b\w/g, char => char.toUpperCase());
}
