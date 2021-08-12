const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const {getShortLivedAccessToken} = require("./resolvers/instagram")

// initialize express
const app = express();

// express configs
app.use(cors()); // cors set up
app.use(express.json()); // json format
app.use(express.urlencoded({ extended: false })); // data parsing

// configure the apollo server
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  return server.applyMiddleware({ app });
});

// routes

// getting-authorization-code
app.get("/get-auth-code", (req, res, next) => {
  return res.send(
    `<a href='https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user_media,user_profile&response_type=code'> Connect to Instagram </a>`
  );
});
app.get("/redirect",async (req,res)=>{
  const pathname = 'https://miiotest.herokuapp.com/redirect?code=AQDNyYS0CWR4cbygXjewFH3R4QZZ_EIWQ023pQGAwNfZCsNywVz8jJsOgJxLave5y9RuJSL10rGVC5MRpirZN9X_oxdBH33wGm9mQh0U190dEg8bVpXMEJPp2WonHVYM6WxlAVy_cyZToUEGgtg6YubaTlsyZhCI5CkB5IXMaq_EZwNv2kdg06v2IijP_sef6llEHcS13woWfBpWkL884ZT2gjonsQWA4_tzbg-6G-sOog#_'
  let code;
  code = pathname.substring(0, pathname.length - 2);
  console.log("Himanshu",code)
  data = await getShortLivedAccessToken(code)
  return res.send(data)
  

})
app.get("/redirect1",(req,res)=>{
  console.log("welcome")
  console.log(req.url)
  return res.send("ok")
})

// start server on the PORT.
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
