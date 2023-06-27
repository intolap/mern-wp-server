const mongoose = require("mongoose");
const {
  isValidRequest,
  isValidName,
  isValidRole,
  isValidEmail,
  isValidpass,
  isValidObjectId,
  isValidMetaKey,
  isValidMetaValue,
  isValidCommentType,
  isValidCommentApprove,
} = require("./inputDataValidation");

const isValideUser = (data) => {
  let { SiteTitle, dbUrl, role, email, password } = data;

  let rbMessage = isValidRequest(data);
  if (rbMessage) return rbMessage;

  let stMessage = isValidName(SiteTitle);
  if (stMessage) return stMessage;

  if (role === "SAdmin") {
    if (!dbUrl) return "please specify a database url";
  } else {
    if (dbUrl) return "Database URL is only for SAdmin";
  }

  let roleMesage = isValidRole(role);
  if (roleMesage) return roleMesage;

  let emailMesage = isValidEmail(email);
  if (emailMesage) return emailMesage;

  let passwordMesage = isValidpass(password);
  if (passwordMesage) return passwordMesage;
};

const isValideUpdate = (data) => {
  let { id, SiteTitle, dbUrl, role, email, password } = data;

  let rbMessage = isValidRequest(data);
  if (rbMessage) return rbMessage;

  if (id) {
    let idMesage = isValidObjectId(id);
    if (idMesage) return idMesage;
  }

  if (SiteTitle) {
    let stMessage = isValidName(SiteTitle);

    if (stMessage) {
      // console.log("stMessage", stMessage);
      return stMessage;
    }
  }

  // if(!dbUrl) return 'please specify a database url'

  if (dbUrl) {
    let roleMesage = isValidRole(role);
    if (roleMesage) return roleMesage;
  }

  if (email) {
    let emailMesage = isValidEmail(email);
    if (emailMesage) return emailMesage;
  }

  if (password) {
    let passwordMesage = isValidpass(password);
    if (passwordMesage) return passwordMesage;
  }
};

const isValideMeta = (data) => {
  const { userId, userMetaKey, userMetaValue } = data;
  let rbMessage = isValidRequest(data);
  if (rbMessage) return rbMessage;

  if (userId) {
    let idMesage = isValidObjectId(userId);
    if (idMesage) return idMesage;
  }
  if (userMetaKey) {
    let metaKeyMesage = isValidMetaKey(userMetaKey);
    if (metaKeyMesage) return metaKeyMesage;
  }
  if (userMetaValue) {
    let metaValueMesage = isValidMetaValue(userMetaValue);
    if (metaValueMesage) return metaValueMesage;
  }
};

const isValideMetaUpdate = (data) => {
  const { userId, userMetaKey, userMetaValue } = data;

  let rbMessage = isValidRequest(data);
  if (rbMessage) return rbMessage;

  if (userId) {
    let idMesage = isValidObjectId(userId);
    if (idMesage) return idMesage;
  }
  if (userMetaKey) {
    let metaKeyMesage = isValidMetaKey(userMetaKey);
    if (metaKeyMesage) return metaKeyMesage;
  }
  if (userMetaValue) {
    let metaValueMesage = isValidMetaValue(userMetaValue);
    if (metaValueMesage) return metaValueMesage;
  }
};

const isValidMetaDelete = (data) => {
  const { userId, userMetaKey } = data;

  let rbMessage = isValidRequest(data);
  if (rbMessage) return rbMessage;

  if (userId) {
    let idMesage = isValidObjectId(userId);
    if (idMesage) return idMesage;
  }
  if (userMetaKey) {
    let metaKeyMesage = isValidMetaKey(userMetaKey);
    if (metaKeyMesage) return metaKeyMesage;
  }
};

const isValidComment = (data) => {
  const {
    post_ID,
    comment_author_name,
    comment_author_email,
    comment_content,
    comment_approved,
    comment_type,
    comment_id,
    token,
    comment_date,
    comment_date_gmt,
  } = data;

  let rbMessage = isValidRequest(data);
  if (rbMessage) return rbMessage;

  if (post_ID) {
    let idMesage = isValidObjectId(post_ID);
    if (idMesage) return idMesage;
  }

  if (comment_author_name) {
    let nameMesage = isValidName(comment_author_name);
    if (nameMesage) return nameMesage;
  }

  if (comment_author_email) {
    let emailMesage = isValidEmail(comment_author_email);
    if (emailMesage) return emailMesage;
  }
  if (!comment_content) {
    let contentMesage = `please write something for comment`;
    if (contentMesage) return contentMesage;
  }
  if (comment_approved) {
    let approvedMesage = isValidCommentApprove(comment_approved);
    if (approvedMesage) return approvedMesage;
  }
  if (comment_type) {
    let typeMesage = isValidCommentType(comment_type);
    if (typeMesage) return typeMesage;
  }
  if (comment_id) {
    let idMesage = isValidObjectId(comment_id);
    if (idMesage) return idMesage;
  }
  // if (token) { }
  // if (comment_date) {
  //   let dateMesage = isValidDate(comment_date);
  //   if (dateMesage) return dateMesage;
  // }
  // if (comment_date_gmt) {
  //   let dateMesage = isValidDate(comment_date_gmt);
  //   if (dateMesage) return dateMesage;
  // }
};

const isValidCommentUpdate = (data) => {
  const {comment_id,comment_content} = data;

  let rbMessage = isValidRequest(data);
  if (rbMessage) return rbMessage;

  if (comment_id) {
    let idMesage = isValidObjectId(comment_id);
    if (idMesage) return idMesage;
  }else{
    return "comment Id is required for updation";
  }
  
  if (!comment_content) {
    let contentMesage = `please write something for comment`;
    if (contentMesage) return contentMesage;
  }

}

module.exports = {
  isValideUpdate,
  isValideMeta,
  isValideMetaUpdate,
  isValidMetaDelete,
  isValideUser,
  isValidComment,
  isValidCommentUpdate
};
