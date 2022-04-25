import Role, { estimatedDocumentCount } from "../models/role";

const createRoles = async () => {

    try {
        const count = await estimatedDocumentCount()

        if (count > 0) {
            return;
        }
    
        const values = await Promise.all([
        new Role({ name: "admin" }).save(),
        new Role({ name: "intern" }).save(),
        new Role({ name: "user" }).save()
        ]);
        
    } catch (err) {
        console.log(err);
    }
   
};

export default createRoles;