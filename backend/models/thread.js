'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Thread = new Schema({
    title: { type:String, required:[true, "Title is required"] },
    
    description: {type:String, required:[true, "Description is required"]},
    
    tags: { type:[String], required:[true, "Enter atleast 1 tag"]},
    
    user: { type: Schema.Types.ObjectId, ref: 'User', required:true }
}, {timestamps: true});

module.exports = mongoose.model('Thread', Thread);