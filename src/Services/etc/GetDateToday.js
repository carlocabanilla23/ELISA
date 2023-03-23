

export const GetDateToday = () => {
    let today = new Date().toISOString().slice(0, 10)

    return today
}