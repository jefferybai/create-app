
export default function errorCodeMap(err, store) {
    return {
        401: '1',
        415: '2',
        420: '3',
        "not_support_now": "not support now",
    };
}