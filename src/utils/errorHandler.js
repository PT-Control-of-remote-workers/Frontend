export function getMessageFromError(err) {
    if (err.response) {
        if (err.response.data.message && err.response.data.messages) {
            return `${err.response.data.message}; ${err.response.data.messages.join('; ')}`
        } else if (err.response.data.message) {
            return err.response.data.message
        } else if (err.response.data.messages) {
            return err.response.data.messages.join('; ')
        }
    }
    throw err
}