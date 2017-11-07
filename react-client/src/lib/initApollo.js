import { ApolloClient, createNetworkInterface } from 'react-apollo';

const networkInterface = createNetworkInterface({
    uri:"https://api.graph.cool/simple/v1/cj9hc2ehu0mg90162nxszjcu5",

});
// this section is just for real time apps and middleware's
//import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
// const wsClient = new SubscriptionClient(
//     'wss://subscriptions.graph.cool/v1/cj9hc2ehu0mg90162nxszjcu5' ,
//     {reconnect:true}
// );
// networkInterface.use([{
//     applyMiddleware(req, next) {
//         if (!req.options.headers) {
//             req.options.headers = {};  // Create the header object if needed.
//         }
//         // get the authentication token from local storage if it exists
//         const token = localStorage.getItem('token');
//         req.options.headers.authorization = token ? token : null;
//         next();
//     }
// }]);
// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//     networkInterface,
//     wsClient
// );

const client = new ApolloClient({
    networkInterface

});
export default client