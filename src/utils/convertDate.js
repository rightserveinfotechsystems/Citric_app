export const  convertDate = (isoDate) => {
    try {
        const date = new Date(isoDate);
    
        // Check if the date is valid
        if (isNaN(date.getTime())) {
          throw new RangeError("Invalid date format or value");
        }
    
        return date.toISOString().split('T')[0];
      } catch (error) {
        console.error("Error formatting date:", error.message);
        // return null; // Or return an appropriate fallback value
      }
    }