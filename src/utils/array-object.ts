export function arr2obj(arr: Array<[string, string]>) {
    return arr.reduce((acc, [key, val]) => {
        if (key !== '') {
            acc[key] = val;
        }
        return acc;
    }, {});
}

export function obj2arr(json: { [k: string]: string }): Array<[string, string]> {
    return Object.keys(json).map(key => [key, json[key]] as [string, string]);
}
