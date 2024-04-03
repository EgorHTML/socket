export default async function (url, data = {}) {
    const response = await fetch(url, data)
    if (response.status === 401) {
        if (window.location.pathname !== '/login')
            window.location.replace("/login");
        throw new Error(response.message || 'Unauthorized')
    }
    return response
}