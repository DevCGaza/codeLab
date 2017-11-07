export default function (user,table,state,instance) {
    if(user){
        if(!(user.isSuperUser)){
            if(user.role){
                if(user.role.privileges.name == table.name){
                    if(!user.role.privileges.permissions.includes(state)) {
                        throw new Error("sorry you don't have permission to do this action")
                    }
                }
            }else if(table.options && table.options.mapToUser){
                if(!instance && state=="r") throw new Error("you are not authorized to do that")
                if(!instance && state=="w") return
                if(user._id.equals(instance.owner))return
                if(table.options && !table.options.mapAllowRead && state=="r" ){
                    throw new Error("you are not authorized to do that")
                }
            }

        }
    }else if (!table.options){
        throw new Error("you are not authorized")
    } else if(table.options.authenticated){
        if(!table.options.authenticationPermissions || table.options.authenticationPermissions.includes(state)){
            if(!user) throw new Error("you are not authenticated")
        }
    }else if(!table.options.mapAllowRead){
        throw new Error("you are not authorized to do that")
    }else{
        if(state !="r")throw new Error("you are not authorized to do that")

    }
}
