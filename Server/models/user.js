const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = mongoose.Schema({
    firstName: {type: String,
         required: true},

    lastName: {type: String,
         required: true},
         age: {type: String,
            required: true},
   
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {type: String,
         required: true},
    
})


// Hash User Password before saving
userSchema.pre('save', function (next) {
    const user = this;

    // Password is hashed only if user is new or it has been modified
    !user.isModified('password') ? next() : {}

    user.password = bcrypt.hashSync(user.password, 10)
    next()
})


// method to compare passwords
userSchema.methods.checkPassword = (password, callback) => {
    bcrypt.compare(password, this.password, (error, isMatch) => {
        error ? callback(error) : {}
        callback(null, isMatch)
    })
}


// Delete Unnecessary and sensitive user fields
userSchema.set('toJSON', {
    transform: (doc, user) => {
        user.id = user._id.toString()
        delete user._id
        delete user.__v
        delete user.password
        return user;
    }
})


const User = mongoose.model('User', userSchema)


module.exports = User