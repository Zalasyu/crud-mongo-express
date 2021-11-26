const User = require('../model/user')


// Create and Save a new user
exports.create = async (req, res) => {

    const user = new User({
        name: req.query.name,
        age: req.query.age,
        email: req.query.email,
        phonNumber: req.query.phoneNumber
    });
    
    await user.save().then(data => {
        res.send({
            message:"User created...",
            user:data
        });
    }).catch(err => {
        console.log("CANNOT create!")
        res.status(500).send({
            message: err.message || "Error while creating user."
        });
    });
};


// Filter
const findUsers = async (filter, projection, limit) => {
    const query = User.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

// Find user(s)
exports.find = async (req, res) => {
    console.log(req.query);

    const filter = req.query
    

    findUsers(filter, '', 0)
        .then(users => {
            console.log(users)
            res.send(users);
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
};



const replaceUser = async (_id, name, age, email, phoneNumber) => {
    const result = await User.replaceOne({ _id: _id },
        { name: name, age: age, email: email, phoneNumber: phoneNumber });
    return result.nModified;
}
// Update a user
exports.update = async (req, res) => {
    console.log(req.query);
    replaceUser(req.query._id, req.query.name, req.query.age, req.query.email, req.query.phoneNumber)
        .then(updateCount => { 
            console.log(updateCount); 
            res.send({ updateCount: updateCount });
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
};

const deleteById = async (_id) => {
    const result = await User.deleteOne({ _id: _id });
    // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}

// Delete a user
exports.destroy = async (req, res) => {
    console.log(req.query.id);
    deleteById(req.query._id)
        .then(deletedCount => {
            console.log(deletedCount);
            res.send({ deletedCount: deletedCount });
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
};


