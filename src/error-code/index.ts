import helloMessages from "../modules/HelloModule/hello.json";
import authMessages from "../modules/AuthModule/auth.json";


const messageCode: Record<string, any> = {
  hello: helloMessages,
  auth: authMessages
};

export default messageCode;