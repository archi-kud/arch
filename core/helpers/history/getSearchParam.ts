function getSearchParam(search: string, name: string): string {
    const params = new URLSearchParams(search);
    const param = params.get(name);

    return param ?? '';
}

export default getSearchParam;