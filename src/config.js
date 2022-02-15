export const region = "eu-west-1"
export const apiUrl = "https://codacons-rest.nimble-lab.com/admin"
export const AppClientId = "11kvqj3rjpqs33rrl1t69op2ts"
export const userPoolId = "eu-west-1_H1gqbqy0j";
export const userGroup = "admin"
export const apiUrlLocal = "http://localhost:4000/admin"
export const googleApiKey = "AIzaSyD7QXN0MgtXx3mElXY2lX6gxb0UYtVbKxY"
export const statusChoices = [
    { id: 'da_confermare', name: 'da confermare'},
    { id: 'nuova', name: 'nuova' },
    { id: 'in_lavorazione', name: 'in lavorazione' },
    { id: 'chiusa', name: 'chiusa' },
]


export const awsConfigure = {
    Auth: {
        region,
        userPoolId,
        userPoolWebClientId: AppClientId,
    }
}