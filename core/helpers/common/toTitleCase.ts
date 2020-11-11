function toTitleCase(str: string): string {
    return str.replace(/\w/, str.split('')[0].toUpperCase());
}

export default toTitleCase;