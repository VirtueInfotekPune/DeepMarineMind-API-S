import { Request } from "express";
import { dataLogger, errorLogger, infoLogger } from "./logger";
import messageCode from "../error-code/index";
interface Data {
  handler: string;
  messageCode: string;
  req?: Request;
  data?: any;
  error?: any;
}


const statusCode = {
  catch: 500,
  error: 400,
  Unauthorized: 401,
  Forbidden: 403,
  notFound: 404,
  success: 200,
};

const getMessage = (handler: string, locale: string, code: string): string => {
  const messages = messageCode[handler];
  if (!messages) {
    return "Handler not found";
  }
  return messages[locale]?.[code] ?? "Message not found";
};

export const successResponse = (data: Data): Record<string, any> => {
    infoLogger("START:- responser success function");
  try {
    const responseData = {
      statusCode: statusCode.success,
      message: getMessage(data.handler, (data.req?.headers['locale'] as string) || "en", data.messageCode),
      data: data.data ?? undefined,
    };
    dataLogger("responseData", responseData);
    return responseData;
  } catch (err) {
    errorLogger("successResponse error", err);
    return {
      statusCode: statusCode.catch,
      message: "Internal Server Error",
      error: err,
    };
  }
};

export const catchResponse = (data: Data): Record<string, any> => {
  infoLogger("in catchreponse logger")
  try {
    const responseData = {
      statusCode: statusCode.catch,
      message: getMessage(data.handler,(data.req?.headers['locale'] as string) || "en", data.messageCode),
      error: data.error ?? undefined,
    };
    dataLogger("responseData" , responseData)
    return responseData;
  } catch (err) {
    errorLogger("error in catchresponse" , err)
    return {
      statusCode: statusCode.catch,
      message: "Internal Server Error",
      error: err,
    };
  }
};


export const UnauthorizedResponse = (data: Data ): Record<string, any> => {
  try {
    const responseData = {
      statusCode: statusCode.Unauthorized,
      message: getMessage(data.handler, (data.req?.headers['locale'] as string) || "en", data.messageCode) ,
      error: data.error ?? undefined,
    };
    dataLogger("responseData" , responseData)
    return responseData;
  } catch (err) {
    errorLogger("error in UnauthorizedResponse" , err)
    return {
      statusCode: statusCode.catch,
      message: "Internal Server Error",
      error: err,
    };
  }
}

export const failureResponse = (data: Data): Record<string, any> => {
   infoLogger("START:- failure function")
  try {
    const responseData = {
      statusCode: statusCode.error,
      message: getMessage(data.handler, (data.req?.headers['locale'] as string) || "en", data.messageCode),
      error: data.error ?? undefined,
    };
    dataLogger("responseData" , responseData)
    return responseData;
  } catch (err) {
    errorLogger("failure error" , err)
    return {
      statusCode: statusCode.catch,
      message: "Internal Server Error",
      error: err,
    };
  }
};


