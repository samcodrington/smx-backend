const mongoose = require('mongoose');
const Textbook = require("../models/textbookSchema");
const User = require("../models/userSchema");

function deleteTextbook(textbookID){
    return new Promise(function(resolve, reject){
        Textbook.findByIdAndRemove(textbookID)
        .then(function(t){ resolve("Deleted Textbook #" + t);} 
        .catch(function (t) {reject("Unable to Delete Textbook #" + t)};
    });
}

function userContainsTBook (user, tid){
    console.log(user.postedtextbooks[0]);
    var i = 0;
    for (let t of user.postedtextbooks){
        if (t == tid) return i;
        i++;
    }
    return 0;
}

exports.deleteTextbookFromUser = function(UserID, textbookID){
    return new Promise(function(resolve, reject){
        User.findById(UserID)
        .then(function (u){ 
            
            console.log ("found user");
            if (!isEmpty(u)){
                
                console.log("not empty");
                var ind = userContainsTBook(u, textbookID);
                console.log ("INdice: " + 0);
                
                //if textbook not attached to user
                if (ind == 0){
                    console.log("rejecting stuff");
                    
                    return reject("Textbook not associated with user.\nAssociated IDs are: \n"+ u.postedtextbooks);

                } else {
                    u.postedtextbooks.splice(ind);
                    console.log("does this work!");
                    
                    u.save(function(err, newU){
                        if (err) return reject("couldn't update User");
                        else {
                            Textbook.findByIdAndRemove(textbookID)
                            .then(()=>{ return resolve(newU);})
                            .catch(()=> {return reject(err);});
                        }
                    });                
                }
            }
        }).catch(function(err){return reject(err);});
    });
}


exports.deleteAllUserTextbooks = function(UserID){
    return User.findByIdAndUpdate(UserID, {postedtextbooks: null});
    //TODO delAllUserTBooks doesn't do what it's supposed to
}