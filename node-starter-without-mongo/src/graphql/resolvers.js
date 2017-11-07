const resolvers = {
	Query:{
    welcome:(_,data,context,root)=>{
        return "welcome to graphql code lab session"
    }
    },

};

export default resolvers