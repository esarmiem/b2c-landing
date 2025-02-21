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