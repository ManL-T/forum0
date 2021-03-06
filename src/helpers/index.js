export const findById = (resources, id) => {
    if (!resources) return null // to avoid getting undefined when trying to get authUser for the navbar
    return resources.find(r => r.id === id)
}

export const upsert = (resources, resource) => {
    const index = resources.findIndex(r => r.id === resource.id)
    if (resource.id && index !== -1) {
        resources[index] = resource
    } else {
        resources.push(resource)
    }
}

export const docToResource = (doc) => {
    if (typeof doc?.data !== 'function') return doc
    return { ...doc.data(), id: doc.id}
}