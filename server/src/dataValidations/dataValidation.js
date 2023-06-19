const mongoose = require('mongoose')
const { isValidRequest, isValidName, isValidRole, isValidEmail, isValidpass} = require('./inputDataValidation')




const isValideAdmin = (data) => {
    let { SiteTitle, dbUrl, role, email, password } = data

    let rbMessage = isValidRequest(data)
    if (rbMessage) return rbMessage

    let stMessage = isValidName(SiteTitle)
    if (stMessage) return stMessage

    if(!dbUrl) return 'please specify a database url'

    let roleMesage = isValidRole(role)
    if(roleMesage) return roleMesage;

    let emailMesage = isValidEmail(email)
    if(emailMesage) return emailMesage;

    let passwordMesage = isValidpass(password)
    if(passwordMesage) return passwordMesage;
}






module.exports = { isValideAdmin }