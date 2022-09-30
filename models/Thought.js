const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
var validate = require('mongoose-validator');

const ReactionSchema = new Schema(
    // set custom id to avoid confusion with parent comment _id
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
            validator: [
                validate ({
                    validator: 'isLength',
                    arguments: [1, 280],
                    message: 'Reaction should be between {ARGS[0]} and {ARGS[1]} characters'
                              // On error produces: Reaction should be between 1 and 280 characters
                })
            ]
        },
        username: {
            type: String,
            required: true
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
                    message: 'Thought should be between {ARGS[0]} and {ARGS[1]} characters'
                              // On error produces: Name should be between 1 and 280 characters
                })
            ]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
)

const Thought = model('Thought', ThoughtSchema);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

module.exports = Thought;