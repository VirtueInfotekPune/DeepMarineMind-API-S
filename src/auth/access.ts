import { infoLogger } from "../core/logger";
import { UnauthorizedResponse } from "../core/response";


export const haveAccess = (type: string | string[], role?: string | string[]) => {
    
    return (req: any, res: any, next: any) => {
        infoLogger("START:- haveAccess function");
        const userTypeMatch = Array.isArray(type) ? type.includes(req.user?.type) : req.user?.type === type;
        const userRoleMatch = role
            ? Array.isArray(role)
                ? role.includes(req.user?.role)
                : req.user?.role === role
            : true; // If role is not provided, skip the check

        if (userTypeMatch && userRoleMatch) {
            return next();
        } else {
            const response = UnauthorizedResponse({ handler: "auth", messageCode: "E019", req: req });
            return res.status(response?.statusCode).send(response);
        }
    };
};

