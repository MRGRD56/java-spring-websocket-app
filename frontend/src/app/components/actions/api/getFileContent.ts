import {axiosInstance} from '../request';

const getFileContent = () => (
    axiosInstance.get<string>('/fileContent')
        .then(response => response.data)
);

export default getFileContent;
