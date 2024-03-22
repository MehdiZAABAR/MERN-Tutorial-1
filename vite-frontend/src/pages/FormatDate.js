export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };
  export function CalculateAge(startDate) {
    // console.log( `startDate of seedling is ${startDate}`);
    const startDateDate = new Date(startDate); // Convert seed.startDate to a Date object
    const currentDate = new Date(); // Get the current date

    // Calculate the difference in milliseconds between the current date and startDate
    const timeDifference = currentDate.getTime() - startDateDate.getTime();

    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Calculate years, months, and days from daysDifference
    const months = Math.floor(daysDifference  / 30); // Assuming a month is 30 days
    const days = daysDifference % 30;

    // Construct the age string
    const age = `${months} months, ${days} days`;
    return { months, days};
}