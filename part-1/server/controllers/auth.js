const bcrypt = require("bcrypt")
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          res.status(200).send(users[i])
          return;
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body.password)
        const salt = bcrypt.genSaltSync(5);
        console.log(`salt is here ${salt}`);
        const pwHash = bcrypt.hashSync(req.body.password, salt);
        users.push(req.body)
        console.log(`pw hash is here ${pwHash}`);
        res.status(200).send(req.body)
      

        let userObj = {
          pwHash,
          user: req.body.username,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        }

        users.push(userObj);

        let securePassword = {...userObj};
        delete securePassword.pwHash

        read.status(200).send(securePassword);
        console.log(users);
    }
}

