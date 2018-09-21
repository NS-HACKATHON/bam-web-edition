export function updateUserProfileName(firstname) {
    return {
        type:'CHANGE_FIRST_NAME',
        payload: firstname
    }
}