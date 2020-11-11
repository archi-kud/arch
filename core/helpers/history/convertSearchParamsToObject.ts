type SearchObject = Record<string, string>;

function convertSearchParamsToObject(params: URLSearchParams): SearchObject {
    const search: SearchObject = {};

    for (const [name, value] of params) {
        search[name] = value;
    }

    return search;
}

export default convertSearchParamsToObject;