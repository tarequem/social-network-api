const { User, model, Types, Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
var validate = require('mongoose-validator');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
            validator: [
                validate ({
                    validator: 'isLength',
                    arguments: [1, 280],
                    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
                              // On error produces: Name should be between 3 and 50 characters
                })
            ]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
)

const ReactionSchema = new Schema(

)

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;