export const calculateAge = (birthdate: string): number => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const calculateAndCompareAge = (birthDate: string, ageToCompare: number): boolean => {
    const currentDate = new Date();
    const birthDateObj = new Date(birthDate);
    let age = currentDate.getFullYear() - birthDateObj.getFullYear();
    const hasBirthdayPassed = (
        currentDate.getMonth() > birthDateObj.getMonth() ||
        (currentDate.getMonth() === birthDateObj.getMonth() && currentDate.getDate() >= birthDateObj.getDate())
    );
    if (!hasBirthdayPassed) {
        age -= 1;
    }
    return age === ageToCompare;
}

export const calculateDaysBetweenDates = (departure: string, arrival: string): number => {
    // Convert the dates in "dd/mm/yyyy" format to Date objects
    const departureDate = new Date(
        parseInt(departure.split('/')[2]), // Year
        parseInt(departure.split('/')[1]) - 1, // Month (subtract 1 because months in Date are 0-based)
        parseInt(departure.split('/')[0]) // Day
    );

    const arrivalDate = new Date(
        parseInt(arrival.split('/')[2]), // Year
        parseInt(arrival.split('/')[1]) - 1, // Month (subtract 1 because months in Date are 0-based)
        parseInt(arrival.split('/')[0]) // Day
    );

    // Calculate the difference in milliseconds
    const differenceMs = arrivalDate.getTime() - departureDate.getTime();

    // Convert the difference from milliseconds to days
    const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    return daysDifference;
}