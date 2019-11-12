export const getFileBase64 = (file: File | undefined): Promise<string> => {
    return new Promise((resolve) => {
        if (file) {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                const result: string = reader.result as string;

                resolve(result);
            };

            reader.onerror = (error) => {
                console.log('Error: ', error);
                resolve('');
            };
        } else {
            resolve('');
        }
    });
};

export const getSearchParamByName = (name: string): string | null => {
    const location = document.location as any;
    const params = (new URL(location)).searchParams;

    return params.get(name);
};
