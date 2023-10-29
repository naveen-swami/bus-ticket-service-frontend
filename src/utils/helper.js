import axios from 'axios';

let stringifyPayload = (payload) => {
    if (payload) {
        return typeof payload === 'object' ? JSON.stringify(payload) : payload;
    }
    return null;
};

let makeAxiosRequest = async (
    options,
    postData,
) => {

    try {
        postData = stringifyPayload(postData);
        const response = await axios({
            method: options['method'],
            url: options['url'],
            data: postData || undefined,
            headers: options['headers'],
            withCredentials: true
        });
        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        }
        console.log('ERROR IN Request', response.data, response.status);
        return response.data;
    } catch (error) {
        console.log('ERROR', error);


        console.error(error);

        return new Error(error.message);

    }
};

export { stringifyPayload, makeAxiosRequest };
