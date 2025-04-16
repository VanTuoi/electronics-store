type FormDataValue = string | Blob | File;
type FormDataObject = Record<string, FormDataValue | FormDataValue[]>;

export const formDataToObject = (formData: FormData): FormDataObject => {
    const result: FormDataObject = {};

    formData.forEach((value, key) => {
        const isFile = value instanceof Blob;

        if (result[key]) {
            if (!Array.isArray(result[key])) {
                result[key] = [result[key] as FormDataValue];
            }
            (result[key] as FormDataValue[]).push(value);
        } else {
            result[key] = isFile ? [value] : value;
        }
    });

    return result;
};
