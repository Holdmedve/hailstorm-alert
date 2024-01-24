export const baseUrl = () => {
    let url;
    console.log(`REACT_APP_ENV: ${ process.env.REACT_APP_ENV }`);
    switch(process.env.REACT_APP_ENV) {
    case 'prod':
        url = 'https://service-37ihvlsqyq-oa.a.run.app';
        break;
    default:
        url = 'http://localhost:8080'
    }
    return url;
}
