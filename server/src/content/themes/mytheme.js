const eventEmitter = require("../../eventEmitter/eventEmitter");

//User Related Emmitters
const BeforeCreateNewUser = (data) => {
  // Write Your Code Here
  console.log("The user data before create new user ::::: ", data);
}
const AfterCreateNewUser = (data) => {
  // Write Your Code Here
  console.log("The user data after create new user ::::: ", data);
};
const BeforeGettingAllUsers = () => {
  // Write Your Code Here
  console.log("Before getting all user data");
}
const AfterGettingAllUsers = (data) => {
  // Write Your Code Here
  console.log("After getting all user data :::::", data);
}
const BeforeUpdateUser = (data) => {
  // Write Your Code Here
  console.log("Before updating user :::: ",data );
};
const AfterUpdateUser = (data) => {
  // Write Your Code Here
  console.log("After updating user :::: ",data );
};
const BeforeDeleteUser = (data) => {
  // Write Your Code Here
  console.log("Before deleting user :::: ",data );
};
const AfterDeleteUser = (data)=>{
  // Write Your Code Here
  console.log("user deleted sucessfully :::: ",data);
}

//UserMeta Related Emmitters
const BeforeCreateUserMeta = (data) => {
  // Write Your Code Here
  console.log("The metadata before create new userMetadata ::::: ", data);
}
const AfterCreateUserMeta = (data) => {
  // Write Your Code Here
  console.log("The metadata after create new userMetadata ::::: ", data);
}
const BeforeGettingAllUserMeta = () => {
  // Write Your Code Here
  console.log("Before getting all userMetadata");
}
const AfterGettingAllUserMeta = (data) => {
  // Write Your Code Here
  console.log("After getting all userMetadata ::::", data);
}
const BeforeUpdateUserMeta = (data) => {
  // Write Your Code Here
  console.log("Before updating userMetadata :::: ",data );
};
const AfterUpdateUserMeta = (data) => {
  // Write Your Code Here
  console.log("After updating userMetadata :::: ",data );
};
const BeforeDeleteUserMeta = (data) => {
  // Write Your Code Here
  console.log("Before deleting userMetadata :::: ",data );
};
const AfterDeleteUserMeta = () => {
  // Write Your Code Here
  console.log("userMetadata deleted sucessfully");
};

//Comment Related Emmitters
const BeforeCommentSave = (data) => {
  // Write Your Code Here
  let commentArr = data.comment_content.split(" ");
  if (commentArr.includes("gali")) {
    let index = commentArr.indexOf("gali");
    commentArr[index] = "sensored content";
    data.comment_content = commentArr.join(" ");
    return data;
  }
  return data;
};
const AfterCommentSave = (data) => {
  console.log("what comment is saved in db " + data.comment_content);
};
const BeforeGettingAllComments = () => { 
  //write code here
  console.log("before fetching comment::: Wr are going to get all comments");
};
const AfterGettingAllComments = () => {
  //write code here
  console.log("after fetching comments::: All comments are fetched sucessfully");
};
const BeforeGettingSpecificComment = (data) => {
  //write code here
  console.log("comment id is ::::: "+ data);
};
const AfterGettingSpecificComment = (data) => {
  //write code here
  console.log("comment is ::::: "+ data.comment_content);
};
const BeforeUpdatingComment = (data) => {
  //write code here
  console.log("comment that you are going to update is ::::: "+ data.comment_content);
};
const AfterUpdatingComment = (data) => {
  //write code here
  console.log("Your Comment is sucessfully updated.Your Updated Comment is ::::: "+ data.comment_content);
};

const BeforeDeletingComment = (data) => {
  //write code here
  console.log("comment that you are going to delete is ::::: "+ data.comment_content);
};

const AfterDeletingComment = (data) => {
  //write code here
  console.log("Your Comment is sucessfully deleted.");
};

//User Related Emmitters
eventEmitter.on("BeforeCreateNewUser", BeforeCreateNewUser);
eventEmitter.on("AfterCreateNewUser",AfterCreateNewUser);
eventEmitter.on("BeforeGettingAllUsers", BeforeGettingAllUsers);
eventEmitter.on("AfterGettingAllUsers", AfterGettingAllUsers);
eventEmitter.on("BeforeUpdateUser", BeforeUpdateUser);
eventEmitter.on("AfterUpdateUser", AfterUpdateUser);
eventEmitter.on("BeforeDeleteUser", BeforeDeleteUser);
eventEmitter.on("AfterDeleteUser",AfterDeleteUser);

//UserMeta Related Emmitters
eventEmitter.on("BeforeCreateUserMeta",BeforeCreateUserMeta);
eventEmitter.on("AfterCreateUserMeta",AfterCreateUserMeta);
eventEmitter.on("BeforeGettingAllUserMeta",BeforeGettingAllUserMeta);
eventEmitter.on("AfterGettingAllUserMeta",AfterGettingAllUserMeta)
eventEmitter.on("BeforeUpdateUserMeta",BeforeUpdateUserMeta);
eventEmitter.on("AfterUpdateUserMeta",AfterUpdateUserMeta);
eventEmitter.on("BeforeDeleteUserMeta",BeforeDeleteUserMeta);
eventEmitter.on("AfterDeleteUserMeta",AfterDeleteUserMeta);

//Comment Related Emmitters
eventEmitter.on("BeforeCommentSave", BeforeCommentSave);
eventEmitter.on("AfterCommentSave", AfterCommentSave);
eventEmitter.on("BeforeGettingAllComments", BeforeGettingAllComments);
eventEmitter.on("BeforeGettingAllComments", AfterGettingAllComments);
eventEmitter.on("BeforeGettingSpecificComment", BeforeGettingSpecificComment);
eventEmitter.on("AfterGettingSpecificComment",AfterGettingSpecificComment);
eventEmitter.on("BeforeUpdatingComment", BeforeUpdatingComment);
eventEmitter.on("AfterUpdatingComment",AfterUpdatingComment);
eventEmitter.on("BeforeDeletingComment", BeforeDeletingComment);
eventEmitter.on("AfterDeletingComment", AfterDeletingComment);


/*
//Direction Of Creating Custom Functions For Developer

const TypeYourCustomFunctionName = (data) => {
  //write code here
}

eventEmitter.on("BeforeCommentSave", TypeYourCustomFunctionName);
*/