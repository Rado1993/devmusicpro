export const ClearField = (array: any,form:any) => {
    array.map((obj:any) => {form.setValue(obj, undefined)})
}