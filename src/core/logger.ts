export const infoLogger = (message: string): void => {
    console.log("INFO:", message);
};

export const errorLogger = (message: string, error: unknown): void => {
    console.log("ERROR:", message);
    console.error(error);
};

export const dataLogger = (message: string, data: any): void => {
    console.log("DATA:", message);
    console.log(data);
};

export const successLogger = (message: string, data: any): void => {
    console.log("SUCCESS:", message);
    console.log(data);  
};
