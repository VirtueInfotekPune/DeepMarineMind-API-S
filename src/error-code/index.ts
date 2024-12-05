import helloMessages from "../modules/HelloModule/hello.json";
import authMessages from "../modules/AuthModule/auth.json";
import masterMessages from "../modules/MasterModule/master.json";
import userMessages from "../modules/UserModule/user.json"
import candidateDetailsMessages from "../modules/CandidateDetailsModule/details.json";
import recruiterDetailsMessages from "../modules/RecruiterDetailsModule/recruiterdetails.json"

const messageCode: Record<string, any> = {
  hello: helloMessages,
  auth: authMessages,
  master : masterMessages,
  user : userMessages,
  personalDetails : candidateDetailsMessages,
  recruiterDetaiils : recruiterDetailsMessages
};

export default messageCode;