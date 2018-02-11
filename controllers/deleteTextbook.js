const mongoose = require('mongoose');
const Textbook = require("../models/textbookSchema");
const User = require("../models/userSchema");

exports.deleteTextbook = function(textbookID){
    return new Promise(function(resolve, reject){
        Textbook.findByIdAndRemove(textbookID)
        .then(function(t){ resolve("Deleted Textbook #" + t);}) 
        .catch(function (t) {reject("Unable to Delete Textbook #" + t)});
    });
}

function userContainsTBook (user, tid){
    console.log(user.postedtextbooks[0]);
    var i = 0;
    for (let t of user.postedtextbooks){
        if (t == tid) return i;
        i++;
    }
    return -1;
}

exports.deleteTextbookFromUser = function(UserID, textbookID){
    return new Promise(function(resolve, reject){
        User.findById(UserID)
        .then(function (u){ 
            if (!isEmpty(u)){
                //get indice of textbook in postedTextbooks
                var ind = userContainsTBook(u, textbookID);                
                //if textbook not attached to user
                if (ind == -1){
                    
                    return reject("Textbook not associated with user.\nAssociated IDs are: \n"+ u.postedtextbooks);

                } else {
                    
                    u.postedtextbooks.splice(ind);                    
                    u.save(function(err, newU){
                        if (err) return reject("couldn't update User");
                        //if User is updated, remove textbook from Textbook collection
                        else {
                            Textbook.findByIdAndRemove(textbookID)
                            .then(()=>{ return resolve(newU);})
                            .catch(()=> {return reject(err);});
                        }
                    });                
                }
            }
        })
        //Should not reach this - this is only if Logged In User can't be found in database
        .catch(function(err){return reject(err);});
    });
}


exports.deleteAllUserTextbooks = function(UserID){
    return User.findByIdAndUpdate(UserID, {postedtextbooks: null});
    //TODO delAllUserTBooks doesn't do what it's supposed to
}