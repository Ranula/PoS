export const viewOrder = (item) => {
    console.log("adding Item", item)
    return{
        type: 'add',
        item
    }
}