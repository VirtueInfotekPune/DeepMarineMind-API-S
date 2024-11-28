import helloMessages from "../modules/HelloModule/hello.json";
import authMessages from "../modules/AuthModule/auth.json";
import masterMessages from "../modules/MasterModule/master.json";
import experienceMesssages  from "../modules/ExperienceModule/experience.json"
import userMessages from "../modules/UserModule/user.json"


const messageCode: Record<string, any> = {
  hello: helloMessages,
  auth: authMessages,
  master : masterMessages,
  experience : experienceMesssages,
  user : userMessages
};

export default messageCode;