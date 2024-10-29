export function dynamicPath(api: string, ...values: Array<string | number>): string {
    const placeholders = api.match(/{\w+}/g); // Get all placeholders like {id}, {userId}, etc.
    if (!placeholders) return api; // If no placeholders, return the original URL

    return placeholders.reduce((url, placeholder, index) => {
        const value = values[index] !== undefined ? values[index] : placeholder;
        return url.replace(placeholder, String(value));
    }, api);
}
