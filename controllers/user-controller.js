const { User, Thought } = require('../models');

const userController = {
    //get all users 
    getAllUsers(req, res) {
        User.find({})
            .select("-__v")
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    //get one user by id
    getUserById ({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path:"friends",
                select: "-__v"
            })
            .populate({
                path: "thoughts",
                select: "-__v"
            })
            .select("-__v")
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    //update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: "User not found with this id." });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    //adds friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "User not found with this id." });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //deletes friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id }, //if breaks, return to just id instead of userid
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "User not found with this id." });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
};

module.exports = userController;