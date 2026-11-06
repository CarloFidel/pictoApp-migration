 export const getTherapistRole = (roles: string[]) => {
    let istherapist: boolean = false
    if (roles?.includes('therapist')) {
        istherapist = true
    }
    return istherapist
}