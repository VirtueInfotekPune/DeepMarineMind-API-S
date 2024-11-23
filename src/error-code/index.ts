import helloMessages from "../modules/HelloModule/hello.json";
import authMessages from "../modules/AuthModule/auth.json";
import masterMessages from "../modules/MasterModule/master.json";


const messageCode: Record<string, any> = {
  hello: helloMessages,
  auth: authMessages,
  master : masterMessages
};

export default messageCode;