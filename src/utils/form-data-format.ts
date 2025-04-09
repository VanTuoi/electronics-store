type FormDataValue = string | Blob | File;
type FormDataObject = Record<string, FormDataValue>;

export const formDataToObject = (formData: FormData): FormDataObject => {
    const result: FormDataObject = {};
    formData.forEach((value, key) => {
        if (typeof value === "string" || value instanceof Blob) {
            result[key] = value;
        }
    });
    return result;
};
