export const customDate = (dateInSecunds: number) => {
    const date = new Date(dateInSecunds * 1000);

    return date
}