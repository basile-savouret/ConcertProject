import { addMember } from "./addMember";
import { getAllMembers } from "./getAllMembers";
import { getMember } from "./getMember";
import { updateMember } from "./updateMember";


export const memberClient = {
    getAllMembers: getAllMembers,
    getMember: getMember,
    updateMember: updateMember,
    addMember: addMember
}